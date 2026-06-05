import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useResumeStore } from '../../../store/resumeStore';
import type { WorkExperience } from '../../../types/resume';
import { generateId } from '../../../types/resume';
import ExpandableCard from '../components/ExpandableCard';
import FormField from '../components/FormField';
import HighlightList from '../components/HighlightList';
import { AnimatedList } from '@/components/magicui';
import { Plus, Lightbulb } from 'lucide-react';

function createEmpty(): WorkExperience {
  return { id: generateId(), company: '', position: '', startDate: '', endDate: '', description: '', highlights: [] };
}

export default function ExperienceSection() {
  const { t } = useTranslation();
  const experience = useResumeStore((s) => s.resume.experience);
  const updateExperience = useResumeStore((s) => s.updateExperience);

  const update = (id: string, data: Partial<WorkExperience>) => {
    updateExperience(experience.map((exp) => (exp.id === id ? { ...exp, ...data } : exp)));
  };
  const remove = (id: string) => updateExperience(experience.filter((exp) => exp.id !== id));
  const add = () => updateExperience([...experience, createEmpty()]);

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
        <span>{t('hint.experienceTip')}</span>
      </motion.div>

      {experience.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.06 }}
          className="empty-state py-8"
        >
          <div className="empty-state-icon"><Plus className="w-5 h-5" /></div>
          <div className="empty-state-title">{t('empty.experience')}</div>
          <div className="empty-state-desc">{t('empty.experienceDesc')}</div>
        </motion.div>
      )}

      <AnimatedList>
        {experience.map((exp) => (
          <div key={exp.id}>
            <ExpandableCard title={exp.position || t('form.position')} subtitle={exp.company || t('form.company')} onDelete={() => remove(exp.id)} defaultExpanded={!exp.company}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label={t('form.company')} value={exp.company} onChange={(v) => update(exp.id, { company: v })} placeholder={t('placeholder.company')} />
                  <FormField label={t('form.position')} value={exp.position} onChange={(v) => update(exp.id, { position: v })} placeholder={t('placeholder.position')} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label={t('form.startDate')} value={exp.startDate} onChange={(v) => update(exp.id, { startDate: v })} placeholder={t('placeholder.date')} />
                  <FormField label={t('form.endDate')} value={exp.endDate || ''} onChange={(v) => update(exp.id, { endDate: v || undefined })} placeholder={t('placeholder.date')} />
                </div>
                <FormField label={t('form.description')} value={exp.description} onChange={(v) => update(exp.id, { description: v })} placeholder={t('placeholder.description')} multiline />
                <HighlightList highlights={exp.highlights} onChange={(highlights) => update(exp.id, { highlights })} />
              </div>
            </ExpandableCard>
          </div>
        ))}
      </AnimatedList>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24, delay: (experience.length + 1) * 0.06 }}
      >
        <button
          onClick={add}
          className="w-full border-dashed border-2 border-neutral-200 bg-neutral-50/40 hover:bg-neutral-50 text-neutral-500 rounded-xl h-12 flex items-center justify-center gap-2 transition-all duration-200 text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {t('buttons.addExperience')}
        </button>
      </motion.div>
    </div>
  );
}
