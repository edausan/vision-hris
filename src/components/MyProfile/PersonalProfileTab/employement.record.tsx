import { Add, BadgeTwoTone } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useContext, useState } from 'react';
import CollapseWrapper from './collapse.wrapper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ProfileCtx } from '../profile.main';
import { Dialog, TextField } from '@mui/material';
import moment from 'moment';
import { EmployeeI } from 'slices/interfaces/employeeI';

type Props = {};

const EmployementRecord = (props: Props) => {
  const { setEmployeeDetails, employeeDetails } = useContext(ProfileCtx);
  const [records, setRecords] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <CollapseWrapper panelTitle='Employment Record' icon={BadgeTwoTone}>
      <RecordDialog open={open} setOpen={setOpen} setRecords={setRecords} />
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(data: any) => data?.companyName}
          autoHeight
          disableSelectionOnClick
          rows={records}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowHeight={() => 'auto'}
        />
      </div>
      <div className='flex justify-end'>
        <button
          className='px-2 py-1 border border-sky-500 text-sky-500 rounded-md hover:bg-sky-200 transition ease-in-out mt-2'
          onClick={() => setOpen(true)}
        >
          <Add fontSize='small' /> Add Employment Record
        </button>
      </div>
    </CollapseWrapper>
  );
};

const RecordDialog = ({ open, setOpen, setRecords }) => {
  const [data, setData] = useState<any>({});

  console.log({ data });

  const handleSave = () => {
    setRecords((prev: any) => [...prev, data]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className='p-6 flex flex-col gap-4 w-[350px]'>
        <p className='text-md font-bold '>
          <BadgeTwoTone fontSize='small' /> New Employment Record
        </p>

        <div>
          <span>Years of Inclusion</span>
          <span className='flex flex-row p-1 text-xs w-full gap-4'>
            <span className='flex-1'>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label='From'
                  value={data?.yrFrom || null}
                  onChange={(value: any) =>
                    setData((prev: any) => ({
                      ...prev,
                      yrFrom: moment(value).format('LL'),
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      size='small'
                      {...params}
                      fullWidth
                      required
                      variant='standard'
                    />
                  )}
                />
              </LocalizationProvider>
            </span>
            <span className='flex-1'>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label='To'
                  value={data?.yrTo || null}
                  onChange={(value: any) =>
                    setData((prev: any) => ({
                      ...prev,
                      yrTo: moment(value).format('LL'),
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      size='small'
                      {...params}
                      fullWidth
                      required
                      variant='standard'
                    />
                  )}
                />
              </LocalizationProvider>
            </span>
          </span>
        </div>

        <TextField
          variant='standard'
          label='Company Name'
          value={data.companyName}
          onChange={(e: any) =>
            setData((prev: any) => ({ ...prev, companyName: e.target.value }))
          }
        />
        <TextField
          variant='standard'
          label='Company Address'
          multiline
          value={data.companyAddress}
          onChange={(e: any) =>
            setData((prev: any) => ({
              ...prev,
              companyAddress: e.target.value,
            }))
          }
        />
        <TextField
          variant='standard'
          label='Position Held'
          value={data.positionHeld}
          onChange={(e: any) =>
            setData((prev: any) => ({ ...prev, positionHeld: e.target.value }))
          }
        />

        <button
          className='px-2 py-1 w-full bg-green-500 text-white'
          onClick={handleSave}
        >
          Save Employment Record
        </button>
      </div>
    </Dialog>
  );
};

const columns: GridColDef[] = [
  {
    field: 'yearsOfInclusion',
    headerName: 'Years of Inclusions',
    width: 300,
    renderCell: (params: any) => {
      return (
        <div className='text-xs'>
          <span>{moment(params?.row?.yrFrom).format('LL')}</span>
          <span className='mx-2'> - </span>
          <span>{moment(params?.row?.yrTo).format('LL')}</span>
        </div>
      );
    },
  },
  {
    field: 'companyName',
    headerName: 'Company Name',
    width: 150,
    renderCell: (params: any) => {
      return <span className='text-xs'>{params.value}</span>;
    },
  },
  {
    field: 'companyAddress',
    headerName: 'Company Address',
    width: 300,
    renderCell: (params: any) => {
      return <span className='text-xs'>{params.value}</span>;
    },
  },
  {
    field: 'positionHeld',
    headerName: 'Position Held',
    width: 150,
    renderCell: (params: any) => {
      return <span className='text-xs'>{params.value}</span>;
    },
  },
];

export default EmployementRecord;