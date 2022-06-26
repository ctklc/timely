import { Divider, Typography } from '@mui/material';
import { Fragment, memo, MouseEventHandler, useMemo } from 'react';
import isWithinInterval from 'date-fns/isWithinInterval';
import addMilliseconds from 'date-fns/addMilliseconds';
import isEqual from 'date-fns/isEqual';
import StyledBox from '../../../shared/styled/box';
import TimeSlotCard from '../timeSlotCard';
import { TimeSlot } from '../../../api/types';

export function groupByDays(dates: TimeSlot[]) {
  const result: Record<string, TimeSlot[]> = {};

  dates.forEach((date) => {
    const day = new Date(date.start_time).toLocaleDateString();

    if (result[day]) {
      result[day] = [...result[day], date];
    } else {
      result[day] = [date];
    }
  });

  return result;
}

export function getDayName(day: string) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long'
  }).format(new Date(day));
}

export function areDatesOverlapped(
  reservedSlot: TimeSlot,
  slot: TimeSlot
): boolean {
  const interval = {
    start: addMilliseconds(new Date(reservedSlot.start_time), 1),
    end: addMilliseconds(new Date(reservedSlot.end_time), -1)
  };

  return (
    isWithinInterval(new Date(slot.start_time), interval) ||
    isWithinInterval(new Date(slot.end_time), interval) ||
    (isEqual(new Date(slot.start_time), new Date(reservedSlot.start_time)) &&
      isEqual(new Date(slot.end_time), new Date(reservedSlot.end_time)))
  );
}

export type ReservedSlots = Record<number, TimeSlot | undefined>;

export type DailySlotsProps = {
  companyId: number;
  reservedTimeSlots: ReservedSlots;
  timeSlots: TimeSlot[];
  handleSlotClick: (
    id: number,
    slot: TimeSlot
  ) => MouseEventHandler<HTMLButtonElement>;
};

function DailySlots({
  companyId,
  reservedTimeSlots,
  timeSlots,
  handleSlotClick
}: DailySlotsProps) {
  const reservedTimeSlot = reservedTimeSlots[companyId];
  const groupedTimeSlots = useMemo(
    () => Object.entries(groupByDays(timeSlots)),
    [timeSlots]
  );

  const renderTimeSlot = (slot: TimeSlot) => {
    const selected =
      !!reservedTimeSlot &&
      reservedTimeSlot.start_time === slot.start_time &&
      reservedTimeSlot.end_time === slot.end_time;
    const hasOverlappedReservedSlots = Object.entries(reservedTimeSlots).some(
      ([id, otherCompaniesReservedSlot]) => {
        return (
          Number(id) !== companyId &&
          !!otherCompaniesReservedSlot &&
          areDatesOverlapped(otherCompaniesReservedSlot, slot)
        );
      }
    );
    const disabled =
      (!!reservedTimeSlot && !selected) || hasOverlappedReservedSlots;

    return (
      <Fragment key={slot.start_time}>
        <Divider />
        <TimeSlotCard
          data={slot}
          handleClick={handleSlotClick(companyId, slot)}
          selected={selected}
          disabled={disabled}
        />
      </Fragment>
    );
  };

  return (
    <>
      {groupedTimeSlots.map(([day, slots]) => (
        <StyledBox key={day} sx={{ flexDirection: 'column', gap: 3 }}>
          <Typography variant="h6" align="center">
            {getDayName(day)}
          </Typography>
          <StyledBox sx={{ flexDirection: 'column', gap: 1 }}>
            {slots?.map(renderTimeSlot)}
          </StyledBox>
        </StyledBox>
      ))}
    </>
  );
}

export default memo(DailySlots);
