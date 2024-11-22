import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
  const [event, setEvent] = useState({ summary: "", date: "", time: "" });
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {

    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/status", {
          withCredentials: true,
        });
        if (!response.data.loggedIn) {
            navigate("/");

        }
      } catch (error) {
        console.error("Authentication Check Error:", error);
        navigate("/");

      }
    };

    checkAuthStatus();
    fetchEvents();
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/event", {
        withCredentials: true,
      });
      setEvents(response.data);
    } catch (error) {
      setError("Failed to fetch events. Please try again later.");
      console.error("Fetch Events Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventDetails = {
      summary: event.summary,
      start: {
        dateTime: `${event.date}T${event.time}:00`,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: `${event.date}T${event.time}:00`,
        timeZone: "Asia/Kolkata",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/event",
        { eventDetails },
        { withCredentials: true }
      );
      setEvents([...events, response.data].slice(-10));
      setEvent({ summary: "", date: "", time: "" });
    } catch (error) {
      setError("Failed to create event. Please try again.");
      console.error("Create Event Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name</label>
          <input
            type="text"
            placeholder="Event Name"
            value={event.summary}
            onChange={(e) => setEvent({ ...event, summary: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Event Date</label>
          <input
            type="date"
            value={event.date}
            onChange={(e) => setEvent({ ...event, date: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Event Time</label>
          <input
            type="time"
            value={event.time}
            onChange={(e) => setEvent({ ...event, time: e.target.value })}
            required
          />
        </div>
        <button type="submit">Create Event</button>
        {error && <p className="error">{error}</p>}
      </form>

      <h3>Created Events:</h3>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Event Calendar link</th>
          </tr>
        </thead>
        <tbody>
          {events.map((evt, index) => (
            <tr key={index}>
              <td>{evt.summary}</td>
              <td>{new Date(evt.start.dateTime).toLocaleDateString()}</td>
              <td>
                {new Date(evt.start.dateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>
                {" "}
                <a href={evt.htmlLink} rel="noreferrer" target="_blank">
                  View in Calendar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-danger mt-4" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
