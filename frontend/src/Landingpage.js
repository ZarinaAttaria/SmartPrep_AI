import React from "react";
import "./styles/LandingPage.css";
const Landingpage = () => {
  return (
    <div className="landingPage-container">
      <div className="top-container">
        <div className="top-container-text">
          <h1 className="heading">Land Your Dream Job with</h1>
          <h1 className="heading">Smart Prep AI</h1>
          <p className="top-para">
            Master your interview skills with personalized practice sessions
          </p>
          <p className="top-para">
            and real-time feedback. SmartPrep AI is your ultimate
          </p>
          <p className="top-para"> guide to acing every interview.</p>
          <button className="getStartedBtn">Start for Free</button>
        </div>
      </div>
      <div className="whyuse-Container">
        <img
          className="whyuse-image"
          src="https://interviewfocus.com/wp-content/uploads/2021/01/Best-Lighting-for-a-Video-Interview.jpg"
        />
        <div>
          <h1 className="whyuse-heading">Why use SmartPrep AI?</h1>
          <p className="whyuse-para">
            Ready to stop guessing and start impressing in your next interview?
            Our AI-driven simulations provide a personalized interview
            experience, offering real-time feedback on your answers, body
            language, and more. Whether tackling technical questions or
            improving soft skills, SmartPrep adapts to your needs, boosting your
            confidence and preparation.
          </p>
          <p className="whyuse-para">
            No more generic prep—get tailored insights, track your progress, and
            refine your responses with every session. Outsmart the competition
            and land your dream job with SmartPrep AI!
          </p>
        </div>
      </div>
      <div className="features-main-container">
        <h1 className="features-heading">Features That Set You Apart!</h1>
        <div className="features-container">
          <div className="features-item">
            <div className="item-logo-container">
              <img className="feature-item-logo" src="robot.png" />
            </div>
            <h4 className="feature-item-heading">Personalized AI Coaching</h4>
            <p className="feature-item-para">
              Experience interview prep like never before! Our AI analyzes your
              strengths and weaknesses, delivering custom simulations that match
              your unique career goals.
            </p>
          </div>
          <div className="features-item">
            <div className="item-logo-container">
              <img className="feature-item-logo" src="gear.png" />
            </div>
            <h4 className="feature-item-heading">Real-Time Feedback</h4>
            <p className="feature-item-para">
              Receive immediate, actionable feedback on your answers, tone, and
              body language, ensuring you polish your performance before
              stepping into the real interview.
            </p>
          </div>
          <div className="features-item">
            <div className="item-logo-container">
              <img className="feature-item-logo" src="survey.png" />
            </div>
            <h4 className="feature-item-heading">Diverse Question Sets</h4>
            <p className="feature-item-para">
              From technical brain teasers to behavioral questions, our
              extensive library adapts to your industry, so you’re prepared for
              every curveball.
            </p>
          </div>
          <div className="features-item">
            <div className="item-logo-container">
              <img className="feature-item-logo" src="rising.png" />
            </div>
            <h4 className="feature-item-heading">Progress Tracking</h4>
            <p className="feature-item-para">
              Easily monitor your improvement over time with intuitive graphs
              and insights that show how far you’ve come on your journey to
              success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
