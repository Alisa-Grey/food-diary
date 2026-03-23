import { type Control, Controller, type FieldValues } from 'react-hook-form';

import { Radiobutton, type RadiobuttonProps } from '../Radiobutton/Radiobutton';

interface RadiobuttonControlledProps extends RadiobuttonProps {
  control: Control<FieldValues, Record<string, string | number | boolean>>;
  children: React.ReactNode;
  background?: string;
  action?: () => void;
}

export const RadiobuttonControlled = ({
  key,
  id,
  name,
  value,
  register,
  variant,
  control,
  children,
  action,
  background,
}: RadiobuttonControlledProps) => {
  return (
    <Controller
      key={key}
      name={name as string}
      control={control}
      render={({ field: { onChange } }) => (
        <Radiobutton
          id={id}
          variant={variant}
          name={name}
          width="100%"
          $justifyContent="center"
          background={background}
          value={value}
          register={register}
          onChange={e => {
            onChange(e.target.value);
            action && action();
          }}
        >
          {children}
        </Radiobutton>
      )}
    />
  );
};
