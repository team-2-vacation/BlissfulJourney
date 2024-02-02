import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [cultureCount, setCultureCount] = useState(0);
  const [relaxingCount, setRelaxingCount] = useState(0);
  const [outdoorCount, setOutdoorCount] = useState(0);
  const [highScoreCategories, setHighScoreCategories] = useState([]);
  const [questionTracker, setQuestionTracker] = useState(0);

  const isUserLoggedIn = () => {
    return localStorage.getItem("TOKEN") !== null;
  };

  function refreshPage() {
    window.location.reload();
  }
  const handleAddCulture = async () => {
    const userId = window.localStorage.getItem("Id");
    const result = await axios.post("/api/users_interests", {
      userId: +userId,
      interestId: 1,
    });
  };
  const handleAddOutdoor = async () => {
    const userId = window.localStorage.getItem("Id");
    const result = await axios.post("/api/users_interests", {
      userId: +userId,
      interestId: 2,
    });
  };
  const handleAddRelax = async () => {
    const userId = window.localStorage.getItem("Id");
    const result = await axios.post("/api/users_interests", {
      userId: +userId,
      interestId: 3,
    });
  };
  const addInterests = () => {
    highScoreCategories.forEach(async (element) => {
      if (element === "Culture Traveler") {
        handleAddCulture();
      } else if (element === "Outdoor Traveler") {
        handleAddOutdoor();
      } else if (element === "Relaxing Traveler") {
        handleAddRelax();
      }
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const maxCount = Math.max(cultureCount, relaxingCount, outdoorCount);
    const updatedHighScoreCategories = [];
    if (cultureCount === maxCount) {
      updatedHighScoreCategories.push("Culture Traveler");
    }
    if (relaxingCount === maxCount) {
      updatedHighScoreCategories.push("Relaxing Traveler");
    }
    if (outdoorCount === maxCount) {
      updatedHighScoreCategories.push("Outdoor Traveler");
    }
    setHighScoreCategories(updatedHighScoreCategories);
    setQuestionTracker(questionTracker + 1);
  };
  return (
    <div className="bg-blissfulBlue-300 p-8 m-4 rounded-lg ">
      {questionTracker === 0 && (
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <h1 className="font-bold text-3xl text-gray-200">Blissful Journey Quiz</h1>
          <p className="text-gray-200">Take our quiz and find out what kind of traveler you are!</p>
          <br />
          <div style={{ display: "inline-block", textAlign: "left"}}>
            <p className="text-2xl font-semibold mb-3 text-gray-200">
              1. Which travel experience appeals to you the most for cultural exploration?
            </p>
            <label className="text-gray-200 " style={{ fontSize: "1.2rem" }}>
              <input
                type="radio"
                name="experience"
                value="museums"
                onChange={() => setCultureCount(cultureCount + 1)}
                required
                style={{ marginRight: "5px" }}
              />
              Museums
            </label>
            <br />
            <label className="text-gray-200" style={{ fontSize: "1.2rem" }}>
              <input
                type="radio"
                name="experience"
                value="cafes"
                onChange={() => setRelaxingCount(relaxingCount + 1)}
                required
                style={{ marginRight: "5px" }}
              />
              Cafes
            </label>
            <br />
            <label className="text-gray-200" style={{ fontSize: "1.2rem" }}>
              <input
                type="radio"
                name="experience"
                value="local_festivals"
                onChange={() => setOutdoorCount(outdoorCount + 1)}
                required
                style={{ marginRight: "5px" }}
              />
              Local Festivals
            </label>
          </div>
          <br />
          <button type="submit" className="bg-blissfulBlue-100 text-blue-50 py-2 px-4 rounded-md">
            Submit
          </button>
          <br />
        </form>
      )}
      {questionTracker === 1 && (
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", textAlign: "left" }}>
            <p className="text-2xl font-semibold mb-3 text-gray-200">
              2. If you had a day to yourself, what would you most likely choose to do?
            </p>
            <label className="text-gray-200" style={{ fontSize: "1.2rem" }}>
              <input
                type="radio"
                name="day_to_yourself"
                value="cultural_activities"
                onChange={() => setCultureCount(cultureCount + 1)}
                required
                style={{ marginRight: "5px" }}
              />
              Immerse yourself in unique activities that reflect the richness of human culture.
            </label>
            <br />

            <label className="text-gray-200" style={{ fontSize: "1.2rem" }}>
              <input
                type="radio"
                name="day_to_yourself"
                value="hiking"
                onChange={() => setRelaxingCount(relaxingCount + 1)}
                required
                style={{ marginRight: "5px" }}
              />
              Find a serene place to unwind and clear your thoughts.
            </label>
            <br />

            <label className="text-gray-200" style={{ fontSize: "1.2rem" }}>
              <input
                type="radio"
                name="day_to_yourself"
                value="beach_activities"
                onChange={() => setOutdoorCount(outdoorCount + 1)}
                required
                style={{ marginRight: "5px" }}
              />
              Embark on an adventure exploring new landscapes and natural wonders.
            </label>
          </div>
          <br />
          <button type="submit" className="bg-blissfulBlue-100 text-blue-50 py-2 px-4 rounded-md">
            Submit
          </button>
          <br />
        </form>
      )}
      {questionTracker === 2 && (
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
         <div style={{ display: "inline-block", textAlign: "left", maxWidth: "800px" }}>
            <p className="text-2xl font-semibold mb-3 text-gray-200">
              3. Which setting appeals to you the most for exploration?
            </p>
            <label className="text-gray-200" style={{ fontSize: "1.2rem" }}>
              <input
                type="radio"
                name="setting"
                value="cultural_district"
                onChange={() => setCultureCount(cultureCount + 1)}
                required
                style={{ marginRight: "5px" }}
              />
              Cultural District
            </label>
            <br />
            <label className="text-gray-200" style={{ fontSize: "1.2rem" }}>
              <input
                type="radio"
                name="setting"
                value="urban_oasis"
                onChange={() => setRelaxingCount(relaxingCount + 1)}
                required
                style={{ marginRight: "5px" }}
              />
              Urban Oasis
            </label>
            <br />
            <label className="text-gray-200" style={{ fontSize: "1.2rem" }}>
              <input
                type="radio"
                name="setting"
                value="hidden_gems"
                onChange={() => setOutdoorCount(outdoorCount + 1)}
                required
                style={{ marginRight: "5px" }}
              />
              Hidden Gems
            </label>
          </div>
          <br />
          <button type="submit" className="bg-blissfulBlue-100 text-blue-50 py-2 px-4 rounded-md">
            Submit
          </button>
          <br />
        </form>
      )}
      {questionTracker === 3 && (
         <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", textAlign: "left", maxWidth: "800px" }}>
            <p className="text-2xl font-semibold mb-3 text-gray-200">
              4. Which of these is the most important part of taking a break?
            </p>
            <label className="text-gray-200" style={{ fontSize: "1.2rem" }}>
              <input
                type="radio"
                name="break"
                value="new_experiences"
                onChange={() => setCultureCount(cultureCount + 1)}
                required
                style={{ marginRight: "5px" }}
              />
              Spending time with others and being able to enjoy new experiences
            </label>
            <br />
            <label className="text-gray-200" style={{ fontSize: "1.2rem" }}>
              <input
                type="radio"
                name="break"
                value="chill"
                onChange={() => setRelaxingCount(relaxingCount + 1)}
                required
                style={{ marginRight: "5px" }}
              />
              Having to do minimal work and being able to enjoy simple luxuries
            </label>
            <br />
            <label className="text-gray-200" style={{ fontSize: "1.2rem" }}>
              <input
                type="radio"
                name="break"
                value="fresh_air"
                onChange={() => setOutdoorCount(outdoorCount + 1)}
                required
                style={{ marginRight: "5px" }}
              />
              Getting fresh air and connecting to the natural world around you
            </label>
          </div>
          <br />
          <button type="submit" className="bg-blissfulBlue-100 text-blue-50 py-2 px-4 rounded-md">
            Submit
          </button>
          <br />
        </form>
      )}
      {questionTracker === 4 && (
        <div>
          <h3 className="text-gray-200" style={{ fontSize: "1.2rem" }}>
            You're ready to travel by your interests! You have {highScoreCategories.length} interest(s)!
          </h3>
          {highScoreCategories.map((interest) => {
            if (interest === "Culture Traveler") {
              return (
                <h1 className="text-gray-200" style={{ fontSize: "1.1rem" }}>
                  It looks like you're a culture focused traveler-click{" "}
                  <Link className="text-blissfulBlue-100 underline" key={interest} to={`/interests/1`}>
                    here
                  </Link>{" "}
                  to find out more!
                </h1>
              );
            } else if (interest === "Outdoor Traveler") {
              return (
                <h1 className="text-gray-200" style={{ fontSize: "1.1rem" }}>
                  It looks like you're an outdoors focused traveler-click{" "}
                  <Link className="text-blissfulBlue-100 underline" key={interest} to={`/interests/2`}>
                    here
                  </Link>{" "}
                  to find out more!
                </h1>
              );
            } else if (interest === "Relaxing Traveler") {
              return (
                <h1 className="text-gray-200" style={{ fontSize: "1.1rem" }}>
                  It looks like you're a relaxation focused traveler-click{" "}
                  <Link className="text-blue-500 underline" key={interest} to={`/interests/3`}>
                    here
                  </Link>{" "}
                  to find out more!
                </h1>
              );
            }
          })}
          <br />
          <Link to="/account">
            {isUserLoggedIn() && (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={addInterests}
              >
                Want to link your results to your profile? Click here!
              </button>
            )}
          </Link>
          <br />
          <br />
          <button
            type="button"
            className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={refreshPage}
          >
            <span>Want to take the quiz again? Reload here!</span>
          </button>
        </div>
      )}
    </div>
  );
};
export default Quiz;
