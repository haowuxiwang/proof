import { renderWithProviders, screen } from '../../../test-utils';
import ResumeHeader from './ResumeHeader';
import { templates } from '../../templates/templateRegistry';
import type { PersonalInfo } from '../../../types/resume';

const template = templates[0];

const emptyPersonal: PersonalInfo = {
  name: '', title: '', phone: '', email: '', github: '', website: '', location: '', summary: '',
};

const fullPersonal: PersonalInfo = {
  name: 'Alice',
  title: 'Engineer',
  phone: '123-456',
  email: 'alice@test.com',
  github: 'https://github.com/alice',
  website: 'alice.dev',
  location: 'NYC',
  summary: 'A developer',
};

describe('ResumeHeader', () => {
  it('renders name', () => {
    renderWithProviders(<ResumeHeader personal={fullPersonal} colors={template.colors} fonts={template.fonts} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('renders title', () => {
    renderWithProviders(<ResumeHeader personal={fullPersonal} colors={template.colors} fonts={template.fonts} />);
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('renders email, phone, location as contact items', () => {
    renderWithProviders(<ResumeHeader personal={fullPersonal} colors={template.colors} fonts={template.fonts} />);
    expect(screen.getByText('alice@test.com')).toBeInTheDocument();
    expect(screen.getByText('123-456')).toBeInTheDocument();
    expect(screen.getByText('NYC')).toBeInTheDocument();
  });

  it('renders GitHub link with correct href', () => {
    renderWithProviders(<ResumeHeader personal={fullPersonal} colors={template.colors} fonts={template.fonts} />);
    const link = screen.getByText('GitHub');
    expect(link).toHaveAttribute('href', 'https://github.com/alice');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('prepends https to github url without protocol', () => {
    const personal = { ...fullPersonal, github: 'github.com/alice' };
    renderWithProviders(<ResumeHeader personal={personal} colors={template.colors} fonts={template.fonts} />);
    expect(screen.getByText('GitHub')).toHaveAttribute('href', 'https://github.com/alice');
  });

  it('renders Website link with correct href', () => {
    renderWithProviders(<ResumeHeader personal={fullPersonal} colors={template.colors} fonts={template.fonts} />);
    const link = screen.getByText('Website');
    expect(link).toHaveAttribute('href', 'https://alice.dev');
  });

  it('prepends https to website url without protocol', () => {
    const personal = { ...fullPersonal, website: 'alice.dev' };
    renderWithProviders(<ResumeHeader personal={personal} colors={template.colors} fonts={template.fonts} />);
    expect(screen.getByText('Website')).toHaveAttribute('href', 'https://alice.dev');
  });

  it('does not render GitHub link when empty', () => {
    const personal = { ...fullPersonal, github: '' };
    renderWithProviders(<ResumeHeader personal={personal} colors={template.colors} fonts={template.fonts} />);
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
  });

  it('does not render Website link when empty', () => {
    const personal = { ...fullPersonal, website: '' };
    renderWithProviders(<ResumeHeader personal={personal} colors={template.colors} fonts={template.fonts} />);
    expect(screen.queryByText('Website')).not.toBeInTheDocument();
  });

  it('shows placeholder name when empty', () => {
    renderWithProviders(<ResumeHeader personal={emptyPersonal} colors={template.colors} fonts={template.fonts} />);
    // Should render the i18n fallback key
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('applies centered style when centered prop is true', () => {
    const { container } = renderWithProviders(
      <ResumeHeader personal={fullPersonal} colors={template.colors} fonts={template.fonts} centered />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.textAlign).toBe('center');
  });

  it('does not render contact items when all are empty', () => {
    const { container } = renderWithProviders(
      <ResumeHeader personal={emptyPersonal} colors={template.colors} fonts={template.fonts} />
    );
    const flexDiv = container.querySelector('.flex.flex-wrap');
    expect(flexDiv?.children.length).toBe(0);
  });
});
