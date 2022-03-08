import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

test('renders card', () => {
  render(<Card> test </Card>);
  const content = screen.getByText(/test/i);
  expect(content).toBeInTheDocument();
});

test('renders card header', () => {
  render(<Card.Header> header </Card.Header>);
  const content = screen.getByText(/header/i);
  expect(content).toBeInTheDocument();
});

test('renders card content', () => {
  render(<Card.Content> content </Card.Content>);
  const content = screen.getByText(/content/i);
  expect(content).toBeInTheDocument();
});
