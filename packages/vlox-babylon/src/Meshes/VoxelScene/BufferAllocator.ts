/**
 * Class to manage buffer allocation using the buddy algorithm,
 * using Sets for free lists to speed up add/remove.
 */
export class BufferAllocator {
  /** Total size of the memory pool in bytes */
  size: number;

  /** Minimum allocatable block size (power of 2) */
  private minBlockSize: number;

  /** Number of levels in the buddy system */
  private levels: number;

  /**
   * Free lists, keyed by level.
   * - `level = 0` is the largest block (entire buffer).
   * - `level = levels - 1` is the smallest block (minBlockSize).
   *
   * Each free list is now a Set<number>, so membership checks & removals are O(1).
   */
  private freeLists: Map<number, Set<number>>;

  /**
   * Tracks currently allocated blocks:
   *   key = offset, value = block size.
   */
  private allocations: Map<number, number>;

  constructor(size: number, minBlockSize: number = 64) {
    // Validate inputs
    if ((size & (size - 1)) !== 0) {
      throw new Error("Size must be a power of 2.");
    }
    if (minBlockSize > size || (minBlockSize & (minBlockSize - 1)) !== 0) {
      throw new Error("minBlockSize must be a power of 2 and <= total size.");
    }

    this.size = size;
    this.minBlockSize = minBlockSize;
    // e.g., size=1024 & minBlockSize=64 => size/minBlockSize=16 => log2(16)=4 => +1 => 5 levels
    this.levels = Math.log2(size / minBlockSize) + 1;

    this.freeLists = new Map();
    this.allocations = new Map();

    // Initialize all free lists as empty Sets
    for (let i = 0; i < this.levels; i++) {
      this.freeLists.set(i, new Set());
    }
    // The entire buffer (offset=0) is free at the top level (level=0)
    this.freeLists.get(0)!.add(0);
  }

  /**
   * Allocate a block of at least `requestedSize` bytes.
   * Returns the offset in the buffer or `null` if no space.
   */
  allocate(requestedSize: number): number | null {
    let blockSize = this.minBlockSize;
    let level = this.levels - 1; // Start from the smallest blocks

    // Find the smallest power-of-two >= requestedSize
    while (blockSize < requestedSize) {
      blockSize <<= 1; // multiply by 2
      level--;
      // If we exceed the largest block, fail
      if (level < 0) {
        return null;
      }
    }

    // Look from `level` up to 0 (largest) for a free block
    for (let i = level; i >= 0; i--) {
      const list = this.freeLists.get(i)!;
      if (list.size > 0) {
        // Take *any* free block (e.g. first in the Set)
        const offset = list.values().next().value!;
        list.delete(offset);

        // Now split that block down to the target level
        return this.splitAndAllocate(offset, i, level);
      }
    }
    // No suitable block found
    return null;
  }

  /**
   * Free (deallocate) a previously allocated block at given `offset`.
   */
  free(offset: number): void {
    if (!this.allocations.has(offset)) {
      throw new Error("Invalid free: Block not allocated or unknown offset");
    }

    // Get the block size
    const blockSize = this.allocations.get(offset)!;
    this.allocations.delete(offset);

    // Determine which level this block belongs to
    const level = this.getLevel(blockSize);

    // Mark it free
    this.freeLists.get(level)!.add(offset);

    // Attempt to coalesce with buddy
    this.tryCoalesce(offset, level);
  }

  /**
   * Splits a block from `startLevel` down to `targetLevel`.
   * Returns the final allocated offset.
   */
  private splitAndAllocate(offset: number, startLevel: number, targetLevel: number): number {
    // For each intermediate level, split the block in half:
    for (let level = startLevel; level < targetLevel; level++) {
      // Half of the current block size
      const halfSize = this.size >> (level + 1);
      // The buddy offset is the "second half"
      const buddyOffset = offset + halfSize;

      // The buddy becomes free at the next level
      this.freeLists.get(level + 1)!.add(buddyOffset);
      // We continue splitting the *first half*, so offset remains
      // at the same place for the next iteration
    }

    // Now offset has size = (this.size >> targetLevel)
    this.allocations.set(offset, this.size >> targetLevel);
    return offset;
  }

  /**
   * Attempt to merge (coalesce) a freed block with its buddy
   * to form a larger free block at the next higher level.
   */
  private tryCoalesce(offset: number, level: number): void {
    // If already the top-level block, can't go bigger
    if (level <= 0) return;

    // The size of blocks at this level
    const blockSize = this.size >> level;

    // Buddy has the same level-size, so they differ by exactly `blockSize`
    const buddyOffset = offset ^ blockSize;

    const freeList = this.freeLists.get(level)!;

    // Check if buddy is also free
    if (freeList.has(buddyOffset)) {
      // Remove buddy from this level’s free list
      freeList.delete(buddyOffset);

      // Also remove the current offset (we added it just before calling tryCoalesce)
      freeList.delete(offset);

      // The merged block starts at the smaller offset of the two
      const parentOffset = Math.min(offset, buddyOffset);

      // Insert the merged block into the higher-level free list
      this.freeLists.get(level - 1)!.add(parentOffset);

      // Recurse upward
      this.tryCoalesce(parentOffset, level - 1);
    }
  }

  /**
   * Given a block size, return its level.
   * e.g. if blockSize = 64 and total size=1024 => level=4 (0-based).
   */
  private getLevel(blockSize: number): number {
    return Math.log2(this.size / blockSize);
  }
}
