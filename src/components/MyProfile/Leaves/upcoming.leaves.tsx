import {
  ClearTwoTone,
  EditTwoTone,
  UpcomingTwoTone,
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { DataGrid, gridClasses, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { useState } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';

type Props = {
  data: any[];
  isHRview?: boolean;
};

const columns: GridColDef[] = [
  {
    field: 'leaveTypeDetails',
    width: 50,
    headerName: '',
    renderCell: (params: any) => {
      return <Tooltip title={params.row.leaveTypeDetails.name} >
        {params.row.leaveTypeDetails.icon}
      </Tooltip>;
    },
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 200
  },
  {
    field: 'noOfDays',
    headerName: 'No. Of Days',
    align: 'center'
  },
  {
    field: 'returnDate',
    headerName: 'Return Date',
    width: 200
  },
  {
    field: 'status',
    headerName: 'Status'
  },
  {
    field: 'reasonOfLeave',
    headerName: 'Reason of Leave',
    width: 400
  },
  {
    field: '',
    headerName: 'Actions',
    width: 200,
    renderCell: (params: any) => {
      return (
        <div className='flex flex-row gap-2 text-xs justify-center w-full'>
          <button className='bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 flex items-center justify-center transition duration-150 ease-in-out rounded-sm'>
            <ClearTwoTone className='text-sm' /> Cancel
          </button>
          <button className='bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 flex items-center justify-center transition duration-150 ease-in-out rounded-sm'>
            <EditTwoTone className='text-sm' /> Update
          </button>
        </div>
      );
    },
  },
];

const UpcomingLeaves = ({data}: Props) => {
console.log({data}, "dddddddddd")
  return (
    <CollapseWrapper
      panelTitle='Upcoming/Ongoing Leaves'
      icon={UpcomingTwoTone}
      open
      contentClassName='p-0'
    >
      <DataGrid
        autoHeight
        disableSelectionOnClick
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 1,
            wordBreak: "break-word"
          },
        }}
        hideFooter={true}
        getRowHeight={() => 'auto'}
        getRowId={(data) => data.id}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              status: false,
              // startDate: false,
            },
          },
        }}
        className="data-grid border-0"
        density='compact'
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
    </CollapseWrapper>
  );
};

export default UpcomingLeaves;
