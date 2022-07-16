import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { EmployeesWithLeaveSlice } from 'slices/interfaces'
import { getEmployeesWithLeavesEndpoint } from 'apis/employees'


const initialState: EmployeesWithLeaveSlice = {
  employeeItems: [],
  status: 'idle',
  error: null

}

export const getEmployeesWithLeaves:any = createAsyncThunk("employeesWithLeave/getEmployeesWithLeaves", async (employeeNo?:string) => {
  try {
    const response = await getEmployeesWithLeavesEndpoint(employeeNo)
    return [...response.data]
  } catch (err:any) {
    console.error('ERROR in getEmployeesWithLeaves', err)
    return err.message
  }  

});


export const employeesWithLeaveSlice = createSlice({
  name: 'employeesWithLeave',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
    .addCase(getEmployeesWithLeaves.pending, (state) => {
      state.status = "loading";
  })
  .addCase(getEmployeesWithLeaves.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.employeeItems = action.payload;
})
.addCase(getEmployeesWithLeaves.rejected, (state, action) => {
  state.status = "failed";
  state.error = action.error.message
})
  }
})

export const getEmployeesWithLeaveItems = (state:any)=>state.employeesWithLeave.employeeItems
export const getEmployeesWithLeaveStatus = (state:any)=>state.employeesWithLeave.status
export const getEmployeesWithLeaveError = (state:any)=>state.employeesWithLeave.error

export default employeesWithLeaveSlice.reducer