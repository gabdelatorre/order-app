import { render, screen } from '@testing-library/react';
import { HeaderBreadcrumb } from '../HeaderBreadcrumb';

test('renders header breadcrumb', () => {
  render(<HeaderBreadcrumb active={'Current Tab'} />);
  expect(screen.getByText(/Orders/i)).toBeInTheDocument();
  expect(screen.getByText(/Current Tab/i)).toBeInTheDocument();
});
