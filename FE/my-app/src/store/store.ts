import { applyMiddleware, createStore, Store } from "redux"
import reducer from "./reducers/reducer"
import { thunk } from "redux-thunk"
import employeeReducer from "./reducers/employeeReducer"
import { useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import employeeSlice from "./reducers/employeeSlice"

// const store: Store<EmployeeState, EmployeeAction> & {
//     dispatch: DispatchType
// } = createStore(employeeReducer, applyMiddleware(thunk)) // apply redux-thunk middleware to handle async code

// export default store;

// Tạo store với configureStore
const store = configureStore({
  reducer: {
    reducer: employeeSlice,
  },
});

export default store;


// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>(); //This is used to perform action
