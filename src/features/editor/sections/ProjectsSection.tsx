import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useResumeStore } from '../../../store/resumeStore';
import type { Project } from '../../../types/resume';
import { generateId } from '../../../types/resume';
import ExpandableCard from '../components/ExpandableCard';
import FormField from '../components/FormField';
import HighlightList from '../components/HighlightList';
import TagInput from '../components/TagInput';
import { AnimatedList } from '@/components/magicui';
import { Plus, Lightbulb } from 'lucide-react';

function createEmpty(): Project {
  return { id: generateId(), name: '', description: '', techStack: [], highlights: [], link: '' };
}

export default function ProjectsSection() {
  const { t } = useTranslation();
  const projects = useResumeStore((s) => s.resume.projects);
  const updateProjects = useResumeStore((s) => s.updateProjects);

  const update = (id: string, data: Partial<Project>) => {
    updateProjects(projects.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };
  const remove = (id: string) => updateProjects(projects.filter((p) => p.id !== id));
  const add = () => updateProjects([...projects, createEmpty()]);

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
        <span>{t('hint.projectTip')}</span>
      </motion.div>

      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.06 }}
          className="empty-state py-8"
        >
          <div className="empty-state-icon"><Plus className="w-5 h-5" /></div>
          <div className="empty-state-title">{t('empty.projects')}</div>
          <div className="empty-state-desc">{t('empty.projectsDesc')}</div>
        </motion.div>
      )}

      <AnimatedList>
        {projects.map((proj) => (
          <div key={proj.id}>
            <ExpandableCard title={proj.name || t('form.projectName')} subtitle={proj.techStack.slice(0, 3).join(' · ')} onDelete={() => remove(proj.id)} defaultExpanded={!proj.name}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label={t('form.projectName')} value={proj.name} onChange={(v) => update(proj.id, { name: v })} placeholder={t('placeholder.projectName')} />
                  <FormField label={t('form.link')} value={proj.link || ''} onChange={(v) => update(proj.id, { link: v || undefined })} placeholder={t('placeholder.projectLink')} />
                </div>
                <FormField label={t('form.description')} value={proj.description} onChange={(v) => update(proj.id, { description: v })} placeholder={t('placeholder.description')} multiline />
                <TagInput tags={proj.techStack} onChange={(techStack) => update(proj.id, { techStack })} />
                <HighlightList highlights={proj.highlights} onChange={(highlights) => update(proj.id, { highlights })} />
              </div>
            </ExpandableCard>
          </div>
        ))}
      </AnimatedList>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24, delay: (projects.length + 1) * 0.06 }}
      >
        <button
          onClick={add}
          className="w-full border-dashed border-2 border-neutral-200 bg-neutral-50/40 hover:bg-neutral-50 text-neutral-500 rounded-xl h-12 flex items-center justify-center gap-2 transition-all duration-200 text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {t('buttons.addProject')}
        </button>
      </motion.div>
    </div>
  );
}
