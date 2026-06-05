import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useResumeStore } from '../../store/resumeStore';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, FileText, Image, Code, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Spotlight } from '@/components/magicui';
import { hasResumeContent } from '../preview/utils/hasResumeContent';

type ExportFormat = 'pdf' | 'html' | 'png';

const sanitize = (name: string) => name.replace(/[\\/:*?"<>|]/g, '_').trim();

export default function ExportDialog({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const resume = useResumeStore((s) => s.resume);
  const template = useResumeStore((s) => s.template);
  const [exporting, setExporting] = useState(false);
  const [format, setFormat] = useState<ExportFormat>('pdf');

  const handleExport = async () => {
    if (!hasResumeContent(resume)) {
      toast.error(t('export.errorNoContent'));
      return;
    }

    setExporting(true);
    try {
      const el = document.querySelector('.resume-preview-content') as HTMLElement | null;
      if (!el) {
        toast.error(t('export.errorNoContent'));
        return;
      }

      if (format === 'pdf') {
        const html2pdf = (await import('html2pdf.js')).default;
        await html2pdf()
          .set({
            margin: 10,
            filename: `${sanitize(resume.personal.name || t('resume.unnamed'))}-resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          })
          .from(el)
          .save();
      } else if (format === 'html') {
        // Resolve CSS custom properties to actual values for standalone HTML
        const style = getComputedStyle(document.documentElement);
        const cssVars: Record<string, string> = {
          '--accent': style.getPropertyValue('--accent').trim(),
          '--text': style.getPropertyValue('--text').trim(),
          '--text-muted': style.getPropertyValue('--text-muted').trim(),
          '--text-secondary': style.getPropertyValue('--text-secondary').trim(),
          '--border': style.getPropertyValue('--border').trim(),
        };

        let htmlContent = el.innerHTML;
        // Replace CSS variable references with resolved values
        for (const [varName, value] of Object.entries(cssVars)) {
          htmlContent = htmlContent.replaceAll(`var(${varName})`, value);
        }

        const html = `<!DOCTYPE html><html lang="${document.documentElement.lang || 'en'}"><head><meta charset="UTF-8"><title>${resume.personal.name || t('resume.unnamed')}</title><style>body{font-family:${template.fonts.body};margin:40px;color:${template.colors.text}}h1,h2,h3{font-family:${template.fonts.heading};color:${template.colors.primary}}a{color:${template.colors.secondary}}</style></head><body>${htmlContent}</body></html>`;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${sanitize(resume.personal.name || t('resume.unnamed'))}-resume.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (format === 'png') {
        const { toPng } = await import('html-to-image');
        const dataUrl = await toPng(el, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          width: el.scrollWidth,
          height: el.scrollHeight,
        });
        const link = document.createElement('a');
        link.download = `${sanitize(resume.personal.name || t('resume.unnamed'))}-resume.png`;
        link.href = dataUrl;
        link.click();
      }

      toast.success(t('export.success'));
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      toast.error(t('export.error'));
    } finally {
      setExporting(false);
    }
  };

  const formats: { id: ExportFormat; label: string; desc: string; icon: typeof FileText }[] = [
    { id: 'pdf', label: 'PDF', desc: t('export.pdf'), icon: FileText },
    { id: 'html', label: 'HTML', desc: t('export.html'), icon: Code },
    { id: 'png', label: 'PNG', desc: t('export.png'), icon: Image },
  ];

  return (
    <Dialog open onOpenChange={(open: boolean) => { if (!open && !exporting) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Download className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            </motion.div>
            {t('export.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 pt-2">
          {formats.map((fmt, index) => {
            const Icon = fmt.icon;
            const isSelected = format === fmt.id;
            return (
              <motion.div
                key={fmt.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <Spotlight spotlightColor="rgba(59, 130, 246, 0.06)">
                  <button
                    onClick={() => setFormat(fmt.id)}
                    disabled={exporting}
                    aria-pressed={format === fmt.id}
                    className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left relative"
                    style={{
                      background: isSelected ? 'var(--accent-dim)' : 'transparent',
                      border: `1.5px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                    }}
                  >
                    <motion.div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      animate={{
                        background: isSelected ? 'var(--accent)' : 'var(--bg-subtle)',
                        color: isSelected ? 'white' : 'var(--text-muted)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>{fmt.label}</div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{fmt.desc}</div>
                    </div>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          className="ml-auto"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        >
                          <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </Spotlight>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Button
            onClick={handleExport}
            disabled={exporting}
            className="w-full mt-2 relative overflow-hidden group"
            style={{
              background: exporting ? 'var(--text-muted)' : 'var(--accent)',
            }}
          >
            {/* Shimmer effect on hover */}
            {!exporting && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer-sweep 1.5s linear infinite',
                }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {exporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('export.exporting')}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  {t('export.exportAs', { format: format.toUpperCase() })}
                </>
              )}
            </span>
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
