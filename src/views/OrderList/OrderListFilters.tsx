import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import styled from 'styled-components';

import { Tabs } from '../../components';
import { ORDER_TABS } from './constants';
import { useOrderList } from './OrderListView';
import { TableActions } from './types';

const TabsWrapper = styled.div`
  margin-bottom: 14px;
`;

const FormControl = styled(Form.Control)`
  width: 400px;
`;

export const OrderListFilters = () => {
  const { orderStatusTab, handleTabChange, tableDispatch } = useOrderList();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target) return;
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      tableDispatch({
        type: TableActions.SET_TABLE_SEARCH,
        payload: searchValue
          ? {
              column: 'customer',
              value: searchValue,
            }
          : undefined,
      });
    }
  };

  const onTabChange = (idx: number) => {
    setSearchValue('');
    handleTabChange(idx);
  };

  return (
    <div>
      <TabsWrapper>
        <Tabs active={orderStatusTab} tabs={ORDER_TABS} onChange={onTabChange} />
      </TabsWrapper>
      <FormControl
        value={searchValue}
        placeholder='Search by Customer'
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};
