import { strToU8, zipSync } from 'fflate';
import { exportPack } from '../data/lessonLoomData';

export const EXPORT_ZIP_FILENAME = 'lesson-loom-fraction-garden.zip';

export type ExportZipOptions = {
  reflectionSaved?: boolean;
  reflectionText?: string;
};

export function buildExportZipBlob(options?: ExportZipOptions): Blob {
  const files: Record<string, Uint8Array> = {};
  for (const file of exportPack) {
    files[file.filename] = strToU8(file.body);
  }
  if (options?.reflectionSaved && options.reflectionText?.trim()) {
    files['reflection-notes.txt'] = strToU8(options.reflectionText.trim());
  }
  const zipped = zipSync(files);
  return new Blob([zipped], { type: 'application/zip' });
}

export function downloadExportZip(options?: ExportZipOptions): void {
  const blob = buildExportZipBlob(options);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = EXPORT_ZIP_FILENAME;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
