import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from '../Pagination';

const TEST_TOTAL_SIZE = 53;
const TEST_PAGE_SIZE = 10;

test('renders pagination', () => {
  render(<Pagination active={1} totalSize={TEST_TOTAL_SIZE} pageSize={TEST_PAGE_SIZE} />);
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(screen.getByText('6')).toBeInTheDocument();
});

test('triggers onChange upon page click', () => {
  const onPaginationChange = jest.fn();
  render(<Pagination active={1} totalSize={TEST_TOTAL_SIZE} pageSize={TEST_PAGE_SIZE} onChange={onPaginationChange} />);

  fireEvent.click(screen.getByText('5'));
  expect(onPaginationChange).toHaveBeenCalledWith(5);
});
