import { useQuery } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { getTimeSlots } from '../../api';
import { Company, TimeSlot } from '../../api/types';
import Box from '../../shared/styled/box';
import WeekContainer, { ReservedSlots } from './weekContainer';
import CompanyInfo from './companyInfo';

export default function CalendarDashboard() {
  const { isLoading, data } = useQuery<Company[]>('getTimeSlots', getTimeSlots);
  const [reservedTimeSlots, setReservedTimeSlots] = useState<ReservedSlots>({});

  const handleSlotClick = (id: Company['id'], slot: TimeSlot) => () => {
    setReservedTimeSlots((prevState) => ({
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
              <CompanyInfo name={name} reservedSlot={reservedTimeSlots[id]} />
              <WeekContainer
                companyId={id}
                reservedTimeSlots={reservedTimeSlots}
                timeSlots={timeSlots}
                handleSlotClick={handleSlotClick}
              />
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
}
