import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import {
  format,
  differenceInCalendarDays,
  isPast,
  isYesterday,
  isToday,
} from 'date-fns';

const CustomCalendarHeaderRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  color: '#ffffff', // White text color
});

const HeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 16px',
});

const Divider = styled('hr')({
  width: '100%',
  border: 'none',
  borderTop: '1px solid #e0e0e0',
  margin: '0',
});

const CalendarContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '16px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  backgroundColor: '#424242', // Grey background color
  maxWidth: '400px',  // Adjust width as needed
  margin: '0 auto',   // Center the container horizontally
  color: '#ffffff', // White text color
});


const CustomDateCalendar = styled(DateCalendar)({
    position: 'absolute',
  top: 0,
  left: '100%', // Position the calendar to the right of the pick button
  zIndex: 1, 
  '& .MuiPickersCalendarHeader-root': {
    backgroundColor: '#424242', // Grey background for the header
    color: '#ffffff', // White text color
  },
  '& .MuiPickersDay-root': {
    color: '#ffffff', // White text color for days
  },
  '& .MuiPickersDay-root.Mui-selected': {
    backgroundColor: '#4caf50', // Green background for selected date
    color: '#ffffff', // White text color for selected date
  },
  '& .MuiTypography-root': {
    color: '#ffffff', // White text color for all typography
  },
});

function CustomCalendarHeader(props) {
  const { currentMonth, onMonthChange } = props;

  const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'), 'left');
  const selectPreviousMonth = () =>
    onMonthChange(currentMonth.subtract(1, 'month'), 'right');

  return (
    <CustomCalendarHeaderRoot>
      <HeaderContainer>
        <Stack spacing={1} direction="row">
          <IconButton onClick={selectPreviousMonth} title="Previous month" sx={{ color: '#ffffff' }}>
            <ChevronLeft />
          </IconButton>
        </Stack>
        <Typography variant="h6" style={{ fontFamily: 'Arial, sans-serif' }}>
          {currentMonth.format('MMMM YYYY')}
        </Typography>
        <Stack spacing={1} direction="row">
          <IconButton onClick={selectNextMonth} title="Next month" sx={{ color: '#ffffff' }}>
            <ChevronRight />
          </IconButton>
        </Stack>
      </HeaderContainer>
      <Divider />
    </CustomCalendarHeaderRoot>
  );
}

const CalendarHeaderComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);
  const today = new Date();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
    console.log(formatDate(date));
  };

  const formatDate = (date) => {
    return format(date.toDate(), 'yyyy-MM-dd');
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const renderDateText = () => {
    if (!selectedDate) {
      return 'Select a deadline';
    }

    const date = selectedDate.toDate();

    if (isToday(date)) {
      return `Today, ${format(date, 'MMMM d')}`;
    }

    if (isPast(date)) {
      if (isYesterday(date)) {
        return 'Your deadline passed yesterday';
      }
      const daysPassed = differenceInCalendarDays(today, date);
      return `Deadline passed ${daysPassed} days ago`;
    }

    const difference = differenceInCalendarDays(date, today);

    let dateText;
    if (difference === 1) {
      dateText = `Tomorrow, ${format(date, 'MMMM d')}`;
    } else {
      dateText = `In ${difference} days, ${format(date, 'MMMM d')}`;
    }

    return dateText;
  };

  const shouldDisableDate = (date) => {
    return date.isBefore(dayjs(), 'day');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CalendarContainer ref={calendarRef}>
        <div onClick={toggleCalendar} style={{ cursor: 'pointer' }}>
          <Typography variant="body1" style={{ fontFamily: 'Arial, sans-serif', marginBottom: '8px' }}>
            {renderDateText()}
          </Typography>
        </div>
        {isOpen && (
          <CustomDateCalendar
            slots={{ calendarHeader: CustomCalendarHeader }}
            onChange={handleDateChange}
            shouldDisableDate={shouldDisableDate}
          />
        )}
      </CalendarContainer>
    </LocalizationProvider>
  );
};

export default CalendarHeaderComponent;
