import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

const Dashboard = () => {
  return (
    <main className="main-content">
      <div className="dashboard-container">
        <section className="available-notes">
          <h2>Available Notes (PDFs)</h2>
          <div className="notes-grid">
            {/* Repeatable Note Cards */}
            {/* Example */}
            <a href="#" className="note-card">
              <h3>Introduction to Calculus</h3>
              <p>A comprehensive overview of basic calculus concepts including limits, derivatives... (PDF)</p>
            </a>
            {/* more cards */}
          </div>
        </section>

        <aside className="user-options">
          <h2>Options</h2>
          <ul>
            <li><a href="#user-activity">User Activity</a></li>
            <li><Link to="/uploaded">Uploaded Notes</Link></li>
            <li><Link to="/saved">Saved Notes</Link></li>
            <li><a href="#rated">Rated Notes</a></li>
            <li><a href="#discussion">Discussions</a></li>
          </ul>
        </aside>
      </div>
    </main>
  );
};

export default Dashboard;

