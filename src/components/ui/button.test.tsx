import { render, screen } from '@testing-library/react';
import { Button, buttonVariants } from './button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-slot', 'button');
  });

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with link variant', () => {
    render(<Button variant="link">Link</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with sm size', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with lg size', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with icon size', () => {
    render(<Button size="icon">X</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('class', expect.stringContaining('custom-class'));
  });
});

describe('buttonVariants', () => {
  it('returns a string', () => {
    expect(typeof buttonVariants()).toBe('string');
  });

  it('returns a string for each variant', () => {
    expect(typeof buttonVariants({ variant: 'default' })).toBe('string');
    expect(typeof buttonVariants({ variant: 'outline' })).toBe('string');
    expect(typeof buttonVariants({ variant: 'ghost' })).toBe('string');
    expect(typeof buttonVariants({ variant: 'destructive' })).toBe('string');
    expect(typeof buttonVariants({ variant: 'secondary' })).toBe('string');
    expect(typeof buttonVariants({ variant: 'link' })).toBe('string');
  });

  it('returns a string for each size', () => {
    expect(typeof buttonVariants({ size: 'default' })).toBe('string');
    expect(typeof buttonVariants({ size: 'sm' })).toBe('string');
    expect(typeof buttonVariants({ size: 'lg' })).toBe('string');
    expect(typeof buttonVariants({ size: 'icon' })).toBe('string');
    expect(typeof buttonVariants({ size: 'xs' })).toBe('string');
  });
});
