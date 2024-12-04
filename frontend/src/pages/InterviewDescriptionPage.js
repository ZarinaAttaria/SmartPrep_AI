import React, { useState } from "react";
import { Select, Input, Button } from "antd";
import "../styles/InterviewDescription.css";
import { toast } from "react-toastify";
import axios from "axios";

const InterviewDescriptionPage = () => {
  const [interviewType, setInterviewType] = useState("Text based");
  const [interviewDuration, setInterviewDuration] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [interviewLevel, setInterviewLevel] = useState("Junior");

  const handleSubmit = async () => {
    const formData = {
      interviewType,
      interviewDuration,
      jobDescription,
      interviewLevel,
    };
    console.log("Form Data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:8000/users/interview-setup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Interview Setup Successful!", response.data);
      toast.success("Interview Setup Successful!");
    } catch (error) {
      console.error(
        error.response?.data?.message || "Interview Setup Unsuccessful"
      );
      toast.error("Interview Setup Unsuccessful");
    }
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
            onChange={setInterviewType}
            options={[
              { value: "video", label: "Video based" },
              { value: "text", label: "Text based" },
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
            placeholder="Select Interview Level"
            value={interviewLevel}
            onChange={setInterviewLevel} // Handle selection change
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
