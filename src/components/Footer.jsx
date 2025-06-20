import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
      setTimestamp(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="logo.png" alt="Personal Habit League" />
          <p>Build Better Habits Together</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/challenges">Challenges</a></li>
            <li><a href="/leaderboard">Leaderboard</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-legal">
          <h3>Legal</h3>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/cookies">Cookie Settings</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Connect</h3>
          <p>Email: <a href="mailto:support@personalhabitleague.com">support@personalhabitleague.com</a></p>
          <p>Twitter: <a href="https://twitter.com/HabitLeague">@HabitLeague</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© <span id="current-year">{currentYear}</span> Personal Habit League. All rights reserved.</p>
        <p>Page loaded on: <span id="timestamp">{timestamp}</span></p>
      </div>
    </div>
  );
}
