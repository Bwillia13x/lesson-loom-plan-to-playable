import { exportGateCopy, exportPack } from '../../data/lessonLoomData';
import { IndustrialButton } from '../ui/IndustrialButton';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type ExportPackSectionProps = {
  hasWoven: boolean;
  approved: boolean;
  copiedExportId: string | null;
  downloadNotice: string | null;
  onCopy: (id: string) => void;
  onDownload: () => void;
};

export function ExportPackSection({
  hasWoven,
  approved,
  copiedExportId,
  downloadNotice,
  onCopy,
  onDownload,
}: ExportPackSectionProps) {
  return (
    <Section
      id="export"
      eyebrow="Export pack"
      title="Export pack — build passport"
      lead="Stitch-ready artifacts for regenerating the lesson interface, design rules, teacher guide, and printable fallback."
      className={approved ? 'export-section--approved' : undefined}
    >
      <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
        <div className="export-pack-status" data-testid="export-pack-status">
          <StatusPip
            label={hasWoven ? 'All files generated' : 'Preview artifacts'}
            tone={hasWoven ? 'green' : 'amber'}
            pulse={hasWoven}
          />
          {approved && (
            <span data-testid="export-approved-pip">
              <StatusPip label="Teacher-reviewed draft" tone="green" />
            </span>
          )}
        </div>
        <IndustrialButton
          variant="primary"
          size="lg"
          type="button"
          data-testid="export-download"
          onClick={onDownload}
        >
          Download Pack (.zip)
        </IndustrialButton>
      </div>

      {downloadNotice && (
        <p className="export-notice" role="status" aria-live="polite" data-testid="export-download-notice">
          {downloadNotice}
        </p>
      )}

      {approved ? (
        <p
          className="export-gate export-gate--approved text-mono"
          data-testid="export-gate-approved"
        >
          {exportGateCopy.approved}
        </p>
      ) : (
        <p className="export-gate text-mono" data-testid="export-gate-pending">
          {exportGateCopy.pending}
        </p>
      )}

      <div className="export-grid">
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
            <IndustrialButton
              variant="secondary"
              size="sm"
              onClick={() => onCopy(file.id)}
              aria-label={`Copy ${file.title}`}
              data-testid={`export-copy-${file.id}`}
            >
              {copiedExportId === file.id ? 'Copied' : 'Copy'}
            </IndustrialButton>
          </article>
        ))}
      </div>
    </Section>
  );
}
