import React, { useContext, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Card,
  Breadcrumbs,
  Link,
  Typography,
  Chip,
  Button,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  Alert,
  Slide,
} from '@mui/material';
import ViewDetailsModal from './ViewDetailsModal';
import { AppCtx } from './../../../App';
import { AddCircleOutlined } from '@mui/icons-material';
import LeaveForm from '../Forms/LeaveForm';
import { LeaveTypes } from '../../../constants/LeaveTypes';
import OTForm from '../Forms/OTForm';

const LeaveTable = ({ isApprover, isOT }) => {
  const { isHRLogin } = useContext(AppCtx);
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [openSnack, setOpenSnack] = useState(false);
  const [newForm, setNewForm] = useState(false);
  const [viewDetails, setViewDetails] = useState({
    details: {},
    status: false,
  });

  const statusCell = (cell) =>
    isHRLogin || isApprover ? (
      <Chip
        size='small'
        color={
          cell.value === 'Pending'
            ? 'warning'
            : cell.value === 'Approve'
            ? 'success'
            : 'error'
        }
        label={
          <Select
            fullWidth
            onChange={() => {}}
            size='small'
            value={cell.value}
            sx={{
              '& > fieldset': { border: 'none', textAlign: 'left' },
              textAlign: 'left',
              color: '#fff',
              fontSize: 14,
            }}
          >
            <MenuItem value='Pending'>Pending</MenuItem>
            <MenuItem value='Approve'>Approve</MenuItem>
            <MenuItem value='Disapprove'>Disapprove</MenuItem>
          </Select>
        }
      />
    ) : (
      <Chip
        label={cell.value}
        color={
          cell.value === 'Pending'
            ? 'warning'
            : cell.value === 'Approve'
            ? 'success'
            : 'error'
        }
        size='small'
      />
    );

  const leaveColumns = [
    {
      field: 'employee_name',
      headerName: 'Employee name',
      width: 200,
      renderCell: (cell) => {
        return (
          <Button
            title={cell.value}
            variant='text'
            onClick={() => setViewDetails({ details: cell, status: true })}
          >
            {cell.value}
          </Button>
        );
      },
    },
    {
      field: 'leave_type',
      headerName: 'Leave Type',
      width: 160,
      renderCell: (cell) => (
        <span title={cell.value} className='MuiDataGrid-cellContent'>
          {cell.value}
        </span>
      ),
    },
    { field: 'date_requested', headerName: 'Date/Time Requested', width: 160 },
    {
      field: 'reason',
      headerName: 'Reason',
      width: 220,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      renderCell: (cell) => statusCell(cell),
    },
  ];

  const otColumns = [
    {
      field: 'employee_name',
      headerName: 'Employee name',
      width: 200,
      renderCell: (cell) => {
        return (
          <Button
            title={cell.value}
            variant='text'
            onClick={() => setViewDetails({ details: cell, status: true })}
          >
            {cell.value}
          </Button>
        );
      },
    },
    { field: 'date_requested', headerName: 'Date/Time Requested', width: 160 },
    { field: 'date', headerName: 'Date', width: 140 },
    { field: 'time_from', headerName: 'Time From', width: 140 },
    { field: 'time_to', headerName: 'Time To', width: 140 },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      align: 'center',
      renderCell: (cell) => statusCell(cell),
    },
  ];

  const leaveRows = [
    {
      id: 1,
      leave_type: 'Sick Leave (SL)',
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '2/21/2022 10:08:52',
      date_from: '2/17/2022 9:00:00',
      date_to: '2/17/2022 18:00:00',
      reason: 'Sick',
      supervisor: 'Albert Ignacio',
      status: 'Pending',
    },
    {
      id: 2,
      leave_type: 'Vacation Leave (VL)',
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '2/21/2022 10:08:52',
      date_from: '2/17/2022 9:00:00',
      date_to: '2/17/2022 18:00:00',
      reason: 'IMPORTANT PERSONAL MATTERS',
      supervisor: 'Albert Ignacio',
      status: 'Disapprove',
    },
    {
      id: 3,
      leave_type: 'Vacation Leave (VL)',
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '2/21/2022 10:08:52',
      date_from: '2/17/2022 9:00:00',
      date_to: '2/17/2022 18:00:00',
      reason: 'CSE Filing',
      supervisor: 'Albert Ignacio',
      status: 'Approve',
    },
    {
      id: 4,
      leave_type: 'Vacation Leave (VL)',
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '2/21/2022 10:08:52',
      date_from: '2/17/2022 9:00:00',
      date_to: '2/17/2022 18:00:00',
      reason: 'CSE Filing',
      supervisor: 'Albert Ignacio',
      status: 'Approve',
    },
    {
      id: 5,
      leave_type: 'Vacation Leave (VL)',
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '2/21/2022 10:08:52',
      date_from: '2/17/2022 9:00:00',
      date_to: '2/17/2022 18:00:00',
      reason: 'CSE Filing',
      supervisor: 'Albert Ignacio',
      status: 'Approve',
    },
    {
      id: 6,
      leave_type: 'Vacation Leave (VL)',
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '2/21/2022 10:08:52',
      date_from: '2/17/2022 9:00:00',
      date_to: '2/17/2022 18:00:00',
      reason: 'CSE Filing',
      supervisor: 'Albert Ignacio',
      status: 'Approve',
    },
  ];

  const otRows = [
    {
      id: 1,
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '2/21/2022 10:08:52',
      date: '2/17/2022',
      time_from: '18:00:00',
      time_to: '20:00:00',
      reason: 'Other',
      supervisor: 'Albert Ignacio',
      status: 'Pending',
    },
    {
      id: 2,
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '2/21/2022 10:08:52',
      date: '2/17/2022',
      time_from: '18:00:00',
      time_to: '20:00:00',
      reason: 'Other',
      supervisor: 'Albert Ignacio',
      status: 'Approve',
    },
    {
      id: 3,
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '3/15/2022 10:08:52',
      date: '3/15/2022',
      time_from: '18:00:00',
      time_to: '20:00:00',
      reason: 'Other',
      supervisor: 'Albert Ignacio',
      status: 'Disapprove',
    },
    {
      id: 4,
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '3/15/2022 10:08:52',
      date: '3/15/2022',
      time_from: '18:00:00',
      time_to: '20:00:00',
      reason: 'Other',
      supervisor: 'Albert Ignacio',
      status: 'Disapprove',
    },
    {
      id: 5,
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '3/15/2022 10:08:52',
      date: '3/15/2022',
      time_from: '18:00:00',
      time_to: '20:00:00',
      reason: 'Other',
      supervisor: 'Albert Ignacio',
      status: 'Pending',
    },
    {
      id: 6,
      employee_no: 1015,
      employee_name: 'Leogie Dela Vega',
      date_requested: '3/15/2022 10:08:52',
      date: '3/15/2022',
      time_from: '18:00:00',
      time_to: '20:00:00',
      reason: 'Other',
      supervisor: 'Albert Ignacio',
      status: 'Approve',
    },
  ];

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <>
      <ViewDetailsModal
        viewDetails={viewDetails}
        setViewDetails={setViewDetails}
        isApprover={isApprover}
        isOT={isOT}
      />
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {LeaveTypes.filter((lt) => lt.id === selectedLeaveType)[0]?.label}{' '}
          {isOT ? 'OT' : 'Leave'} Application submitted successfully.
        </Alert>
      </Snackbar>
      <Grid item>
        <Breadcrumbs
          aria-label='breadcrumb'
          sx={{ my: 2, justifyContent: 'center', display: 'flex' }}
        >
          <Typography color='inherit'>
            ESS {isApprover ? 'Management' : 'Application'}
          </Typography>
          {newForm ? (
            <Link
              underline='hover'
              color='inherit'
              href='#'
              onClick={() => setNewForm(false)}
            >
              {isOT ? 'OT' : 'Leave'} Applications
            </Link>
          ) : (
            <Typography color='text.primary'>
              {isOT ? 'OT' : 'Leave'} Applications
            </Typography>
          )}
          {newForm && (
            <Typography color='text.primary'>New Application</Typography>
          )}
        </Breadcrumbs>
      </Grid>

      {newForm ? (
        <Grid container justifyContent='center'>
          {isOT ? (
            <OTForm
              setNewForm={setNewForm}
              setSelectedLeaveType={setSelectedLeaveType}
              setOpenSnack={setOpenSnack}
            />
          ) : (
            <LeaveForm
              setNewForm={setNewForm}
              setSelectedLeaveType={setSelectedLeaveType}
              setOpenSnack={setOpenSnack}
            />
          )}
        </Grid>
      ) : (
        <Card sx={{ width: '100%', p: 2 }}>
          {!isApprover && (
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
              <Button
                startIcon={<AddCircleOutlined />}
                onClick={() => setNewForm(true)}
              >
                New {isOT ? 'OT' : 'Leave'} Application
              </Button>
            </div>
          )}
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              disableSelectionOnClick
              rows={isOT ? otRows : leaveRows}
              columns={isOT ? otColumns : leaveColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              loading={leaveRows.length <= 0 || otRows.length <= 0}
              onCellDoubleClick={(params, event, details) =>
                console.log({ params, event, details })
              }
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default LeaveTable;
