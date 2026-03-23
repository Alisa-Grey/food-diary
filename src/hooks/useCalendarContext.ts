'use client';

import { useContext } from 'react';

import CalendarContext from '@/app/calendar-context';

export default function useCalendarContext() {
  const consumer = useContext(CalendarContext);

  if (!consumer) {
    throw new Error('useCalendarContext must be used within a ContextProvider');
  }

  return consumer;
}
