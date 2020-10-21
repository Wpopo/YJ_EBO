import { combineReducers } from 'redux-immer';
import produce from 'immer';
import uiHeaderTitleReducer from './uiHeaderTitle/reducer';
import uiMessagePopupReducer from './uiMessagePopup/reducer';
import uiDrawerReducer from './uiDrawer/reducer';
import uiLoadingReducer from './uiLoading/reducer';

const rootReducer = combineReducers(produce, {
  headerTitle: uiHeaderTitleReducer,
  uiMessagePopup: uiMessagePopupReducer,
  uiDrawer: uiDrawerReducer,
  uiLoading: uiLoadingReducer,
});

export default rootReducer;
