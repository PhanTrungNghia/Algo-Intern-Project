import { configureStore } from "@reduxjs/toolkit";
import adminFunctionSlice from "./reducers/adminFunctionSlice";
import { authReducer } from "./auth.slice";

export * from './auth.slice';
export * from './reducers/adminFunctionSlice';

// const store: Store<EmployeeState, EmployeeAction> & {
//     dispatch: DispatchType
// } = createStore(employeeReducer, applyMiddleware(thunk)) // apply redux-thunk middleware to handle async code

// export default store;

// Tạo store với configureStore
const store = configureStore({
  reducer: {
    adminFunctionReducer: adminFunctionSlice,
    auth: authReducer
  },
});

export default store;

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>(); //This is used to perform action
