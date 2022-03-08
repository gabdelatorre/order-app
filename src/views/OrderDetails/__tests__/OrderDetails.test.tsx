import { fireEvent, render, screen } from '@testing-library/react';
import { MOCK_ORDERS } from '../../../redux/modules/orders/constants';
import { OrderDetails } from '../OrderDetails';

const TEST_ORDER_DETAILS = {
  details: MOCK_ORDERS[0].data,
  createdDate: MOCK_ORDERS[0].createdDate,
  paymentStatus: MOCK_ORDERS[0].paymentStatus,
};

test('renders order details dialog and its details', () => {
  render(<OrderDetails data={TEST_ORDER_DETAILS} visible />);
  expect(screen.getByText('Order Overview')).toBeInTheDocument();
  expect(screen.getByText(/PAID/i)).toBeInTheDocument();
  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  expect(screen.getByText(/Nintendo Switch OLED/i)).toBeInTheDocument();
  expect(screen.getByText(/USD 274.98/i)).toBeInTheDocument();
  expect(screen.getByText(/To Ship/i)).toBeInTheDocument();
  expect(screen.getByText(/DeliveryExpress/i)).toBeInTheDocument();
});

test('triggers onClose upon click of close button', () => {
  const handleClose = jest.fn();
  render(<OrderDetails data={TEST_ORDER_DETAILS} visible onClose={handleClose} />);
  fireEvent.click(screen.getByRole('button'));
  expect(handleClose).toHaveBeenCalledTimes(1);
});
