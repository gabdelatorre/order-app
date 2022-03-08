import { render, screen } from '@testing-library/react';
import { EmptyState } from '../EmptyState';

test('renders emptystate', () => {
  render(<EmptyState primaryMessage='primary' secondaryMessage='secondary' />);
  expect(screen.getByText(/primary/i)).toBeInTheDocument();
  expect(screen.getByText(/secondary/i)).toBeInTheDocument();
});
