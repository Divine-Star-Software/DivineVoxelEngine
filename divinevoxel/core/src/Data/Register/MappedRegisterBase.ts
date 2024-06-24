const getSyncId = (id: string) => `entry-synced-${id}`;

class MappedRegisterSegment<Data> extends EventTarget {
  entries = new Map<string, Data[]>();

  onEntryAdded(id: string, run: (data: Data[]) => void) {
    const entrySyncedId = getSyncId(id);
    const listener = () => {
      run(this.entries.get(id)!);
      this.removeEventListener(entrySyncedId, listener);
    };
    this.addEventListener(entrySyncedId, listener);
  }

  add(id: string, data: Data[]) {
    this.entries.set(id, data);
    this.dispatchEvent(new Event(getSyncId(id)));
  }

  get(id: string) {
    return this.entries.get(id);
  }
}

export class MappedRegisterBase<Data> {
  segments = new Map<string, MappedRegisterSegment<Data>>();

  addSegment(id: string) {
    if(this.segments.has(id)) return this.segments.get(id)!;
    const newSegment = new MappedRegisterSegment<Data>();
    this.segments.set(id, newSegment);
    return newSegment;
  }
  getSegment(id: string) {
    const segment = this.segments.get(id);
    if (!segment) throw new Error(`Segment with id ${id} does not exist`);
    return segment;
  }

  sync(segment: string, id: string, value: Data[]) {
    const segmentMap = this.addSegment(segment);
    segmentMap.add(id, value);
    return;
  }
  get(segment: string, id: string, index: number): Data | null {
    const segmentMap = this.segments.get(segment);
    if (!segmentMap) return null;
    const mapped = segmentMap.get(id);
    if (!mapped) {
      return null;
    }
    return mapped[index];
  }
}
