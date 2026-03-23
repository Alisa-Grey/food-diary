export const transformToBoolean = (value: 't' | 'f' | null) => {
  return value === 't' ? true : false;
};

export const transformStringToArray = (value: string) => {
  return value.slice(1, -1).split(',');
};
