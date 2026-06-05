import {
  User,
  Lightbulb,
  Briefcase,
  GraduationCap,
  FolderKanban,
} from 'lucide-react';
import type { SectionId } from '../../store/resumeStore';

type NavKey = 'nav.personal' | 'nav.skills' | 'nav.work' | 'nav.education' | 'nav.projects';
type WizardKey = 'wizard.personalDesc' | 'wizard.skillsDesc' | 'wizard.experienceDesc' | 'wizard.educationDesc' | 'wizard.projectsDesc';

export interface SectionStep {
  id: SectionId;
  labelKey: NavKey;
  descKey: WizardKey;
  icon: typeof User;
}

export const steps: SectionStep[] = [
  { id: 'personal', labelKey: 'nav.personal', descKey: 'wizard.personalDesc', icon: User },
  { id: 'skills', labelKey: 'nav.skills', descKey: 'wizard.skillsDesc', icon: Lightbulb },
  { id: 'experience', labelKey: 'nav.work', descKey: 'wizard.experienceDesc', icon: Briefcase },
  { id: 'education', labelKey: 'nav.education', descKey: 'wizard.educationDesc', icon: GraduationCap },
  { id: 'projects', labelKey: 'nav.projects', descKey: 'wizard.projectsDesc', icon: FolderKanban },
];
