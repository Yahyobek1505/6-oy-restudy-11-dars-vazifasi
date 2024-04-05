import React, { useState, useEffect, useRef } from "react";

function PomodoroApp() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const time = useRef(0);
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalId);
            setIsRunning(false);
            setIsBreak(!isBreak);
            setMinutes(isBreak ? 25 : 5);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, seconds, minutes, isBreak]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };
function handleClick(e) {
  e.preventDefault();
  setIsRunning(true);
  setMinutes(time.current.value);
  time.current.value = ""
}
  return (
    <div className="box-item bg-purple-900 h-screen ">
      <div className="title">
        <h1 className="text-center text-4xl pt-2 text-white">Hello Pomodoro</h1>
        <form onSubmit={handleClick} className="w-[500px] mx-auto mt-4">
          <input
            ref={time}
            type="number"
            className="outline-none h-16 w-96 text-2xl rounded-lg px-2"
            placeholder="Enter time"
          />
          <button  className="bg-blue-900 rounded-md p-2 ml-2 text-white h-16 w-20 text-3xl">
            Add
          </button>
        </form>
      </div>
        <h1 className="text-center text-4xl mt-8 mb-4 text-white">{isBreak ? "Break Time" : "Focus Time"}</h1>
      <div className="w-[250px] h-[250px] rounded-[50%] mx-auto bg-slate-800 text-white mt-6">
        <div className="text-center pt-16">
          <h1 className="text-[64px]">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </h1>
        </div>
      </div>
        <div className="text-center mt-4">
          {!isRunning ? (
            <i onClick={startTimer} class="fa-regular fa-circle-play cursor-pointer text-white text-4xl bg-blue-900 rounded-md p-2"></i>
          ) : (
            <i onClick={pauseTimer} class="fa-solid fa-pause cursor-pointer text-white text-4xl bg-blue-900 p-4 rounded-md"></i>
          )}
          <span onClick={resetTimer} className="text-2xl p-2 cursor-pointer ml-4 mt-4 text-white bg-blue-900 rounded-md">Reset</span>
        </div>
    </div>
  );
}

export default PomodoroApp;
