import { fireEvent, render, screen } from '@testing-library/react';
import { Tabs } from '../Tabs';

const TEST_TABS = ['One', 'Two', 'Three'];

test('renders tabs', () => {
  render(<Tabs active={0} tabs={TEST_TABS} />);
  expect(screen.getByText('One')).toBeInTheDocument();
  expect(screen.getByText('Two')).toBeInTheDocument();
  expect(screen.getByText('Three')).toBeInTheDocument();
});

test('triggers onChange upon tab click', () => {
  const handleTabClick = jest.fn();
  render(<Tabs active={0} tabs={TEST_TABS} onChange={handleTabClick} />);
  fireEvent.click(screen.getByText('Two'));

  expect(handleTabClick).toHaveBeenCalledWith(1);
});
