import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

// initial admin function state
const initialState: AdminFunctionState = {
    adminFunctions: [
        {
            NAME: "CRUD",
            STATUS: "DISABLED",

        },
    ],
    pending: true,
}

export const createAdminFunction = createAsyncThunk(
    "createAdminFunction",
    async (adminFunction: IAdminFunction, { rejectWithValue }) => {
        // const url: string = "";
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(adminFunction),
        // };
        // const resp = await fetch(url, requestOptions);
        // try {
        //     const json = await resp.json();
        //     return json;
        // } catch (error) {
        //     return rejectWithValue(error);
        // }
        console.log(adminFunction);
    }
)

export const updateAdminFunction = createAsyncThunk(
    "updateAdminFunction",
    async (adminFunction: IAdminFunction, { rejectWithValue }) => {
        // const url: string = `http://localhost:5088/Employee/add/${employee.idEmployee}`;
        // const requestOptions = {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(adminFunction),
        // };
        // const resp = await fetch(url, requestOptions);
        // try {
        //     const json = await resp.json();
        //     return json;
        // } catch (error) {
        //     return rejectWithValue(error);
        // }
        console.log(adminFunction);
    }
)

export const readAllAdminFunctions = createAsyncThunk(
    "readAllAdminFunctions",
    async (args, { rejectWithValue }) => {
        const url: string = "http://localhost:8080/admin/api/AdminFunction";
        const resp = await fetch(url);
        try {
            const json = await resp.json();
            console.log(json);
            return json;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const deleteAdminFunction = createAsyncThunk(
    "deleteAdminFunction",
    async (id: number | undefined, { rejectWithValue }) => {
    // Nếu hàm deleteAdminFunction không trả về data 
    // thì createAsyncThunk sẽ expect là action.payload nhận vào từ component có thể undefined
    // => Khai bảo kiểu sử lý trạng thái fullfilled của hàm deleteAdminFunction là PayloadAction<{ id: number | undefined}>
    //     const url: string = `http://localhost:5088/Employee/delete/${id}`;
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     };
    //     const resp = await fetch(url, requestOptions);
    //     try {
    //         const json = await resp.json();
    //         return json;
    //     } catch (error) {
    //         return rejectWithValue(error);
    //     }
    console.log("Deleted id: " + id);
    }
)

// employee slice với trạng thái ban đầu và các reducer để thay đổi trạng thái.
// Chúng thực hiện các thao tác CRUD và cũng chuyển đổi employee.
// Redux-Toolkit sử dụng Immutable.js cho phép chúng ta thay đổi trạng thái
// nhưng phía nền tảng mọi thứ hoạt động như trạng thái không thay đổi.
const adminFunctionSlice = createSlice({
    name: "adminFunctionSlice",
    initialState,
    reducers: {
        searchAdminFunction: (
            state: AdminFunctionState,
            action: PayloadAction<string | undefined>
        ): void => {
            state.searchData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAdminFunction.pending, (state) => {
                state.pending = true;
            })
            // .addCase(createAdminFunction.fulfilled, (state, action: PayloadAction<IAdminFunction>) => {
            //     state.pending = false;
            //     state.adminFunctions.push(action.payload);
            // })
            .addCase(createAdminFunction.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error as Error;
            })
            .addCase(readAllAdminFunctions.pending, (state) => {
                state.pending = true;
            })
            .addCase(readAllAdminFunctions.fulfilled, (state, action: PayloadAction<IAdminFunction[]>) => {
                state.pending = false;
                state.adminFunctions = action.payload;
            })
            .addCase(readAllAdminFunctions.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error as Error;
            })
            .addCase(deleteAdminFunction.pending, (state) => {
                state.pending = true;
            })
            // .addCase(deleteAdminFunction.fulfilled, (state, action: PayloadAction<number | undefined>) => {
            //     state.pending = false;
            //     state.adminFunctions = state.adminFunctions.filter(
            //         (af: IAdminFunction) => af.id !== action.payload.id
            //     );
            // })
            .addCase(deleteAdminFunction.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error as Error;
            })
            .addCase(updateAdminFunction.pending, (state) => {
                state.pending = true;
            })
            // .addCase(updateAdminFunction.fulfilled, (state, action: PayloadAction<IAdminFunction>) => {
            //     state.pending = false;
            //     state.adminFunctions = state.adminFunctions.map((af: IAdminFunction) =>
            //         af.id === action.payload.id ? action.payload : af
            //     );
            // })
            .addCase(updateAdminFunction.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error as Error;
            });

    },
});

export default adminFunctionSlice.reducer; // ?
// Destructing from actions
export const { searchAdminFunction } = adminFunctionSlice.actions;
