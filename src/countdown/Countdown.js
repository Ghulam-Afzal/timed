import "./Countdown.css";
import React, { useState, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import Navbar from "../navbar/Navbar";

function Countdown() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [formMinutes, setFormMinutes] = useState(25);
  const [formSeconds, setFormSeconds] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);

      if (isActive && !isPaused) {
        if (minutes === 0 && seconds === 0) {
          setIsActive(false);
          setIsPaused(true);
          setMinutes(formMinutes);
          setSeconds(formSeconds);
        }
        if (seconds === 0 && !isPaused) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let seconds = 59;
            setSeconds(seconds);
            setMinutes(minutes);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);
  }, [isActive, isPaused, seconds, minutes, formMinutes, formSeconds]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(true);
    setSeconds(0);
    setMinutes(25);
  };

  const formData = (event) => {
    event.preventDefault()
    const secs = event.target.seconds.value;
    const minutes = event.target.minutes.value;
    event.target.minutes.value = "";
    event.target.seconds.value = "";
    setFormMinutes(minutes);
    setFormSeconds(secs);
    setMinutes(minutes);
    setSeconds(secs);
  };


  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return (
    <div>
      <Navbar />
      <div
        style={{ transform: open ? "translateX(0px)" : "translateX(-15000px)" }}
      >
        <form onSubmit={formData}>
          <input name="minutes" type="number" />
          <input name="seconds" type="number" />
          <button type="submit">add</button>
        </form>
      </div>
      <div className="Countdown-container">
        <IoIosAddCircleOutline
          onClick={() => setOpen(!open)}
          className="burger"
        />
        <h1 className="Countdown-title">Countdown</h1>
        <div className="Countdown-main">
          <h3>
            {timerMinutes}:{timerSeconds}
          </h3>
          <div className="btns">
            <button className="btn" onClick={startTimer}>Start</button>
            <button className="btn" onClick={pauseTimer}>Pause</button>
            <button className="btn" onClick={resetTimer}>Stop</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
