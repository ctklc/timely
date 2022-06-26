import { timeSlots } from './config';
import { Company } from './types';

const responseHandler = (response: Response) => {
  if (response.ok) {
    return response.json();
  }

  throw new Error(response.statusText);
};

export const getTimeSlots = (): Promise<Company[]> =>
  fetch(timeSlots()).then(responseHandler);

export default { getTimeSlots };
