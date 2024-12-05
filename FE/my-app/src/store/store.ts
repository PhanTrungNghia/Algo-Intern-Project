import { applyMiddleware, createStore, Store } from "redux"
import { useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import employeeSlice from "./reducers/employeeSlice"
import adminFunctionSlice from "./reducers/adminFunctionSlice";

// const store: Store<EmployeeState, EmployeeAction> & {
//     dispatch: DispatchType
// } = createStore(employeeReducer, applyMiddleware(thunk)) // apply redux-thunk middleware to handle async code

// export default store;

// Tạo store với configureStore
const store = configureStore({
  reducer: {
    adminFunctionReducer: adminFunctionSlice,
  },
});

export default store;


// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>(); //This is used to perform action
