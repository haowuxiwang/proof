import { createEmptyResume, generateId } from './resume';

describe('createEmptyResume', () => {
  it('returns an object with all required sections', () => {
    const resume = createEmptyResume();
    expect(resume).toHaveProperty('personal');
    expect(resume).toHaveProperty('skills');
    expect(resume).toHaveProperty('experience');
    expect(resume).toHaveProperty('education');
    expect(resume).toHaveProperty('projects');
  });

  it('returns empty personal info fields', () => {
    const { personal } = createEmptyResume();
    expect(personal.name).toBe('');
    expect(personal.title).toBe('');
    expect(personal.phone).toBe('');
    expect(personal.email).toBe('');
    expect(personal.github).toBe('');
    expect(personal.website).toBe('');
    expect(personal.location).toBe('');
    expect(personal.summary).toBe('');
  });

  it('returns empty arrays for all list sections', () => {
    const resume = createEmptyResume();
    expect(resume.skills).toEqual([]);
    expect(resume.experience).toEqual([]);
    expect(resume.education).toEqual([]);
    expect(resume.projects).toEqual([]);
  });

  it('returns a new object each time (no shared references)', () => {
    const a = createEmptyResume();
    const b = createEmptyResume();
    expect(a).not.toBe(b);
    expect(a.personal).not.toBe(b.personal);
    expect(a.skills).not.toBe(b.skills);
  });
});

describe('generateId', () => {
  it('returns a string', () => {
    expect(typeof generateId()).toBe('string');
  });

  it('returns unique values on successive calls', () => {
    const ids = new Set(Array.from({ length: 50 }, () => generateId()));
    expect(ids.size).toBe(50);
  });

  it('falls back when crypto.randomUUID is unavailable', () => {
    const original = crypto.randomUUID;
    // @ts-expect-error -- testing fallback
    crypto.randomUUID = undefined;
    const id = generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
    crypto.randomUUID = original;
  });

  it('falls back when crypto.randomUUID throws', () => {
    const original = crypto.randomUUID;
    crypto.randomUUID = () => { throw new Error('not supported'); };
    const id = generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
    crypto.randomUUID = original;
  });
});
