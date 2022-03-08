import { Provider } from 'react-redux';

import { store } from '../redux/configureStore';
import { Routes } from '../redux/routing/routesMap';
import { useTypedSelector } from '../utils/useTypedSelector';
import { OrderListView } from './OrderList/OrderListView';

const RootView = () => {
  const location = useTypedSelector((state) => state.location.type);

  switch (location) {
    case Routes.ORDERLIST:
      return <OrderListView />;
    default:
      return <></>;
  }
};

const App = () => {
  return (
    <Provider store={store}>
      <RootView />
    </Provider>
  );
};

export default App;
