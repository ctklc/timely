import format from 'date-fns/format';
import { memo, MouseEventHandler } from 'react';
import Button from '@mui/material/Button';
import { TimeSlot } from '../../../api/types';

export type TimeSlotProps = {
  data: TimeSlot;
  selected?: boolean;
  disabled?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
};

function TimeSlotCard({
  data,
  selected,
  disabled,
  handleClick
}: TimeSlotProps) {
  return (
    <Button
      color="inherit"
      fullWidth
      onClick={handleClick}
      disabled={disabled}
      sx={[
        selected ? { backgroundColor: '#d5f8d1' } : { backgroundColor: 'unset' }
      ]}
    >
      {`${format(new Date(data.start_time), 'HH:mm')} - ${format(
        new Date(data.end_time),
        'HH:mm'
      )}`}
    </Button>
  );
}

export default memo(TimeSlotCard);
