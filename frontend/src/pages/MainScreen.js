import React from "react";
import "../styles/MainScreen.css";

export default function StartInterview() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className="startInterview-screen">
      <div>
        <div className="heading">Dashboard</div>
      </div>
      <div className="message-box">
        <div className="intro-message">
          <h2>Welcome Back {currentUser.user.username}!</h2>
          <p>Ready To Ace Your Next Interview?</p>
          <button>Start Interview</button>
        </div>
      </div>
      <div className="main-card">
        <div class="card">
          {/* <div class="card-header">
            <h2>Meta</h2>
          </div> */}
          
          <div class="card-footer">
            <button>10</button>
          </div>
          <div class="card-body">
            <p>Total Interviews</p>
          </div>
        </div>

        <div class="card">
          {/* <div class="card-header">
            <h2>Meta</h2>
          </div> */}
         
          <div class="card-footer">
            <button>75</button>
          </div>
          <div class="card-body">
            <p>Last Score</p>
          </div>
        </div>

        <div class="card">
          {/* <div class="card-header">
            <h2>Meta</h2>
          </div> */}
         
          <div class="card-footer">
            <button>60</button>
          </div>
          <div class="card-body">
            <p>Average Score</p>
          </div>
        </div>

      </div>
    </div>
  );
}
