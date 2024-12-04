import React, { useState } from "react";
import { Select, Input, Button } from "antd";
import "../styles/InterviewDescription.css";
const InterviewDescriptionPage = () => {
  const [interviewType, setInterviewType] = useState("");
  const [interviewDuration, setInterviewDuration] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [interviewLevel, setInterviewLevel] = useState("");

  const handleSubmit = () => {
    const formData = {
      interviewType,
      interviewDuration,
      jobDescription,
      interviewLevel,
    };
    console.log("Form Data:", formData);
  };

  return (
    <div className="interviewSetupContainer">
      <h1>Set up your interview</h1>
      <div
        className="form"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div>
          <label>Interview Type</label>
          <Select
            placeholder="Select Interview Type"
            value={interviewType}
            defaultValue="Behavioural"
            onChange={setInterviewType}
            options={[
              { value: "Behavioural", label: "Behavioural" },
              { value: "Technical", label: "Technical" },
              { value: "CaseStudy", label: "Case Study" },
            ]}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Interview Duration (in minutes)</label>
          <Input
            type="number"
            placeholder="Enter duration"
            value={interviewDuration}
            onChange={(e) => setInterviewDuration(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label>Job Description</label>
          <Input.TextArea
            placeholder="Enter job description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label>Interview Level</label>
          <Select
            placeholder="Select Interview Levels"
            value={interviewLevel}
            onChange={setInterviewLevel}
            defaultValue="Junior"
            options={[
              { value: "Junior", label: "Junior" },
              { value: "Mid", label: "Mid" },
              { value: "Senior", label: "Senior" },
            ]}
            style={{ width: "100%" }}
          />
        </div>

        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ alignSelf: "center", marginTop: "20px" }}
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
};

export default InterviewDescriptionPage;
