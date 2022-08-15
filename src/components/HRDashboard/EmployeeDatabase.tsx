import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Button } from '@mui/material';
import { Employees } from './EmployeeData';
import ViewDetailsModal from '../EmployeeDashboard/Tables/ViewDetailsModal';
import NewEmployee from './NewEmployee';
import { AddCircleOutlineTwoTone, UploadTwoTone } from '@mui/icons-material';
import NewEmployeeProfile from './new.employee.profile';
import { getEmployeesEndpoint } from 'apis/employees';
import { EmployeeI } from 'slices/interfaces/employeeI';

type Props = {};

const EmployeeDatabase: React.FC<Props> = () => {
  const [viewDetails, setViewDetails] = useState({
    details: {},
    status: false,
  });
  const [employees, setEmployees] = useState<EmployeeI[]>([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const res = await getEmployeesEndpoint();
      setEmployees(
        res.data.map((r: any) => {
          return { ...r, id: r.employeeNo };
        })
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const [open, setOpen] = useState(false);

  const columns = [
    {
      field: 'employee_name',
      headerName: 'Employee name',
      width: 200,
      renderCell: (cell) => {
        return (
          <Button
            title={cell.row.firstName}
            variant='text'
            onClick={() => setViewDetails({ details: cell, status: true })}
            size='small'
          >
            {cell.row.lastName}, {cell.row.firstName} {cell.row.middleName}
          </Button>
        );
      },
    },
    {
      field: 'employeeNo',
      headerName: 'Employee No.',
      width: 100,
      renderCell: (cell) => (
        <span title={cell.value} className='MuiDataGrid-cellContent'>
          {cell.value}
        </span>
      ),
    },
    { field: 'position', headerName: 'Position', width: 200 },
    {
      field: 'rank',
      headerName: 'Rank',
      width: 140,
    },
    {
      field: 'division',
      headerName: 'Division',
      width: 140,
      //   renderCell: (cell) => cell,
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 250,
      //   renderCell: (cell) => cell,
    },
    {
      field: 'desgination',
      headerName: 'Designation',
      width: 140,
      //   renderCell: (cell) => cell,
    },
    {
      field: 'employment_status',
      headerName: 'Employment Status',
      width: 140,
      //   renderCell: (cell) => cell,
    },
  ];

  return (
    <>
      <ViewDetailsModal
        viewDetails={viewDetails}
        setViewDetails={setViewDetails}
        isApprover={true}
        isOT={false}
        isEmployeeDetails
      />

      {/* <NewEmployee open={open} setOpen={setOpen} /> */}
      <NewEmployeeProfile open={open} setOpen={setOpen} />

      <Card sx={{ mt: 5, p: 2 }}>
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <Button startIcon={<UploadTwoTone />} sx={{ mr: 1 }}>
            Upload Employee Details
          </Button>
          <Button
            startIcon={<AddCircleOutlineTwoTone />}
            onClick={() => setOpen(true)}
          >
            Add New Employee
          </Button>
        </div>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            disableSelectionOnClick
            rows={employees || []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            loading={employees.length <= 0}
          />
        </div>
      </Card>
    </>
  );
};

export default EmployeeDatabase;
