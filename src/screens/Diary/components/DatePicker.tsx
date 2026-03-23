import moment from 'moment';

import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import CalendarIcon from '@/assets/icons/CalendarIcon';
import { Button } from '@/components/Button/Button';
import ClickableBox from '@/components/ClickableBox/ClickableBox';
import { Row } from '@/components/Flex/Flex';
import { Typography } from '@/components/Typography/Typography';
import useCalendarContext from '@/hooks/useCalendarContext';
import { checkIsBeforeRegistrationDate, checkIsCurrent } from '@/screens/Analytics/helpers';
import theme from '@/styles/theme/theme';
import { capitalizeString, formatDateWithWeekday, formatTimeToDatetime } from '@/utils/helpers';

interface Props {
  startDate: string;
  variant?: 'daily' | 'monthly';
  onClick: () => void;
}

export const DatePicker = ({ variant, startDate, onClick }: Props) => {
  const { date, setDate } = useCalendarContext();

  const month = moment(date).format('MMMM');
  const timeUnit = variant === 'daily' ? 'day' : 'month';
  const dateString = variant === 'daily' ? formatDateWithWeekday(date) : capitalizeString(month);
  const isToday = checkIsCurrent(new Date(date), timeUnit);
  const isBeforeRegistration = checkIsBeforeRegistrationDate(date, startDate, timeUnit);

  const goBack = () => {
    const newDate = moment(date).subtract(1, timeUnit).toDate();
    setDate(formatTimeToDatetime(newDate, 'YYYY-MM-DD'));
  };

  const goForward = () => {
    const newDate = moment(date).add(1, timeUnit).toDate();
    setDate(formatTimeToDatetime(newDate, 'YYYY-MM-DD'));
  };

  return (
    <Row $justifyContent="center" $alignItems="center" width="100%">
      <Row $justifyContent="center" $alignItems="center" gap={theme.gapSizes.gap12}>
        {!isBeforeRegistration && (
          <Button variant="text" onClick={goBack}>
            <ArrowLeftIcon />
          </Button>
        )}
        <ClickableBox $justifyContent="center" width="100%" onClick={onClick}>
          <Row $alignItems="center" gap={theme.gapSizes.gap6}>
            <CalendarIcon />
            <Typography
              fontWeight={500}
              fontSize={theme.fontSizes.fontSize14}
              color={theme.colors.black}
            >
              {dateString}
            </Typography>
          </Row>
        </ClickableBox>
        {!isToday && (
          <Button variant="text" onClick={goForward}>
            <ArrowRightIcon />
          </Button>
        )}
      </Row>
    </Row>
  );
};
