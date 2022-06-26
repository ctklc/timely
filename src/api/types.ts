export type TimeSlot = {
  start_time: string;
  end_time: string;
};

export type Company = {
  id: number;
  name: string;
  type: string;
  time_slots: TimeSlot[];
};
