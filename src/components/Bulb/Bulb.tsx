import styled, { css } from 'styled-components';

import theme from '@/styles/theme/theme';

import ClickableBox from '../ClickableBox/ClickableBox';

export enum NutritionNameList {
  milkPortionNum = 'milk_portion',
  fruitPortionNum = 'fruit_portion',
  vegatablePortionNum = 'vegetable_portion',
  starchPortionNum = 'starch_portion',
  proteinPortionNum = 'protein_portion',
  fatPortionNum = 'fat_portion',
  unrecommended = 'unrecommended',
}

export enum MacronutrientsNamesList {
  carbs = 'carbs',
  protein = 'protein',
  fats = 'fats',
}

interface BulbProps {
  key?: string;
  id: NutritionNameList | MacronutrientsNamesList;
  percentage: number;
  $backgroundColor: string;
  onClick?: () => void;
}

const BulbContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 24px;
  height: 48px;
  padding: 1px 2px;
  border: 1px solid ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.radius8};
  cursor: pointer;
`;

const BulbContent = styled.div<BulbProps>`
  width: 100%;
  border-radius: 6px;

  ${props => {
    return css`
      background: ${props.$backgroundColor};
      height: ${props.percentage}%;
    `;
  }}
`;

export const Bulb: React.FC<BulbProps> = ({ key, id, percentage, $backgroundColor, onClick }) => {
  return (
    <ClickableBox onClick={onClick}>
      <BulbContainer key={key}>
        <BulbContent id={id} percentage={percentage} $backgroundColor={$backgroundColor} />
      </BulbContainer>
    </ClickableBox>
  );
};
