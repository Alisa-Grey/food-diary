import Box from '../Box/Box';

interface Props {
  children: React.ReactNode;
}

export const SingleButtonWrap = ({ children }: Props) => {
  return (
    <Box
      flexdirection="column"
      $alignItems="stretch"
      $justifyContent="center"
      margin="auto 0 0 0"
      width="100%"
    >
      {children}
    </Box>
  );
};
