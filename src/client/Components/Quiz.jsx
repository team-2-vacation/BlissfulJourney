import React, { useState } from "react";
import axios from "axios";

const Quiz = () => {
  const [cultureCount, setCultureCount] = useState(0);
  const [relaxingCount, setRelaxingCount] = useState(0);
  const [outdoorCount, setOutdoorCount] = useState(0);
  const [highScoreCategories, setHighScoreCategories] = useState([]);

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

    setCultureCount(0);
    setRelaxingCount(0);
    setOutdoorCount(0);
  };
  return (
    <div>
      <h2>Blissful Journey Quiz</h2>
      <p>Answer the following questions to find out what kind of traveler you are:</p>
      <form onSubmit={handleSubmit}>
        <div>
          <p>1. Which travel experience appeals to you the most for cultural exploration?</p>
          <label>
            <input
              type="radio"
              name="experience"
              value="museums"
              onChange={() => setCultureCount(cultureCount + 1)}
              required
            />
            Museums
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="experience"
              value="cafes"
              onChange={() => setRelaxingCount(relaxingCount + 1)}
              required
            />
            Cafes
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="experience"
              value="local_festivals"
              onChange={() => setOutdoorCount(outdoorCount + 1)}
              required
            />
            Local Festivals
          </label>
        </div>

        <div>
          <p>2. If you had a day to yourself, what would you most likely choose to do?</p>
          <label>
            <input
              type="radio"
              name="day_to_yourself"
              value="cultural_activities"
              onChange={() => setCultureCount(cultureCount + 1)}
              required
            />
            Immerse yourself in unique activities that reflect the richness of human culture.
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="day_to_yourself"
              value="hiking"
              onChange={() => setRelaxingCount(relaxingCount + 1)}
              required
            />
            Find a serene place to unwind and clear your thoughts.
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="day_to_yourself"
              value="beach_activities"
              onChange={() => setOutdoorCount(outdoorCount + 1)}
              required
            />
            Embark on an adventure exploring new landscapes and natural wonders.
          </label>
        </div>

        <div>
          <p>3. Which setting appeals to you the most for exploration?</p>
          <label>
            <input
              type="radio"
              name="setting"
              value="cultural_district"
              onChange={() => setCultureCount(cultureCount + 1)}
              required
            />
            Cultural District
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="setting"
              value="urban_oasis"
              onChange={() => setRelaxingCount(relaxingCount + 1)}
              required
            />
            Urban Oasis
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="setting"
              value="hidden_gems"
              onChange={() => setOutdoorCount(outdoorCount + 1)}
              required
            />
            Hidden Gems
          </label>
        </div>
        <div>
          <p>4. Which of these is the most important part of taking a break?</p>
          <label>
            <input
              type="radio"
              name="break"
              value="new_experiences"
              onChange={() => setCultureCount(cultureCount + 1)}
              required
            />
            Spending time with others and being able to enjoy new experiences
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="break"
              value="chill"
              onChange={() => setRelaxingCount(relaxingCount + 1)}
              required
            />
            Having to do minimal work and being able to enjoy simple luxuries
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="break"
              value="fresh_air"
              onChange={() => setOutdoorCount(outdoorCount + 1)}
              required
            />
            Getting fresh air and connecting to the natural world around you
          </label>
        </div>

        <br />
        <button type="submit">Submit</button>
        <br />
      </form>

      {highScoreCategories.length === 0 && (
        <div>
          <h3>Hit submit to see your results here!</h3>
        </div>
      )}
      {highScoreCategories.length > 0 && (
        <div>
          <h3>
            You're a traveler! You have {highScoreCategories.length} interest(s)!
            {highScoreCategories.map((interest) => (
              <div key={interest}>
                <h3>Traveler type: {interest}</h3>
              </div>
            ))}
            <button type="button" onClick={addInterests}>
              Want to link your results to your profile? Click here!
            </button>
            <br />
            <button type="button" onClick={refreshPage}>
              <span>Want to take the quiz again? Reload here!</span>
            </button>
          </h3>
        </div>
      )}
    </div>
  );
};
export default Quiz;
