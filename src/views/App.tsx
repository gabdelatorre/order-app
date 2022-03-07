import { Provider } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';

import { store } from '../redux/configureStore';
import { Routes } from '../redux/routing/routesMap';
import { useTypedSelector } from '../utils/useTypedSelector';
import { OrderListView } from './OrderList/OrderListView';
import { NotFoundView } from './NotFound/NotFoundView';

const RootView = () => {
  const location = useTypedSelector((state) => state.location.type);

  switch (location) {
    case Routes.ORDERLIST:
      return <OrderListView />;
    case NOT_FOUND:
    default:
      return <NotFoundView />;
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
