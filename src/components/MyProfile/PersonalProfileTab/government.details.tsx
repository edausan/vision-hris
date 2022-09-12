/* eslint-disable react-hooks/exhaustive-deps */
import { AssuredWorkloadTwoTone } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useContext, useEffect, useMemo } from 'react';
import CollapseWrapper from './collapse.wrapper';
import GridWrapper from 'CustomComponents/GridWrapper';
import { ProfileCtx } from '../profile.main';

type Props = {};

const GovernmentDetails = (props: Props) => {
  const {
    employeeDetails,
    setEmployeeDetails,
    isOwner,
    isNew,
    setUpdatedDetails,
  } = useContext(ProfileCtx);
  console.log({ employeeDetails });
  const handleTaxExemption = () => {
    console.log({ dep: employeeDetails.numberOfDependents });
    if (employeeDetails.civilStatus.toLocaleLowerCase() == 'married') {
      const marriedTax =
        employeeDetails.numberOfDependents !== undefined && employeeDetails.numberOfDependents > 0
          ? `MARRIED-${employeeDetails.numberOfDependents}`
          : 'MARRIED';
      setEmployeeDetails((prev: any) => ({
        ...prev,
        taxExemption: marriedTax,
      }));
    } else {
      const singleTax =
        employeeDetails.numberOfDependents !== undefined && employeeDetails.numberOfDependents > 0
          ? `SINGLE-${employeeDetails.numberOfDependents}`
          : 'SINGLE';
      setEmployeeDetails((prev: any) => ({
        ...prev,
        taxExemption: singleTax,
      }));
    }
  };

  useEffect(() => {
    if (employeeDetails.numberOfDependents && employeeDetails.civilStatus) {
      handleTaxExemption();
    } else {
      setEmployeeDetails((prev: any) => ({
        ...prev,
        taxExemption: '',
      }));
    }
  }, [employeeDetails.numberOfDependents, employeeDetails.civilStatus]);

  return (
    <CollapseWrapper
      panelTitle='Government Details'
      icon={AssuredWorkloadTwoTone}
      open
    >
      <GridWrapper colSize='2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-sss'
            required={isOwner}
            variant='standard'
            size='small'
            fullWidth
            label='SSS'
            value={employeeDetails?.sss}
            onChange={(e: any) => {
              setEmployeeDetails({
                ...employeeDetails,
                sss: e.target.value,
              });

              !isNew &&
                setUpdatedDetails((prev: any) => ({
                  ...prev,
                  sss: e.target.value,
                }));
            }}
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-philhealth'
            required={isOwner}
            variant='standard'
            size='small'
            fullWidth
            label='PhilHealth'
            value={employeeDetails?.philHealth}
            onChange={(e: any) => {
              setEmployeeDetails({
                ...employeeDetails,
                philHealth: e.target.value,
              });

              !isNew &&
                setUpdatedDetails((prev: any) => ({
                  ...prev,
                  philHealth: e.target.value,
                }));
            }}
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-pagibig'
            required={isOwner}
            variant='standard'
            size='small'
            fullWidth
            label='Pag-IBIG/HMDF'
            value={employeeDetails?.pagIbig}
            onChange={(e: any) => {
              setEmployeeDetails({
                ...employeeDetails,
                pagIbig: e.target.value,
              });

              !isNew &&
                setUpdatedDetails((prev: any) => ({
                  ...prev,
                  pagIbig: e.target.value,
                }));
            }}
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-tin'
            required={isOwner}
            variant='standard'
            size='small'
            fullWidth
            label='TIN'
            value={employeeDetails?.tin}
            onChange={(e: any) => {
              setEmployeeDetails({
                ...employeeDetails,
                tin: e.target.value,
              });

              !isNew &&
                setUpdatedDetails((prev: any) => ({
                  ...prev,
                  tin: e.target.value,
                }));
            }}
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-no-of-deps'
            required={isOwner}
            variant='standard'
            size='small'
            fullWidth
            type='number'
            label='Number of Dependents'
            value={employeeDetails?.numberOfDependents}
            onChange={(e: any) => {
              setEmployeeDetails({
                ...employeeDetails,
                numberOfDependents: e.target.value,
              });

              !isNew &&
                setUpdatedDetails((prev: any) => ({
                  ...prev,
                  numberOfDependents: e.target.value,
                }));
            }}
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-tax-exemp'
            required={isOwner}
            variant='standard'
            size='small'
            fullWidth
            disabled
            label='Tax Exemption'
            value={employeeDetails?.taxExemption}
            onChange={(e: any) => {
              setEmployeeDetails({
                ...employeeDetails,
                taxExemption: e.target.value,
              });

              !isNew &&
                setUpdatedDetails((prev: any) => ({
                  ...prev,
                  taxExemption: e.target.value,
                }));
            }}
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default React.memo(GovernmentDetails);
