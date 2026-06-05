export function getVariant(templateId: string): 'classic' | 'minimal' | 'modern' {
  if (templateId === 'minimal') return 'minimal';
  if (templateId === 'modern' || templateId === 'executive') return 'modern';
  return 'classic';
}
