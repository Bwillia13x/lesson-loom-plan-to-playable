import { exportPack } from '../../data/lessonLoomData';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type ExportPackSectionProps = {
  hasWoven: boolean;
  copiedExportId: string | null;
  downloadNotice: string | null;
  onCopy: (id: string) => void;
  onDownload: () => void;
};

export function ExportPackSection({
  hasWoven,
  copiedExportId,
  downloadNotice,
  onCopy,
  onDownload,
}: ExportPackSectionProps) {
  return (
    <Section
      id="export"
      eyebrow="Export pack"
      title="Export the lesson interface pack."
      lead="Carry the lesson from Stitch-style design into classroom review or implementation."
      className={hasWoven ? 'export-section--woven' : 'export-section--locked'}
    >
      <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
        <StatusPip
          label={hasWoven ? 'Export preview ready' : 'Preview artifacts'}
          tone={hasWoven ? 'green' : 'amber'}
          pulse={hasWoven}
        />
        <Button
          variant="primary"
          size="lg"
          type="button"
          data-testid="export-download"
          disabled={!hasWoven}
          onClick={onDownload}
        >
          {hasWoven ? 'Download Pack (.zip)' : 'Prepare download preview'}
        </Button>
      </div>

      {!hasWoven && (
        <p className="export-lock-notice" role="note" data-testid="export-lock-notice">
          Weave the lesson first to unlock the full export preview.
        </p>
      )}

      {downloadNotice && (
        <p className="export-notice" role="status" aria-live="polite" data-testid="export-download-notice">
          {downloadNotice}
        </p>
      )}

      <div
        className={['export-grid', !hasWoven ? 'export-grid--locked' : 'export-grid--active']
          .filter(Boolean)
          .join(' ')}
        aria-hidden={!hasWoven ? true : undefined}
      >
        {exportPack.map((file) => (
          <article key={file.id} className="export-card">
            <div className="export-card__head">
              <div>
                <strong style={{ fontSize: '0.9rem' }}>{file.title}</strong>
                <div className="text-mono" style={{ fontSize: '0.68rem', color: 'var(--ll-muted)' }}>
                  {file.filename}
                </div>
              </div>
              <span className="export-card__ext">{file.ext}</span>
            </div>
            <pre className="export-card__preview">{file.preview}</pre>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onCopy(file.id)}
              disabled={!hasWoven}
              aria-label={`Copy ${file.title}`}
              data-testid={`export-copy-${file.id}`}
            >
              {copiedExportId === file.id ? 'Copied' : 'Copy'}
            </Button>
          </article>
        ))}
      </div>
    </Section>
  );
}
