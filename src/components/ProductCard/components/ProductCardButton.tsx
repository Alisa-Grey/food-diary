import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import text from '@/locales/translation.json';

interface Props {
  id: number;
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ProductCardButton = ({ id, icon, onClick }: Props) => {
  const { addMealsScreen } = text;

  return (
    <Box>
      <Button
        id={id}
        variant="primary-soft"
        ariaLabel={addMealsScreen.searchFieldPlaceholder}
        className="add-button"
        onClick={onClick}
      >
        {icon}
      </Button>
    </Box>
  );
};
