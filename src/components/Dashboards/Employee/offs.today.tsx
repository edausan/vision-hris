import {
  BusinessCenterTwoTone,
  HouseboatTwoTone,
  SickTwoTone,
  TimeToLeaveOutlined,
  TimeToLeaveTwoTone,
} from '@mui/icons-material';
import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import CardWTitle from './../../../CustomComponents/CardWTitle';
import { ProfilePhoto } from './profile.preview';

type Props = {
  className?: string;
};

const initialVlaue = [
  {
    id: 12346,
    name: 'ACOBA, KERBY  AGUSTIN',
    dept: 'Procurement and Material Management',
    type: 'Sick Leave (SL)',
    icon: <SickTwoTone color='warning' />,
  },
  {
    id: 12347,
    name: 'ABRIL. JESEL GLEM CATAAG',
    dept: 'Procurement and Material Management',
    type: 'Vacation Leave (VL)',
    icon: <BusinessCenterTwoTone color='primary' />,
  },
  {
    id: 12348,
    name: 'ADVINCULA , MARK VINCENT BUENVIAJE',
    dept: 'Operations - Project Management',
    type: 'Official Business (OB)',
    icon: <SickTwoTone color='warning' />,
  },
  {
    id: 12349,
    name: 'AGARRADO, JOEY ALBERT RAPISTA',
    dept: 'Operations - Project Management',
    type: 'Paternity Leave',
    icon: <HouseboatTwoTone color='primary' />,
  },
];

const OffsToday = ({ className }: Props) => {
  const [offs, setOffs] = useState<any[]>(initialVlaue);

  useEffect(() => {
    setOffs(initialVlaue);
  }, [initialVlaue]);

  return (
    <CardWTitle title='Who is off today' className={className}>
      <List>
        {offs.map((off) => {
          return (
            <ListItem key={off.id} className='justtify-left'>
              <ListItemIcon className='flex items-center gap-4'>
                {off.icon} <Avatar src={ProfilePhoto} className='mr-2' />
              </ListItemIcon>
              <ListItemText
                className='text-sm'
                primary={
                  <>
                    <div>
                      {/* <Chip
                        variant='outlined'
                        color='secondary'
                        size='small'
                        label={off.type}
                        icon={<TimeToLeaveTwoTone fontSize='small' />}
                        className='w-[inherit] ml-0 text-xs mb-1'
                      /> */}
                    </div>
                    <div className='text-xs'>{off.name}</div>
                  </>
                }
                secondary={
                  <div className='text-xs flex flex-col'>{off.dept}</div>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </CardWTitle>
  );
};

export default OffsToday;