import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, differenceInCalendarDays, isPast, isYesterday, isToday } from 'date-fns';
import css from './Calendar.module.css';

const Calendar = ({ initialDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);
  const today = new Date();

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(new Date(initialDate));
    }
  }, [initialDate]);

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
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const renderDateText = () => {
    if (!selectedDate) {
      return 'Select a deadline';
    }

    if (isToday(selectedDate)) {
      return `Today, ${format(selectedDate, 'MMMM d')}`;
    }

    if (isPast(selectedDate)) {
      if (isYesterday(selectedDate)) {
        return 'Your deadline passed yesterday';
      }
      const daysPassed = differenceInCalendarDays(today, selectedDate);
      return `Deadline passed ${daysPassed} days ago`;
    }

    const difference = differenceInCalendarDays(selectedDate, today);

    let dateText;
    if (difference === 1) {
      dateText = `Tomorrow, ${format(selectedDate, 'MMMM d')}`;
    } else {
      dateText = `In ${difference} days, ${format(selectedDate, 'MMMM d')}`;
    }

    return dateText;
  };

  return (
    <div className={css.calendarContainer} ref={calendarRef}>
      <div onClick={toggleCalendar} className={css.calendarText}>
        {renderDateText()}
      </div>
      {isOpen && (
        <div className={css.calendarPopup}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            minDate={today}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;

// GUIDE
// const existingDate = '2024-06-10';
// <Calendar initialDate={existingDate} />