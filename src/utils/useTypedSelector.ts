import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { RootState } from '../redux/configureStore';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
