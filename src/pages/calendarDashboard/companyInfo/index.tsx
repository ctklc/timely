import { Typography } from '@mui/material';
import Paper from '../../../shared/styled/paper';
import TimeSlotCard from '../timeSlotCard';
import { TimeSlot } from '../../../api/types';
import Box from '../../../shared/styled/box';

export type CompanyInfoProps = {
  name: string;
  reservedSlot?: TimeSlot;
};

export default function CompanyInfo({ name, reservedSlot }: CompanyInfoProps) {
  return (
    <Box sx={{ flexDirection: 'column', gap: 1 }}>
      <Paper>
        <Typography variant="h5" align="center">
          {name}
        </Typography>
      </Paper>
      <Paper>
        {reservedSlot ? (
          <>
            <Typography variant="body1" align="center">
              Reservation
            </Typography>
            <TimeSlotCard data={reservedSlot} selected />
          </>
        ) : (
          'Not reserved yet.'
        )}
      </Paper>
    </Box>
  );
}
