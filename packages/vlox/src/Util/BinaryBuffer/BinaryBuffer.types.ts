export enum BinaryBufferFormat {
  BitArray = "bit",
  HalfNibbleArray = "half-nibble",
  NibbleArray = "nibble",
  Buffer = "buffer",
  Uint8 = "uint8",
  Uint16 = "uint16",
  Uint32 = "uint32",
  Int8 = "int8",
  Int16 = "int16",
  Int32 = "int32",
  Float32 = "float32",
  Float64 = "float64",
}

export enum BinaryBufferCompresedTypes {
  Gzip = "gzip",
  Deflate = "deflate",
  DeflateRaw = "deflate-raw",
}

export enum BinaryBufferConstants {
  ByteArrayMax = 256,
  NibbleArrayMax = 16,
  HalfNibbleArrayMax = 4,
  BitArrayMax = 2,
}

export interface BinaryBufferData {
  format: BinaryBufferFormat;
  byteLength: number;
  buffer: number | ArrayBuffer | SharedArrayBuffer;
}

export interface JSONBinaryBufferData {
  format: BinaryBufferFormat;
  base64?: string;
  value?: number | null;
  byteLength: number;
  compression?: BinaryBufferCompresedTypes;
}
