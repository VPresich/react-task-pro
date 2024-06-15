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
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/auth/selectors';

const CustomCalendarHeaderRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  color: theme === 'dark' ? '#ffffff' : '#161616', // White text color
  width: '100%'
}));

const HeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 16px',
});

const Divider = styled('hr')(({ theme }) => ({
  width: '100%',
  border: 'none',
  borderTop: theme === 'dark' ? '2px solid rgba(255, 255, 255, 0.2)' : '2px solid rgba(22, 22, 22, 0.2)',
  margin: '0',
}));

const CalendarContainer = styled('div')({
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'left',
  flexDirection: 'column',
  padding: '0px',
  fontSize: '14px',
  letterSpacing: '-0.02em',
  maxWidth: '300px',
  margin: '0 auto',
  color: '#bedbb0',
  position: 'relative',
});

const CustomDateCalendar = styled(DateCalendar)(({ theme }) => ({
  position: 'absolute',
  bottom: 'calc(100% + 8px)', // Position below the triggering element with some spacing
  left: 0,
  zIndex: 1,
  fontFamily: 'Poppins-Medium',
  backgroundColor: theme==='dark' ? '#1f1f1f': '#ffffff', // Grey background for the calendar
  border: theme ==='violet' ? '1px solid #5255BC' : '1px solid #9dc888',
  borderRadius: '8px',
  padding: '8px',
  fontSize: '16px',

  '&.MuiDateCalendar-root': {
    width: '275px',
    height: '300px',
    overflow:'auto'
  },
  '& .css-1t0788u-MuiPickersSlideTransition-root-MuiDayCalendar-slideTransition': {
    minHeight: '200px'
  },
  '& .css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root.Mui-disabled:not(.Mui-selected)': {
     width: '30px',
    height: '30px',
    color: theme==='dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(22, 22, 22, 0.2)'
  },
  '& .css-hljmer': {
    padding: '8px 4px'
  },
  '& .css-23p0if-MuiButtonBase-root-MuiPickersDay-root': {
    width: '30px',
    height: '30px',
    fontSize: '16px',
    margin: '0'
  },
  '& .css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root': {
    width: '30px',
    height: '30px',
    fontSize: '14px'
  },
  '& .MuiPickersCalendarHeader-root': {
    // backgroundColor: '', // Grey background for the header
    color: theme==='dark' ? '#ffffff' : '#161616', // White text color
  },
  '& .MuiTypography-root': {
    color: theme==='dark' ? '#ffffff' : '#161616',
    fontFamily: 'Poppins-Medium'
  },
  '& .MuiPickersDay-root': {
    color: theme==='dark' ? '#ffffff' : '#161616',
    fontFamily: 'Poppins-Medium'
  },
  '& .MuiDateCalendar-root': {
    fontFamily: 'Poppins-Medium',
    padding: '8px',

  },
  '& .css-23p0if-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)': {
    border: 'none'
  },
  '& .MuiPickersDay-root:hover': {
    backgroundColor: theme==='violet' ? '#7b7ede' : '#bedbb0', // Green background for selected date
    color: theme==='violet' ? '#ffffff' :'#161616', 
  },
  '& .MuiPickersDay-root.Mui-selected': {
    width: '32px',
    height:'30px',
    backgroundColor: theme==='violet' ? '#5255bc' : '#9dc888',  // Green background for selected date
    color: theme==='violet' ? '#ffffff' :'#161616', // White text color for selected date
  },

  '& .MuiDateCalendar-root .MuiButtonBase-root-MuiPickersDay-root:hover': {
     backgroundColor: theme==='violet' ? '#9dc888' : '#bedbb0'
  },

  '& .css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel': {
    margin: '0 2px',
    width: '30px',
    height: '30px',
    fontSize: '14px',
    color: theme==='dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(22, 22, 22, 0.5)'

  },

}));

function CustomCalendarHeader(props) {
  const { currentMonth, onMonthChange } = props;

  const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'), 'left');
  const selectPreviousMonth = () =>
    onMonthChange(currentMonth.subtract(1, 'month'), 'right');
  const theme = useSelector(selectTheme);
  return (
    <CustomCalendarHeaderRoot theme = {theme}>
      <HeaderContainer>
        <Stack spacing={1} direction="row">
          <IconButton onClick={selectPreviousMonth} title="Previous month" sx={{ color: theme ==='dark'? '#ffffff' : '#161616'}}>
            <ChevronLeft />
          </IconButton>
        </Stack>
        <Typography variant="h6" style={{ fontFamily: 'Poppins-Medium' }}>
          {currentMonth.format('MMMM YYYY')}
        </Typography>
        <Stack spacing={1} direction="row">
          <IconButton onClick={selectNextMonth} title="Next month" sx={{ color: theme ==='dark'? '#ffffff' : '#161616'}}>
            <ChevronRight />
          </IconButton>
        </Stack>
      </HeaderContainer>
      <Divider theme = {theme}/>
    </CustomCalendarHeaderRoot>
  );
}

const CalendarHeaderComponent = ({onDateChange}) => {
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
    onDateChange(formatDate(date));
    console.log(formatDate(date));
  };

  const formatDate = (date) => {
    return format(date.toDate(), 'dd/MM/yyyy');
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

  const theme = useSelector(selectTheme);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CalendarContainer ref={calendarRef}>
        <div onClick={toggleCalendar} style={{ cursor: 'pointer' }}>
           <Typography
            variant="p"
            sx={{
              fontFamily: 'Poppins-Medium, sans-serif',
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'left',
              backgroundColor: 'none',
              border: 'none'
            }}
          >
            {renderDateText()}
          </Typography>
        </div>
        {isOpen && (
          <CustomDateCalendar
            theme={theme}
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

