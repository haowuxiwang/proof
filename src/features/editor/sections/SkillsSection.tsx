import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useResumeStore } from '../../../store/resumeStore';
import type { SkillCategory } from '../../../types/resume';
import { generateId } from '../../../types/resume';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

export default function SkillsSection() {
  const { t } = useTranslation();
  const skills = useResumeStore((s) => s.resume.skills);
  const updateSkills = useResumeStore((s) => s.updateSkills);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [newSkills, setNewSkills] = useState<Record<string, string>>({});

  const addCategory = () => {
    const id = generateId();
    const cat: SkillCategory = { id, category: '', items: [] };
    updateSkills([...skills, cat]);
    setActiveId(id);
  };

  const updateCategory = (id: string, data: Partial<SkillCategory>) => {
    const next = skills.map((s) => s.id === id ? { ...s, ...data } : s);
    updateSkills(next);
  };

  const removeCategory = (id: string) => {
    updateSkills(skills.filter((s) => s.id !== id));
    if (activeId === id) setActiveId(null);
    setNewSkills((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const addSkill = (id: string) => {
    const trimmed = (newSkills[id] || '').trim();
    if (!trimmed) return;
    const cat = skills.find((s) => s.id === id);
    if (!cat) return;
    updateCategory(id, { items: [...cat.items, trimmed] });
    setNewSkills((prev) => ({ ...prev, [id]: '' }));
  };

  const removeSkill = (catId: string, skillIdx: number) => {
    const cat = skills.find((s) => s.id === catId);
    if (!cat) return;
    updateCategory(catId, { items: cat.items.filter((_, i) => i !== skillIdx) });
  };

  return (
    <div className="space-y-4">
      {skills.map((cat) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          <div className="card">
            <div
              className="card-header"
              role="button"
              tabIndex={0}
              aria-expanded={activeId === cat.id}
              onClick={() => setActiveId(activeId === cat.id ? null : cat.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveId(activeId === cat.id ? null : cat.id); } }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <input
                  className="bg-transparent border-none outline-none text-sm font-medium truncate"
                  style={{ color: 'var(--text)', width: '100%' }}
                  value={cat.category}
                  aria-label={t('form.skillCategory')}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => updateCategory(cat.id, { category: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="text-[10px] px-1.5">{cat.items.length}</Badge>
                <button
                  className="btn-icon danger"
                  aria-label={t('resume.delete')}
                  onClick={(e) => { e.stopPropagation(); removeCategory(cat.id); }}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {activeId === cat.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="card-body">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {cat.items.map((skill, si) => (
                        <Badge
                          key={si}
                          variant="secondary"
                          className="gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => removeSkill(cat.id, si)}
                          aria-label={`${t('resume.delete')} ${skill}`}
                        >
                          {skill}
                          <X className="w-2.5 h-2.5" />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        className="input-field flex-1"
                        value={newSkills[cat.id] || ''}
                        onChange={(e) => setNewSkills((prev) => ({ ...prev, [cat.id]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(cat.id); } }}
                        placeholder={t('resume.addSkill')}
                        aria-label={t('resume.addSkill')}
                      />
                      <Button variant="outline" size="icon" onClick={() => addSkill(cat.id)}>
                        <Plus className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24, delay: skills.length * 0.06 }}
      >
        <button
          onClick={addCategory}
          className="w-full border-dashed border-2 border-neutral-200 bg-neutral-50/40 hover:bg-neutral-50 text-neutral-500 rounded-xl h-12 flex items-center justify-center gap-2 transition-all duration-200 text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {t('buttons.addCategory')}
        </button>
      </motion.div>
    </div>
  );
}
