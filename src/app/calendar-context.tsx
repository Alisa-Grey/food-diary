'use client';

import { createContext } from 'react';

type Context = {
  date: string;
  setDate: (value: string) => void;
};

const CalendarContext = createContext<Context | undefined>(undefined);

export default CalendarContext;
