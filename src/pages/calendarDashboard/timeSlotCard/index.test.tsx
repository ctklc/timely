import { render, screen } from '@testing-library/react';
import format from 'date-fns/format';
import TimeSlotCard, { TimeSlotProps } from './index';
import { TimeSlot } from '../../../api/types';

describe('Time Slot Card', () => {
  const handleSlotClick = jest.fn();
  const mockTimeSlot = {
    start_time: '2018-07-09T08:00:00.000+02:00',
    end_time: '2018-07-09T09:30:00.000+02:00'
  };
  const renderTimeSlotCard = (
    {
      data = mockTimeSlot,
      selected,
      disabled,
      handleClick = handleSlotClick
    }: Partial<TimeSlotProps> = {
      data: mockTimeSlot,
      handleClick: handleSlotClick
    }
  ) => {
    return render(
      <TimeSlotCard
        data={data as TimeSlot}
        selected={selected}
        disabled={disabled}
        handleClick={handleClick}
      />
    );
  };

  it('should render time slot card button', () => {
    // when the component rendered
    renderTimeSlotCard();

    const times = `${format(
      new Date(mockTimeSlot.start_time),
      'HH:mm'
    )} - ${format(new Date(mockTimeSlot.end_time), 'HH:mm')}`;

    expect(screen.getByTestId('TimeSlotCardButton')).toBeInTheDocument();
    expect(screen.getByTestId('TimeSlotCardButton')).toHaveTextContent(times);
  });

  it('should render time slot card button highlighted', () => {
    // when the component rendered
    renderTimeSlotCard({ selected: true });

    // then check button is highlighted or not
    expect(screen.getByTestId('TimeSlotCardButton')).toHaveStyle({
      'background-color': '#d5f8d1'
    });
  });

  it('should render time slot card button disabled', () => {
    // when the component rendered
    renderTimeSlotCard({ disabled: true });

    expect(screen.getByTestId('TimeSlotCardButton')).toBeDisabled();
  });
});
