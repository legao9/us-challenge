// LandingPage.js
import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>Your Survey Platform</h1>
        <p>Unlock rewards, take surveys, connect with coaches, and climb the leaderboards!</p>
      </header>

      <section className="section rewards">
        <h2>Rewards</h2>
        <p>Discover exciting rewards tailored just for you!</p>
      </section>

      <section className="section surveys">
        <h2>Surveys</h2>
        <p>Share your opinions and earn rewards by participating in surveys.</p>
      </section>

      <section className="section coaches">
        <h2>Coaches</h2>
        <p>Connect with knowledgeable coaches to guide you through your survey journey.</p>
      </section>

      <section className="section leaderboards">
        <h2>Leaderboards</h2>
        <p>Compete with others and see where you stand on the leaderboards.</p>
      </section>

      <footer>
        <p>&copy; 2023 Your Survey Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
