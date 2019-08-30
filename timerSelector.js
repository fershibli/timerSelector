import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';

const dayInSeconds = 60 * 60 * 24;
const hourInSeconds = 60 * 60;
const minuteInSeconds = 60;

const leftPad = (number, length) =>
  ('0'.repeat(length - 1) + number).slice(-length);

const secondsToString = seconds => {
  const days = Math.floor(seconds / dayInSeconds);
  seconds -= days * dayInSeconds;
  const hours = Math.floor(seconds / hourInSeconds);
  seconds -= hours * hourInSeconds;
  const minutes = Math.floor(seconds / minuteInSeconds);

  return `${leftPad(days, 2)}:${leftPad(hours, 2)}:${leftPad(minutes, 2)}`;
};

const stringToSeconds = string => {
  const [days, hours, minutes] = string.split(':');
  return (
    days * dayInSeconds + hours * hourInSeconds + minutes * minuteInSeconds
  );
};

const secondsToDate = (seconds, strDays, strHours, strMinutes) => {
  const [days, hours, minutes] = secondsToString(seconds).split(':');
  return `${days} ${strDays}, ${hours} ${strHours}, ${minutes} ${strMinutes}`;
};

const TimerSelector = ({ value, onChange, ...props }) => {
  const [timerValue, setTimerValue] = useState(secondsToString(value));
  const handleChange = element => {
    setTimerValue(element.target.value);
    const secondsValue = stringToSeconds(element.target.value);
    onChange({
      ...element,
      target: {
        ...element.target,
        value: secondsValue,
        name: props.name,
      },
    });
  };
  return (
    <InputMask
      mask="99:99:99"
      maskChar="0"
      value={timerValue}
      onChange={handleChange}
    >
      {() => <TextField {...props} />}
    </InputMask>
  );
};

export { TimerSelector, stringToSeconds, secondsToString, secondsToDate };
