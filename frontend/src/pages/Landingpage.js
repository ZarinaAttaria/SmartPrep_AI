import React, { useState } from "react";
import "../styles/LandingPage.css";
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`faq-item ${isOpen ? "open" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="faq-question">
        {question}
        <img src="chevron.png" className="dropdown-icon" />
      </div>

      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const Landingpage = () => {
  const faqs = [
    {
      question: "What is SmartPrep AI?",
      answer:
        "SmartPrep AI is an AI-driven interview preparation platform that helps users practice and improve their interview skills with real-time feedback.",
    },
    {
      question: "Is SmartPrep AI free to use?",
      answer:
        "Yes! You can start practicing for free. However, we also offer premium features for more in-depth analysis and personalized coaching.",
    },
    {
      question: "How does SmartPrep AI analyze my performance?",
      answer:
        "Our AI evaluates your answers based on content, tone, confidence, and body language (for video interviews).",
    },
    {
      question: "Can I practice for specific job roles?",
      answer:
        "Absolutely! You can choose your desired job role, and SmartPrep AI will generate relevant interview questions tailored to that role.",
    },
    {
      question: "Does SmartPrep AI support technical interview questions?",
      answer:
        "Yes! We provide coding challenges and technical problem-solving questions for software engineers and other technical roles.",
    },
  ];
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
          src="https://www.4cornerresources.com/wp-content/uploads/2023/08/asynchronous-video-interview-scaled.jpeg"
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
      <div className="howToUse-container">
        <h1 className="howToUse-heading">How to Use SmartPrep AI?</h1>
        <div className="howToUse-steps">
          <div>
            <div className="step">
              <h1 className="step-number">1</h1>
              <div className="step-inner-div">
                <h3 className="step-title">Sign Up & Create Your Profile</h3>
                <p className="step-description">
                  Sign up with your email and set up your profile to get
                  started.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-div">
                <h1 className="step-number">3</h1>
                <div className="step-inner-div">
                  <h3 className="step-title"> Start Practicing </h3>
                  <p className="step-description">
                    Start your interview simulation. Our AI generates
                    personalized questions based on your selected job role and
                    experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="step">
              <div className="step-div">
                <h1 className="step-number">5</h1>
                <div className="step-inner-div">
                  <h3 className="step-title">Track Your Progress</h3>
                  <p className="step-description">
                    Monitor your improvement over time with personalized
                    progress reports and recommendations for areas of
                    improvement
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="step">
              <div className="step-div">
                <h1 className="step-number">2</h1>
                <div className="step-inner-div">
                  <h3 className="step-title">Choose Your Interview Type</h3>
                  <p className="step-description">
                    elect the type of interview you want to practice (e.g.,
                    video-based, text-based)
                  </p>
                </div>
              </div>
            </div>
            <div className="step">
              <div className="step-div">
                <h1 className="step-number">4</h1>
                <div className="step-inner-div">
                  <h3 className="step-title">Receive Feedback</h3>
                  <p className="step-description">
                    Once you finish, receive detailed feedback on your
                    responses, including content, tone, and body language (for
                    video interviews)
                  </p>
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-div">
                <h1 className="step-number">6</h1>
                <div className="step-inner-div">
                  <h3 className="step-title">Integration with Job Portals</h3>
                  <p className="step-description">
                    Directly import job descriptions and practice for specific
                    job openings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="whoCanBenefit-container">
        <h1 className="whoCanBenefit-heading">
          Who Can Benefit from SmartPrep AI?
        </h1>
        <div className="whoCanBenefit-list">
          <div className="whoCanBenefit-item">
            <img src="https://interviewai.me/assets/img/values-1.png" />
            <h3 className="benefit-title">Students & Recent Graduates</h3>
            <p className="benefit-description">
              Practice answering tailored interview questions and gain
              confidence for your job search.
            </p>
          </div>
          <div className="whoCanBenefit-item">
            <img src="https://interviewai.me/assets/img/values-2.png" />
            <h3 className="benefit-title">Job Seekers & Candidates</h3>
            <p className="benefit-description">
              Practice answering common interview questions and improve your
              performance.
            </p>
          </div>
          <div className="whoCanBenefit-item">
            <img src="https://interviewai.me/assets/img/values-3.png" />
            <h3 className="benefit-title">Remote Workers & Freelancers</h3>
            <p className="benefit-description">
              Ace virtual job interviews with AI-generated, tailored questions
              and personalized feedback.
            </p>
          </div>
        </div>
      </div>
      <div className="faq-container">
        <h1 className="faq-heading">Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
