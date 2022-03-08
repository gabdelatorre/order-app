import moment from 'moment';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { PaymentStatus } from '../../redux/modules/orders/types';
import { TOrderDetailsProps } from './types';
import {
  DetailWrapper,
  HeaderWrapper,
  TotalPriceRow,
  LogisticsCol,
  HeaderCol,
  HeaderPriceCol,
  PriceCol,
  DiscountCol,
  GutterRow,
  PaymentWrapper,
} from './styles';

export const OrderDetails = ({ data, visible, onClose }: TOrderDetailsProps) => {
  if (!data) return <></>;

  const { customer, products, logistics } = data.details;
  const subTotal = products.items.map((item) => item.price).reduce((prev, item) => item + prev);

  return (
    <Modal show={visible} onHide={onClose} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>Order Overview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <HeaderWrapper>
          <div>Order Created: {moment(data.createdDate).format('DD/MM/YYYY, kk:mm')} </div>
          <PaymentWrapper isPaid={data.paymentStatus === PaymentStatus.PAID}>
            {data.paymentStatus.toUpperCase()}
          </PaymentWrapper>
        </HeaderWrapper>
        <DetailWrapper>
          <h6>Customer Details</h6>
          <Container>
            <Row>
              <HeaderCol md={3}>Name</HeaderCol>
              <Col md={9}>{customer.customerName}</Col>
            </Row>
            <Row>
              <HeaderCol md={3}>Mobile Number</HeaderCol>
              <Col md={9}>{customer.mobileNumber}</Col>
            </Row>
            <Row>
              <HeaderCol md={3}>Email Address</HeaderCol>
              <Col md={9}>{customer.emailAddress}</Col>
            </Row>
            <Row>
              <HeaderCol md={3}>Address</HeaderCol>
              <Col md={9}>{customer.address}</Col>
            </Row>
          </Container>
        </DetailWrapper>
        <DetailWrapper>
          <h6>Product Information</h6>
          <Container>
            <Row>
              <HeaderCol md={5}>Product Name</HeaderCol>
              <HeaderCol md={3}>Variant</HeaderCol>
              <HeaderCol md={2}>QTY</HeaderCol>
              <HeaderPriceCol md={2}>Price</HeaderPriceCol>
            </Row>
            {products.items.map((item) => {
              return (
                <Row key={item.productName}>
                  <Col md={5}>{item.productName}</Col>
                  <Col md={3}>{item.variant}</Col>
                  <Col md={2}>{item.quantity}</Col>
                  <PriceCol md={2}>{`${item.currency} ${item.price}`}</PriceCol>
                </Row>
              );
            })}
            <br />
            <Row>
              <Col md={5}></Col>
              <Col md={3}></Col>
              <Col md={2}>Subtotal</Col>
              <PriceCol md={2}>{`${products.currency} ${subTotal}`}</PriceCol>
            </Row>
            <Row>
              <Col md={5}></Col>
              <Col md={3}></Col>
              <Col md={2}>Delivery Fee</Col>
              <PriceCol md={2}>{`${products.currency} ${products.deliveryFee.toFixed(2)}`}</PriceCol>
            </Row>
            <Row>
              <Col md={5}></Col>
              <Col md={3}></Col>
              <Col md={2}>Discount</Col>
              <DiscountCol md={2}>{`-${products.currency} ${products.discount.toFixed(2)}`}</DiscountCol>
            </Row>
            <br />
            <TotalPriceRow>
              <Col md={5}></Col>
              <Col md={3}></Col>
              <Col md={2}>Total Amount Due</Col>
              <PriceCol md={2}>{`${products.currency} ${
                subTotal + products.deliveryFee - products.discount
              }`}</PriceCol>
            </TotalPriceRow>
          </Container>
        </DetailWrapper>
        <DetailWrapper>
          <h6>Logistic Details</h6>
          <Container>
            <GutterRow>
              <Row>
                <HeaderCol md={12}>Delivery Status</HeaderCol>
              </Row>
              <Row>
                <LogisticsCol md={12}>{logistics.logisticStatus.replaceAll('_', ' ')}</LogisticsCol>
              </Row>
            </GutterRow>
            <GutterRow>
              <HeaderCol md={12}>Recipient's Address</HeaderCol>
              <Row>
                <Col md={3}>Delivery Location</Col>
                <Col md={9}>{logistics.recipientAddress}</Col>
              </Row>
            </GutterRow>
            <GutterRow>
              <Row>
                <HeaderCol md={12}>Delivery Option</HeaderCol>
              </Row>
              <Row>
                <Col md={3}>Delivery Provider</Col>
                <Col md={9}>{logistics.deliveryProvider}</Col>
              </Row>
            </GutterRow>
            <GutterRow>
              <Row>
                <HeaderCol md={12}>Delivery Description</HeaderCol>
              </Row>
              <Row>
                <Col md={3}>Weight</Col>
                <Col md={9}>{logistics.weight}</Col>
              </Row>
              <Row>
                <Col md={3}>Note to Recipient</Col>
                <Col md={9}>{logistics.note}</Col>
              </Row>
            </GutterRow>
          </Container>
        </DetailWrapper>
      </Modal.Body>
    </Modal>
  );
};
