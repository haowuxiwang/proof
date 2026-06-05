/* eslint-disable react-refresh/only-export-components */
import { type ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import './i18n';

function Wrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function renderWithProviders(ui: ReactNode, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: Wrapper, ...options });
}

export { screen, waitFor, act } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
