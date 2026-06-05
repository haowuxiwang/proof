import { templates, getTemplateById } from './templateRegistry';

describe('templates', () => {
  it('contains 4 templates', () => {
    expect(templates).toHaveLength(4);
  });

  it('each template has required fields', () => {
    for (const t of templates) {
      expect(t).toHaveProperty('id');
      expect(t).toHaveProperty('name');
      expect(t).toHaveProperty('description');
      expect(t).toHaveProperty('colors');
      expect(t).toHaveProperty('fonts');
      expect(t).toHaveProperty('layout');
    }
  });

  it('each template has valid layout', () => {
    const validLayouts = ['single-column', 'two-column', 'sidebar'];
    for (const t of templates) {
      expect(validLayouts).toContain(t.layout);
    }
  });

  it('each template has all color fields', () => {
    for (const t of templates) {
      expect(t.colors).toHaveProperty('primary');
      expect(t.colors).toHaveProperty('secondary');
      expect(t.colors).toHaveProperty('accent');
      expect(t.colors).toHaveProperty('text');
      expect(t.colors).toHaveProperty('textLight');
      expect(t.colors).toHaveProperty('background');
    }
  });

  it('each template has heading and body fonts', () => {
    for (const t of templates) {
      expect(t.fonts).toHaveProperty('heading');
      expect(t.fonts).toHaveProperty('body');
    }
  });

  it('template ids are unique', () => {
    const ids = templates.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('getTemplateById', () => {
  it('finds classic template', () => {
    const t = getTemplateById('classic');
    expect(t).toBeDefined();
    expect(t!.name).toBe('Classic');
  });

  it('finds minimal template', () => {
    const t = getTemplateById('minimal');
    expect(t).toBeDefined();
    expect(t!.name).toBe('Minimal');
  });

  it('finds modern template', () => {
    const t = getTemplateById('modern');
    expect(t).toBeDefined();
    expect(t!.name).toBe('Modern');
  });

  it('finds executive template', () => {
    const t = getTemplateById('executive');
    expect(t).toBeDefined();
    expect(t!.name).toBe('Executive');
  });

  it('returns undefined for unknown id', () => {
    expect(getTemplateById('nonexistent')).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(getTemplateById('')).toBeUndefined();
  });
});
