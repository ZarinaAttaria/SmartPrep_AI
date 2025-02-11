import axios from "axios";
import React, { useEffect, useState } from "react";

const QuestionBank = () => {
  const [questions, setQuestions] = useState(null);
  const generateQuestions = async () => {
    const response = await axios.post(
      "http://localhost:8000/questionBank/generate-questions"
    );
    setQuestions(response.data.questions);
    console.log("Questions: ", response.data.questions);
  };
  useEffect(() => {
    generateQuestions();
  }, []);
  return (
    <div>
      <h1>Questions Bank</h1>
      <p>{questions}</p>
    </div>
  );
};

export default QuestionBank;
