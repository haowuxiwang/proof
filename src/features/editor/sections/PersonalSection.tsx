import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useResumeStore } from '../../../store/resumeStore';
import SectionGroup from '../components/SectionGroup';
import { staggerItem } from '../../../hooks/useAnimateOnMount';

export default function PersonalSection() {
  const { t } = useTranslation();
  const personal = useResumeStore((s) => s.resume.personal);
  const updatePersonal = useResumeStore((s) => s.updatePersonal);

  // Generate unique IDs for label-input association
  const ids = {
    name: useId(),
    title: useId(),
    email: useId(),
    phone: useId(),
    github: useId(),
    website: useId(),
    location: useId(),
    summary: useId(),
  };

  const handleChange = (field: keyof typeof personal, value: string) => {
    updatePersonal({ [field]: value });
  };

  return (
    <div>
      {/* Group 1: Basic Info */}
      <motion.div variants={staggerItem}>
        <SectionGroup title={t('section.basicInfo')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={ids.name} className="label-field">{t('form.fullName')} <span aria-hidden="true" style={{ color: 'var(--color-error)' }}>*</span></label>
              <input
                id={ids.name}
                className="input-field"
                value={personal.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder={t('placeholder.name')}
                aria-required="true"
              />
              <p className="text-[11px] mt-1 text-neutral-400">
                {t('hint.realName')}
              </p>
            </div>
            <div>
              <label htmlFor={ids.title} className="label-field">{t('form.jobTitle')}</label>
              <input
                id={ids.title}
                className="input-field"
                value={personal.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder={t('placeholder.title')}
              />
              <p className="text-[11px] mt-1 text-neutral-400">
                {t('hint.targetJob')}
              </p>
            </div>
          </div>
        </SectionGroup>
      </motion.div>

      {/* Group 2: Contact */}
      <motion.div variants={staggerItem}>
        <SectionGroup title={t('section.contact')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={ids.email} className="label-field">{t('form.email')} <span aria-hidden="true" style={{ color: 'var(--color-error)' }}>*</span></label>
              <input
                id={ids.email}
                className="input-field"
                type="email"
                value={personal.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder={t('placeholder.email')}
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor={ids.phone} className="label-field">{t('form.phone')}</label>
              <input
                id={ids.phone}
                className="input-field"
                value={personal.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder={t('placeholder.phone')}
              />
            </div>
          </div>
        </SectionGroup>
      </motion.div>

      {/* Group 3: Online Profiles */}
      <motion.div variants={staggerItem}>
        <SectionGroup title={t('section.onlineProfiles')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={ids.github} className="label-field">{t('form.github')}</label>
              <input
                id={ids.github}
                className="input-field"
                value={personal.github || ''}
                onChange={(e) => handleChange('github', e.target.value)}
                placeholder={t('placeholder.github')}
              />
            </div>
            <div>
              <label htmlFor={ids.website} className="label-field">{t('form.website')}</label>
              <input
                id={ids.website}
                className="input-field"
                value={personal.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder={t('placeholder.website')}
              />
            </div>
          </div>
          <div>
            <label htmlFor={ids.location} className="label-field">{t('form.location')}</label>
            <input
              id={ids.location}
              className="input-field"
              value={personal.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder={t('placeholder.location')}
            />
          </div>
        </SectionGroup>
      </motion.div>

      {/* Group 4: Summary */}
      <motion.div variants={staggerItem}>
        <SectionGroup title={t('section.summary')}>
          <div>
            <label htmlFor={ids.summary} className="label-field">{t('form.summary')}</label>
            <textarea
              id={ids.summary}
              className="input-field"
              value={personal.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              placeholder={t('hint.summaryPlaceholder')}
              rows={4}
              style={{ resize: 'vertical', minHeight: '100px' }}
            />
            <p className="text-[11px] mt-1 text-neutral-400">
              {t('hint.summaryTip')}
            </p>
          </div>
        </SectionGroup>
      </motion.div>
    </div>
  );
}
