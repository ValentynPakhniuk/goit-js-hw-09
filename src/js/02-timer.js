import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const timeDays = document.querySelector('[data-days]');
const timeHours = document.querySelector('[data-hours]');
const timeMinutes = document.querySelector('[data-minutes]');
const timeSeconds = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');
const inputData = document.querySelector('#datetime-picker');
let timerEnd = null;
let timerId = null;

startBtn.addEventListener('click', onStartTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const data = selectedDates[0];
    const timeMil = data.getTime() - Date.now();
    if (timeMil <= 0) {
      Notiflix.Report.warning("Please choose a date in the future");
      startBtn.disabled = true;
      return;
    } startBtn.disabled = false;
  },
};

flatpickr(inputData, options);

function onStartTimer() {
  timerEnd = new Date(inputData.value) - Date.now();

  timerId = setInterval(() => {
    startBtn.disabled = true;
    const { days, hours, minutes, seconds } = convertMs(timerEnd -= 1000);
    timeDays.textContent = `${days}`;
    timeHours.textContent = `${hours}`;
    timeMinutes.textContent = `${minutes}`;
    timeSeconds.textContent = `${seconds}`;
    if (timerEnd < 1000) {
      clearInterval(timerId);
      return;
    } 
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}