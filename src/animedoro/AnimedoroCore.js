import "./Animedoro.css";
import React, { useState, useEffect } from "react";
import { createTask, initializeTasks } from "./taskReducer";
import { useSelector, useDispatch } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

function AnimedoroCore({ logout }) {
  const [isActive, setActive] = useState(false);
  const [isPuased, setIsPuased] = useState(true);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [session, setSession] = useState(1);
  const [isBreak, setIsBreak] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [title, setTitle] = useState("No title specified ");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state);

  const data = JSON.parse(window.localStorage.getItem("loggedTaskAppUser"));
  const userId = data["id"];

  useEffect(() => {
    dispatch(initializeTasks());
  }, [dispatch]);

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);

      if (isActive && !isPuased) {
        if (!isBreak) {
          if (minutes === 0 && seconds === 0) {
            setActive(false);
            setIsPuased(true);
            setMinutes(1);
            setSeconds(0);
            setIsBreak(true);
          }
          if (seconds === 0 && !isPuased) {
            if (minutes !== 0) {
              setSeconds(59);
              setMinutes(minutes - 1);
            } else {
              let seconds = 59;

              setSeconds(seconds);
              setMinutes(minutes);
              setDisplayMessage(!displayMessage);
            }
          } else {
            setSeconds(seconds - 1);
            setSession(session + 1);
          }
        }
        if (isBreak) {
          if (minutes === 0 && seconds === 0) {
            setActive(false);
            setIsPuased(true);
            setMinutes(2);
            setSeconds(0);
            setIsBreak(false);
          }
          if (seconds === 0 && !isPuased) {
            if (minutes !== 0) {
              setSeconds(59);
              setMinutes(minutes - 1);
            } else {
              let seconds = 59;

              setSeconds(seconds);
              setMinutes(minutes);
              setDisplayMessage(!displayMessage);
            }
          } else {
            setSeconds(seconds - 1);
          }
        }
      }
    }, 1000);
  }, [
    isActive,
    isPuased,
    seconds,
    session,
    minutes,
    isBreak,
    displayMessage,
    tasks,
    title,
  ]);

  const handleStart = () => {
    setActive(true);
    setIsPuased(false);
  };

  const handlePause = () => {
    setIsPuased(true);
  };

  const handleReset = () => {
    setIsPuased(true);
    setActive(false);
    addTask();
    console.log(`isPuased: ${isPuased}`);
    console.log(isActive);
  };

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const addTask = async () => {
    dispatch(createTask(title, session, userId));
    setTitle("title");
  };

  const submitFormData = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const secs = event.target.seconds.value;
    const minutes = event.target.minutes.value;
    event.target.minutes.value = "";
    event.target.seconds.value = "";
    event.target.title.value = "";
    console.log(title);
    console.log(secs);
    console.log(minutes);
    setTitle(title);
    setMinutes(minutes);
    setSeconds(secs);
    handleClose(); 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const AModal = () => {
    const showHideClassName = open
      ? "modal display-block"
      : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
        <AiOutlineClose className="close-btn" onClick={handleClose} />
          <form onSubmit={submitFormData}>
          <p className="form-name">Title of the task</p>
            <input className="form-input" name="title" />
            <p className="form-name">Minutes</p>
            <input className="form-input" name="minutes" type="number" min="0" max="60"/>
            <p className="form-name">Seconds</p>
            <input className="form-input" name="seconds" type="number" min="0" max="60"/>
            <button className="submit-btn" type="submit" >
              Submit
            </button>
          </form>
          </section>
        </div>
    );
  };

  return (
    <div>
      <div className="is">
        <AModal/>
        <div className="Pomodoro">
          <div className="message">
            {displayMessage && <div>Break Time! New session starts in:</div>}
          </div>
          <div className="Timer">
            <div>
              <div className="a-btns">
                <IoIosAddCircleOutline
                  onClick={() => setOpen(!open)}
                  className="burger"
                />

                <button className="logout-btn" onClick={logout}>
                  Log Out
                </button>
              </div>
              <p>Current Task: {title}</p>
              <h1> Animedoro </h1>
              <h1>
                {timerMinutes}:{timerSeconds}
              </h1>
            </div>
            <div className="btns">
              <button className="btn" onClick={handleStart}>
                Start
              </button>
              <button className="btn" onClick={handlePause}>
                Pause
              </button>
              <button className="btn" onClick={handleReset}>
                Stop
              </button>
            </div>
          </div>
        </div>
        <div>
          <ul>
            {tasks.map((task) => (
              <li className="task" key={task.id}>
                <p>{task.title}</p>
                <p>{task.taskTime}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AnimedoroCore;
