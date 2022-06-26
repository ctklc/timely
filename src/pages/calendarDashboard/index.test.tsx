import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import CalendarDashboard from './index';

describe('Calendar Dashboard', () => {
  const renderCalendarDashboard = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: Infinity
        }
      }
    });

    setLogger({
      // eslint-disable-next-line no-console
      log: console.log,
      // eslint-disable-next-line no-console
      warn: console.warn,
      error: () => {}
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <CalendarDashboard />
      </QueryClientProvider>
    );
  };

  it('should render highlighted slot and reservation slot when a slot click action triggered', async () => {
    // when the component rendered
    renderCalendarDashboard();

    await waitFor(() =>
      expect(screen.queryByTestId('CircularProgress')).not.toBeInTheDocument()
    );

    const button = screen.getAllByTestId('TimeSlotCardButton')[0];

    fireEvent.click(button);

    // then check button is highlighted or not and reservation done or not
    expect(button).toHaveStyle({ 'background-color': '#d5f8d1' });
    expect(screen.getByText('Reservation')).toBeInTheDocument();
  });
});
