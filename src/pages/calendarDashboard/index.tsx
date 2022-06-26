import { useQuery } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { getTimeSlots } from '../../api';
import { Company, TimeSlot } from '../../api/types';
import TimeSlotCard from './timeSlotCard';
import Paper from '../../shared/styled/paper';
import Box from '../../shared/styled/box';
import DailySlots, { ReservedSlots } from './dailySlots';

export default function CalendarDashboard() {
  const { isLoading, data } = useQuery<Company[]>('getTimeSlots', getTimeSlots);
  const [reservedSlots, setReservedSlots] = useState<ReservedSlots>({});

  const handleSlotClick = (id: Company['id'], slot: TimeSlot) => () => {
    setReservedSlots((prevState) => ({
      ...prevState,
      [id]: prevState[id] ? undefined : slot
    }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3, flexGrow: 1, height: '100vh' }}>
      <Box sx={{ justifyContent: 'center', height: '100%', gap: 2 }}>
        {isLoading ? (
          <CircularProgress data-testid="CircularProgress" />
        ) : (
          data?.map(({ id, name, time_slots: timeSlots }) => (
            <Box
              key={id}
              sx={{
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                gap: 2
              }}
            >
              <Box sx={{ flexDirection: 'column', gap: 1 }}>
                <Paper>
                  <Typography variant="h5" align="center">
                    {name}
                  </Typography>
                </Paper>
                <Paper>
                  {reservedSlots[id] ? (
                    <>
                      <Typography variant="body1" align="center">
                        Reservation
                      </Typography>
                      <TimeSlotCard
                        data={reservedSlots[id] as TimeSlot}
                        selected
                      />
                    </>
                  ) : (
                    'Not reserved yet.'
                  )}
                </Paper>
              </Box>
              <Paper
                sx={{
                  height: '100%',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                <DailySlots
                  companyId={id}
                  reservedTimeSlots={reservedSlots}
                  timeSlots={timeSlots}
                  handleSlotClick={handleSlotClick}
                />
              </Paper>
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
}
