import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Calendar from 'react-calendar';

import { useGetFilledDays } from '@/api/requestQuery/analyticsInfo';
import { UserFieldsList } from '@/api/types';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import CloseIcon from '@/assets/icons/CloseIcon';
import { RoutesList } from '@/components/AuthCheck/AuthCheck';
import Box from '@/components/Box/Box';
import { Button } from '@/components/Button/Button';
import { Row } from '@/components/Flex/Flex';
import { PopupContainer } from '@/components/Popup/Popup';
import useCalendarContext from '@/hooks/useCalendarContext';
import text from '@/locales/translation.json';
import type { AnalyticsProps } from '@/screens/Analytics/Analytics';
import { checkIsBeforeRegistrationDate } from '@/screens/Analytics/helpers';
import { useAppSelector } from '@/store';
import theme from '@/styles/theme/theme';
import { formatTimeToDatetime, getLocalYearMonth } from '@/utils/helpers';

interface CalendarPopupProps extends AnalyticsProps {
  isOpened: boolean;
  isDiary?: boolean;
  wardId?: number | null;
  onClose: () => void;
}

export function CalendarPopup({ isOpened, isDiary, wardId, onClose }: CalendarPopupProps) {
  const { analyticsScreen } = text;
  const { calendarPopup } = analyticsScreen;

  const router = useRouter();

  const currentDate = formatTimeToDatetime(new Date(), 'YYYY-MM-DD');
  const { setDate: setContextDate } = useCalendarContext();
  const [date, setDate] = useState(currentDate);

  const { data: filledDays } = useGetFilledDays(date, !!wardId);

  const user = useAppSelector(store => store.user);

  const goToMealPage = () => {
    setContextDate(date);
    if (isDiary) {
      onClose();
    } else {
      router.push(`${RoutesList.mealByDay}?date=${date}`);
    }
  };

  const checkFilledDays = (date: Date) => {
    const day = moment(date).format('YYYY-MM-DD');
    if (!filledDays) {
      return null;
    }

    const resultDays = filledDays.data;
    const isFilled = resultDays.isFilledDates.some(el => el.date === day && !el.isKcalExceed);
    const isKcalExceed = resultDays.isFilledDates.some(el => el.date === day && el.isKcalExceed);

    return {
      isFilled: isFilled,
      isKcalExceed: isKcalExceed,
    };
  };

  function setTileClass({
    date,
    view,
  }: {
    date: Date;
    view: 'century' | 'decade' | 'year' | 'month';
  }) {
    const filledDays = checkFilledDays(date);
    if (view === 'month' && filledDays) {
      if (filledDays.isFilled) {
        return 'highlight';
      } else if (filledDays.isKcalExceed) {
        return 'warning';
      }
    }
  }

  const checkIfBeforeRegistrationDate = () => {
    return checkIsBeforeRegistrationDate(date, user[UserFieldsList.registrationDate], 'month');
  };

  const minDate = new Date(user[UserFieldsList.registrationDate]);

  checkIfBeforeRegistrationDate();

  return (
    <PopupContainer isopened={isOpened} onClose={onClose}>
      <Row width="100%" margin={`0 0 ${theme.gapSizes.gap12}`} $justifyContent="flex-end">
        <Button variant="text" onClick={onClose}>
          <CloseIcon />
        </Button>
      </Row>
      <Box width="100%" $justifyContent="center" margin={`0 0 ${theme.gapSizes.gap16}`}>
        <Box flexdirection="column" $alignItems="center" width="100%">
          <Calendar
            maxDate={new Date()}
            minDate={minDate}
            minDetail="month"
            prevLabel={<ArrowLeftIcon />}
            nextLabel={<ArrowRightIcon />}
            navigationLabel={date => <>{getLocalYearMonth(date.date, 'ru-RU')}</>}
            tileClassName={setTileClass}
            value={date}
            onChange={() => setDate}
            onClickDay={value => setDate(formatTimeToDatetime(value, 'YYYY-MM-DD'))}
            onActiveStartDateChange={date =>
              date.activeStartDate &&
              setDate(formatTimeToDatetime(date.activeStartDate, 'YYYY-MM-DD'))
            }
          />
        </Box>
      </Box>
      <Box
        flexdirection="column"
        $justifyContent="center"
        $alignItems="stretch"
        gap={theme.gapSizes.gap16}
        width="100%"
        padding={`${theme.gapSizes.gap4} 0`}
        margin="auto 0 0 0"
      >
        <Button variant="primary" type="button" onClick={goToMealPage}>
          {calendarPopup.button}{' '}
        </Button>
      </Box>
    </PopupContainer>
  );
}
