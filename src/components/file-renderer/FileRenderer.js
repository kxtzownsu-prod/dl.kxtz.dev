/*
  At the current moment (aka 8/17/26 1:24 PM), I want to try rendering these files:
    - Markdown
    - HTML
    - Images (PNG, JPG, BMP, ICO)
    - Audio
    - Video

  Images, Audio, and Video can be handled by the browser with <video>, <audio> and <img> tags.

  HTML can likely be rendered with iframes, but just like dl.kxtz.dev v1, I'll probably put a warning for the user before rendering it, just in case.

  Markdown is the hardest one, but I'm sure there's a library for it.
*/

export const fileTypeMap = new Map([
  ['png', 'image'], ['jpg', 'image'], ['jpeg', 'image'],
  ['bmp', 'image'], ['ico', 'image'],
  ['md', 'markdown'], ['markdown', 'markdown'],
  ['html', 'html'], ['htm', 'html'],
  ['mp3', 'audio'], ['wav', 'audio'], ['ogg', 'audio'],
  ['m4a', 'audio'], ['aac', 'audio'], ['flac', 'audio'],
  ['mp4', 'video'], ['webm', 'video'], ['ogv', 'video'],
  ['mov', 'video'], ['mkv', 'video'], ['avi', 'video']
]);

const MIME_TO_KIND = {
  'image/png': 'image', 'image/jpeg': 'image', 'image/bmp': 'image',
  'image/x-icon': 'image',
  'text/markdown': 'markdown',
  'text/html': 'html',
  'audio/*': 'audio',
  'video/*': 'video'
};

function mimeKind(mime) {
  return MIME_TO_KIND[mime] ?? MIME_TO_KIND[`${mime.split('/')[0]}/*`];
}

export function detectFileType(name, mime) {
  if (mime) {
    const kind = mimeKind(mime);
    if (kind) return kind;
  }

  const extension = name.split('.').pop().toLowerCase();
  return fileTypeMap.get(extension) ?? 'unknown';
}

export function renderFile(fileData) {
  let mimeType = fileData.mime;
  let fileName = fileData.name;
  let fileType = detectFileType(fileName, mimeType);
  if (fileType == "unknown") return "Unable to render file!";

  return "<h1>test</h1>";
}