import { useState } from 'react';

export const useToggle = (initialState = false): [boolean, () => void] => {
  const [isEnabled, setStateEnabled] = useState<boolean>(initialState);

  const toggle = () => setStateEnabled(!isEnabled);

  return [isEnabled, toggle];
};
