import { MOCK_ORDERS } from './constants';
import { TGetOrderRequest, TOrderList, TOrderResponse } from './types';

const MOCK_API_RESPONSE_TIME = 800;

export const mockGetOrder = async (req: TGetOrderRequest) => {
  const { pageOption, filterOption, searchOption } = req;

  return new Promise<TOrderResponse>((res) => {
    setTimeout(() => {
      let orderList: TOrderList[] = MOCK_ORDERS;

      // filter data based on searchOption
      if (searchOption) {
        orderList = orderList.filter((order) =>
          (order[searchOption.column] as string).toLocaleLowerCase().includes(searchOption.value.toLocaleLowerCase())
        );
      }

      // filter data based on filterOption
      if (filterOption) {
        filterOption.forEach((filter) => {
          orderList = orderList.filter((order) => order[filter.column] === filter.value);
        });
      }

      const filteredLength = orderList.length;

      // slice data based on pageOption
      if (pageOption) {
        const { pageNumber, pageSize } = pageOption;
        const startIdx = (pageNumber - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        orderList = orderList.slice(startIdx, endIdx);
      }

      res({ data: orderList, totalSize: filteredLength });
    }, MOCK_API_RESPONSE_TIME);
  });
};

export const mockDeleteOrder = async (id: string) => {
  return new Promise((res) => {
    setTimeout(() => {
      const orderToDelete = MOCK_ORDERS.findIndex((order) => order.id === id);
      MOCK_ORDERS.splice(orderToDelete, 1);
      res('success');
    }, MOCK_API_RESPONSE_TIME);
  });
};
