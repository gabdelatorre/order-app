import { PaymentStatus, TOrderDetails } from '../../redux/modules/orders/types';

export interface TOrderDetailsDialogData {
  paymentStatus: PaymentStatus;
  createdDate: string;
  details: TOrderDetails;
}

export interface TOrderDetailsProps {
  data?: TOrderDetailsDialogData;
  visible: boolean;
  onClose?: () => void;
}
