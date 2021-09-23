import "./Animedoro.css";
import React, { useState, useEffect } from "react";
import { createTask, initializeTasks } from "./taskReducer";
import { useSelector, useDispatch } from "react-redux";

function AnimedoroCore({ logout }) {
  const [isActive, setActive] = useState(false);
  const [isPuased, setIsPuased] = useState(true);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [session, setSession] = useState(1);
  const [isBreak, setIsBreak] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [title, setTitle] = useState("No title specified ");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state);

  useEffect(() => {
    dispatch(initializeTasks());
  }, [dispatch]);

  const data = JSON.parse(window.localStorage.getItem("loggedTaskAppUser"));
  const userId = data["id"];

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
            setMinutes(1);
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

  const formData = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const secs = event.target.seconds.value;
    const minutes = event.target.minutes.value;
    event.target.minutes.value = "";
    event.target.seconds.value = "";
    event.target.title.value = "";
    setTitle(title);
    setMinutes(minutes); 
    setSeconds(secs);
  };

  return (
    <div>
      <div className="is">
        <div className="Pomodoro">
          <div>
            <div className="message">
              {displayMessage && <div>Break Time! New session starts in:</div>}
            </div>
            <div className="btn-small-cont">
              <button className="btn-small" onClick={() => setOpen(!open)}>
                <span>...</span>
              </button>
              <button className="logout-btn" onClick={logout}>
                Log Out
              </button>
            </div>
            <div
              style={{
                transform: open ? "translateX(0px)" : "translateX(-15000px)",
              }}
            >
              <form onSubmit={formData}>
                Title
                <input name="title" />
                <input name="minutes" type="number" />
                <input name="seconds" type="number" />
                <button className="button" type="submit">
                  add
                </button>
              </form>
            </div>
            <div className="Timer">
            <p>Current Task: {title}</p>
              <h1>Animedoro </h1>
              <h1>
                {timerMinutes}:{timerSeconds}
              </h1>
            </div>
            <div className="buttons">
              <button className="button" onClick={handleStart}>
                Start
              </button>
              <button className="button" onClick={handlePause}>
                Pause
              </button>
              <button className="button" onClick={handleReset}>
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
