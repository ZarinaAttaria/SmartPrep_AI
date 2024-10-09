import React from "react";
import "./styles/LandingPage.css";
const Landingpage = () => {
  return (
    <div className="landingPage-container">
      {/* <img
        src="how-can-ai-help-me-ace-interviews.jpg.webp"
        className="background-Image"
      /> */}
      <div className="top-container">
        <div className="top-container-text">
          <h1 className="heading">Ace your next interview with SmartPrep AI</h1>
          <p>
            Prepare and Practice your interview skills and succeed with
            SmartPrep AI
          </p>
          <button>Start For Free</button>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
