/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { EngineeringTwoTone } from '@mui/icons-material';
import { ProfileCtx } from '../profile.main';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import {
  USER_GROUP,
} from 'constants/Values';
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { getEmployeeItems as _getEmployeeItems } from 'slices';
import { useSelector } from 'react-redux';
import { EmployeeI } from 'slices/interfaces/employeeI';

type Props = {};

const columns: GridColDef[] = [
  {
    field: 'dateHired',
    headerName: 'Effective Date',
    width: 120,
    renderCell: (params: any) => {
      return (
        <div className='text-xs p-1'>{moment(params.value).format('LL')}</div>
      );
    },
  },
  {
    field: 'division',
    headerName: 'Division',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'rank',
    headerName: 'Rank',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'position',
    headerName: 'Position',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'reportsTo',
    headerName: 'Reports To',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
  {
    field: 'comment',
    headerName: 'Comment',
    width: 120,
    renderCell: (params: any) => {
      return <div className='text-xs p-1'>{params.value}</div>;
    },
  },
];

type JobInfoI = {
  dateHired: string;
  location: string;
  department: string;
  rank: string;
  position: string;
  reportsTo: string;
  comment: string;
};

const JobInfo = (props: Props) => {
  const [infos, setInfos] = useState<JobInfoI[]>([]);
  const { isNew, employeeDetails, setEmployeeDetails, enums } = useContext(ProfileCtx);
  const values = { employeeDetails, setEmployeeDetails, enums };
  useEffect(() => {
    // setInfos([...infos, employeeDetails]);
  }, [employeeDetails]);

  return (
    <CollapseWrapper
      panelTitle='Personnel Information'
      icon={EngineeringTwoTone}
      contentClassName='p-0'
      open
    >
      {isNew ? (
        <JobInfoFields {...values} />
      ) : (
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={(data: any) => `${data?.reportsTo}~${data?.dateHired}`}
            rows={isNew ? [] : infos}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            getRowHeight={() => 'auto'}
            autoHeight
            className='border-0'
          />
        </div>
      )}
    </CollapseWrapper>
  );
};

const JobInfoFields = ({ employeeDetails, setEmployeeDetails, enums }) => {
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const [departments, setDepartments] = useState<any[]>([])
  const [employmentStatus, setEmploymentStatus] = useState<any[]>([])
  const [locations, setLocations] = useState<any[]>([])
  const [positions, setPositions] = useState<any[]>([])
  const [ranks, setRanks] = useState<any[]>([])

  useEffect(() => {
    setDepartments(enums.departments);
    setEmploymentStatus(enums.employment_status);
    setLocations(enums.locations);
    setPositions(enums.positions);
    setRanks(enums.ranks);
  }, [enums])

  return (
    <GridWrapper colSize='2' className='items-center p-2'>
      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <TextField
          variant='standard'
          label={
            <span>
              Employee Number:{' '}
              <span className='text-xs italic'>
                This is an auto-generated field.
              </span>
            </span>
          }
          disabled
          fullWidth
        />
      </div>
      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='position'>Position</InputLabel>
          <Select
            labelId='position'
            defaultValue={employeeDetails?.position}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                position: e.target.value,
              })
            }
          >
            {positions.map((position) => {
              return <MenuItem value={position}>{position}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='rank'>Department</InputLabel>
          <Select
            labelId='department'
            defaultValue={employeeDetails?.department}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                department: e.target.value,
              })
            }
          >
            {departments.map((department) => {
              return <MenuItem value={department}>{department}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='location'>Locations</InputLabel>
          <Select
            multiple
            labelId='location'
            defaultValue={employeeDetails?.locations}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                locations: e.target.value,
              })
            }
          >
            {locations.map((location) => {
              return <MenuItem value={location}>{location}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      <GridWrapper colSize='3' className='col-span-2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <FormControl variant='standard' fullWidth size='small' required>
            <InputLabel id='teamLeader'>Team Leader</InputLabel>
            <Select
              labelId='teamLeader'
              defaultValue={employeeDetails?.reportsTo}
              onChange={(e: any) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  reportsTo: e.target.value,
                })
              }
            >
              {getEmployeeItems?.filter((x: any) => x.department === employeeDetails.department).map((employee) => {
                return (
                  <MenuItem key={employee.employeeNo} value={employee.employeeNo}>
                    {employee.firstName} {employee.lastName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <FormControl variant='standard' fullWidth size='small' required>
            <InputLabel id='rank'>Employment Rank</InputLabel>
            <Select
              labelId='rank'
              defaultValue={employeeDetails?.rank}
              onChange={(e: any) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  rank: e.target.value,
                })
              }
            >
              {ranks.map((rank) => {
                return <MenuItem value={rank}>{rank}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <FormControl variant='standard' fullWidth size='small' required>
            <InputLabel id='employement_status'>Employment Status</InputLabel>
            <Select
              labelId='employement_status'
              defaultValue={employeeDetails?.employmentStatus}
              onChange={(e: any) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  employmentStatus: e.target.value,
                })
              }
            >
              {employmentStatus.map((status) => {
                return <MenuItem value={status}>{status}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
      </GridWrapper>

      <GridWrapper colSize='3' className='col-span-2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Date Hired'
              value={employeeDetails?.dateHired || null}
              onChange={(value: any) =>
                setEmployeeDetails((prev: any) => ({
                  ...prev,
                  dateHired: moment(value).format('LL'),
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
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='End of Probation Period'
              value={employeeDetails?.endOfProbationary || null}
              onChange={(value: any) =>
                setEmployeeDetails((prev: any) => ({
                  ...prev,
                  endOfProbationary: moment(value).format('LL'),
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
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='End of Contract Date (If applicable)'
              value={employeeDetails?.contractEndDate || null}
              onChange={(value: any) =>
                setEmployeeDetails((prev: any) => ({
                  ...prev,
                  contractEndDate: moment(value).format('LL'),
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
        </div>
      </GridWrapper>

      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='rank'>Employment Rank</InputLabel>
          <Select
            labelId='rank'
            defaultValue={employeeDetails?.rank}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                rank: e.target.value,
              })
            }
          >
            {ranks.map((rank) => {
              return <MenuItem value={rank}>{rank}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='employement_status'>Employment Status</InputLabel>
          <Select
            labelId='employement_status'
            value={employeeDetails?.employmentStatus || 'PROBATIONARY'}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                employmentStatus: e.target.value,
              })
            }
          >
            {employmentStatus.map((status) => {
              return <MenuItem value={status}>{status}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <TextField
          required
          variant='standard'
          label='Company Contact Number'
          fullWidth
          onChange={(e: any) =>
            setEmployeeDetails((prev: EmployeeI) => ({
              ...prev,
              companyContactNumber: e.target.value,
            }))
          }
        />
      </div>

      {employeeDetails.rank === 'RANK AND FILE' ? (
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            required
            variant='standard'
            label='Company Email Address'
            fullWidth
            disabled
            value={`${employeeDetails.firstName}${employeeDetails.lastName}.vpdcph@gmail.com`.toLowerCase()}
            helperText={
              <span>
                This is an auto-generated email for a{' '}
                <strong>Rank and File</strong> employment rank.
              </span>
            }
          // onChange={(e: any) =>
          //   setEmployeeDetails((prev: EmployeeI) => ({
          //     ...prev,
          //     companyEmail: e.target.value,
          //   }))
          // }
          />
        </div>
      ) : (
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            required
            variant='standard'
            label='Company Email Address'
            fullWidth
            value={employeeDetails.companyEmail || null}
            onChange={(e: any) =>
              setEmployeeDetails((prev: EmployeeI) => ({
                ...prev,
                companyEmail: e.target.value,
              }))
            }
          />
        </div>
      )}

      {/* <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='user_group'>User Group</InputLabel>
          <Select
            labelId='user_group'
            defaultValue={employeeDetails?.userGroup}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                userGroup: e.target.value,
              })
            }
          >
            {USER_GROUP.map((group) => {
              return <MenuItem value={group}>{group}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div> */}
    </GridWrapper>
  );
};

export default JobInfo;
