import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useResumeStore } from '../../../store/resumeStore';
import type { Education } from '../../../types/resume';
import { generateId } from '../../../types/resume';
import ExpandableCard from '../components/ExpandableCard';
import FormField from '../components/FormField';
import { AnimatedList } from '@/components/magicui';
import { Plus, Lightbulb } from 'lucide-react';

function createEmpty(): Education {
  return { id: generateId(), school: '', major: '', degree: '', startDate: '', endDate: '' };
}

export default function EducationSection() {
  const { t } = useTranslation();
  const education = useResumeStore((s) => s.resume.education);
  const updateEducation = useResumeStore((s) => s.updateEducation);

  const update = (id: string, data: Partial<Education>) => {
    updateEducation(education.map((edu) => (edu.id === id ? { ...edu, ...data } : edu)));
  };
  const remove = (id: string) => updateEducation(education.filter((edu) => edu.id !== id));
  const add = () => updateEducation([...education, createEmpty()]);

  return (
    <div className="space-y-4">
      {/* Tip banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="bg-sky-50/50 border border-sky-100 text-sky-800 text-xs rounded-lg p-3 flex items-center gap-2"
      >
        <Lightbulb className="w-3.5 h-3.5 shrink-0" />
        <span>{t('hint.educationTip')}</span>
      </motion.div>

      {education.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="empty-state py-8"
        >
          <div className="empty-state-icon"><Plus className="w-5 h-5" /></div>
          <div className="empty-state-title">{t('empty.education')}</div>
          <div className="empty-state-desc">{t('empty.educationDesc')}</div>
        </motion.div>
      )}

      <AnimatedList>
        {education.map((edu) => (
          <div key={edu.id}>
            <ExpandableCard title={edu.school || t('resume.newSchool')} subtitle={[edu.degree, edu.major].filter(Boolean).join(' · ')} onDelete={() => remove(edu.id)} defaultExpanded={!edu.school}>
              <div className="space-y-4">
                <FormField label={t('form.school')} value={edu.school} onChange={(v) => update(edu.id, { school: v })} placeholder={t('placeholder.school')} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField label={t('form.degree')} value={edu.degree} onChange={(v) => update(edu.id, { degree: v })} placeholder={t('placeholder.degree')} />
                  <FormField label={t('form.major')} value={edu.major} onChange={(v) => update(edu.id, { major: v })} placeholder={t('placeholder.major')} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField label={t('form.startDate')} value={edu.startDate} onChange={(v) => update(edu.id, { startDate: v })} placeholder={t('placeholder.date')} />
                  <FormField label={t('form.endDate')} value={edu.endDate ?? ''} onChange={(v) => update(edu.id, { endDate: v })} placeholder={t('placeholder.date')} />
                </div>
              </div>
            </ExpandableCard>
          </div>
        ))}
      </AnimatedList>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24, delay: education.length * 0.06 }}
      >
        <button
          onClick={add}
          className="w-full border-dashed border-2 border-neutral-200 bg-neutral-50/40 hover:bg-neutral-50 text-neutral-500 rounded-xl h-12 flex items-center justify-center gap-2 transition-all duration-200 text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {t('buttons.addEducation')}
        </button>
      </motion.div>
    </div>
  );
}
