export function dataUrlToBlob(dataUrl: string): Blob {
  const [header, data] = dataUrl.split(",");
  if (!header || !data) throw new Error("Invalid data URL");

  const match = header.match(/data:(.*?);base64/);
  if (!match) throw new Error("Invalid data URL header");

  const mime = match[1] || "application/octet-stream";
  const binStr = atob(data);
  const len = binStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binStr.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

