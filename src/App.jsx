import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faShieldAlt, faChartLine, faMoon, faSun, faClock } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [goal, setGoal] = useState(""); // State to store user goal
  const [darkMode, setDarkMode] = useState(false); // State for dark mode toggle
  const [timerRunning, setTimerRunning] = useState(false); // State for timer status
  const [timeElapsed, setTimeElapsed] = useState(0); // State to store time elapsed

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const startStopTimer = () => {
    setTimerRunning(!timerRunning);
  };

  // Update time elapsed if the timer is running
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval); // Clear interval when timer is stopped
    }

    return () => clearInterval(interval); // Cleanup on component unmount or when timer is stopped
  }, [timerRunning]);

  // Format time into minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Mock data for the chart
  const mockData = [
    { name: "Site A", time: 1 },
    { name: "Site B", time: 2 },
    { name: "Site C", time: 1.5 },
  ];

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <header>
        <div className="logo">
          <img src="./logo.jpg" alt="Logo" className="logo-img" />
          <h1>
            Productivity Tracker
          </h1>
        </div>
      </header>
      <div className="content">
        <div className="sections">
          <div className="section goal">
            <h2>
              <FontAwesomeIcon icon={faBullseye} className="icon" />
              Set Goal
            </h2>
            <input
              type="text"
              placeholder="Enter your daily goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <button onClick={() => alert("Goal Saved!")}>
              <FontAwesomeIcon icon={faShieldAlt} />
              Save Goal
            </button>
          </div>

          <div className="section timer">
            <h2>
              <FontAwesomeIcon icon={faClock} className="icon" />
              Timer
            </h2>
            <p>{formatTime(timeElapsed)}</p>
            <button onClick={startStopTimer}>
              {timerRunning ? "Stop Timer" : "Start Timer"}
            </button>
          </div>

          <div className="section blocked">
            <h2>
              <FontAwesomeIcon icon={faShieldAlt} className="icon" />
              Blocked Sites
            </h2>
            <input type="text" placeholder="Enter sites to block" />
            <button onClick={() => alert("Sites Blocked!")}>
              <FontAwesomeIcon icon={faShieldAlt} />
              Block
            </button>
          </div>
        </div>

        <div className="chart">
          <h2>
            <FontAwesomeIcon icon={faChartLine} className="icon" />
            Trends
          </h2>
          <LineChart width={750} height={300} data={mockData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="time" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>

      <div className="footer">
        <button onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>
  );
};

export default App;
