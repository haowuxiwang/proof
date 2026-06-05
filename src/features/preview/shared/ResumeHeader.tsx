import { useTranslation } from 'react-i18next';
import type { PersonalInfo, TemplateColors } from '../../../types/resume';

interface ResumeHeaderProps {
  personal: PersonalInfo;
  colors: TemplateColors;
  fonts: { heading: string; body: string };
  centered?: boolean;
}

export default function ResumeHeader({ personal, colors, fonts, centered }: ResumeHeaderProps) {
  const { t } = useTranslation();
  const contactItems: string[] = [];
  if (personal.email) contactItems.push(personal.email);
  if (personal.phone) contactItems.push(personal.phone);
  if (personal.location) contactItems.push(personal.location);

  return (
    <div
      className="mb-8 pb-6"
      style={{
        textAlign: centered ? 'center' : 'left',
        borderBottom: `2px solid ${colors.accent}30`,
      }}
    >
      <h1
        className="text-3xl font-bold mb-1 tracking-tight"
        style={{ color: colors.primary, fontFamily: fonts.heading }}
      >
        {personal.name || t('resume.yourName')}
      </h1>
      <p className="text-base mb-3" style={{ color: colors.textLight }}>
        {personal.title || t('resume.jobTitle')}
      </p>
      <div
        className="flex flex-wrap gap-2 text-xs"
        style={{
          color: colors.textLight,
          justifyContent: centered ? 'center' : 'flex-start',
        }}
      >
        {contactItems.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" style={{ opacity: 0.3 }}>|</span>}
            {item}
          </span>
        ))}
        {personal.github && (
          <a
            href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:underline"
            style={{ color: colors.textLight }}
          >
            {contactItems.length > 0 && <span aria-hidden="true" style={{ opacity: 0.3 }}>|</span>}
            GitHub
          </a>
        )}
        {personal.website && (
          <a
            href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:underline"
            style={{ color: colors.textLight }}
          >
            {(contactItems.length > 0 || personal.github) && <span aria-hidden="true" style={{ opacity: 0.3 }}>|</span>}
            Website
          </a>
        )}
      </div>
    </div>
  );
}
