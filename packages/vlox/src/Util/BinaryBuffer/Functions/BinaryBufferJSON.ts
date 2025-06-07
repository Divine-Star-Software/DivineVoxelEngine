import {
  BinaryBufferCompresedTypes,
  BinaryBufferData,
  JSONBinaryBufferData,
} from "../BinaryBuffer.types";

export async function BinaryBufferFromJSON(
  data: JSONBinaryBufferData
): Promise<BinaryBufferData> {
  let raw: number | Uint8Array;
  if (data.base64) {
    let binary = atob(data.base64);
    raw = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      raw[i] = binary.charCodeAt(i);
    }
    if (data.compression) {
      const ds = new DecompressionStream(data.compression);
      const writer = ds.writable.getWriter();
      writer.write(raw);
      writer.close();
      const decompressed = await new Response(ds.readable).arrayBuffer();
      raw = new Uint8Array(decompressed);
    }
  } else if (typeof data.value == "number") {
    raw = data.value;
  } else {
    throw new Error(`Error converting binary buffer json. `);
  }

  return {
    format: data.format,
    byteLength: data.byteLength,
    buffer: typeof raw === "number" ? raw : raw.buffer,
  };
}

export async function BinaryBufferToJSON(
  data: BinaryBufferData,
  compression?: boolean | BinaryBufferCompresedTypes
): Promise<JSONBinaryBufferData> {
  if (typeof data.buffer === "number") {
    return {
      format: data.format,
      byteLength: data.byteLength,
      value: data.buffer,
    };
  }

  const input = new Uint8Array(data.buffer);

  let bufferToEncode = input;

  if (compression) {
    compression =
      typeof compression == "boolean"
        ? BinaryBufferCompresedTypes.Gzip
        : compression;
    const cs = new CompressionStream(compression);
    const writer = cs.writable.getWriter();
    writer.write(input);
    writer.close();
    const compressedBuffer = await new Response(cs.readable).arrayBuffer();
    bufferToEncode = new Uint8Array(compressedBuffer);
  }

  let binary = "";
  for (let i = 0; i < bufferToEncode.length; i++) {
    binary += String.fromCharCode(bufferToEncode[i]);
  }
  const base64 = btoa(binary);

  return {
    format: data.format,
    byteLength: data.byteLength,
    base64: base64,
    ...(compression ? { compression } : {}),
  };
}
