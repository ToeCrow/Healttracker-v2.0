import React, { useEffect, useState } from "react";
import WeightList from "../components/WeightList";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  setGender,
  setHeight,
  setAge,
  setActivityLevel,
  setGoal,
  calculateTDEE,
  setBirthDate,
  addWeight,
} from "../Redux/reducers/profileSlice";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {

  const [errorMessage, setErrorMessage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { gender, weight, height, age, activityLevel, goal, tdee, birthDate } =
    useSelector((state) => state.profile);

  const latestWeight =
    weight.length > 0 ? weight[weight.length - 1].weight : "";
  const [weightInput, setWeightInput] = useState(latestWeight);

  useEffect(() => {
    if (gender) dispatch(setGender(gender));
    if (height) dispatch(setHeight(height));
    if (age) dispatch(setAge(age));
    if (activityLevel) dispatch(setActivityLevel(activityLevel));
    if (goal) dispatch(setGoal(goal));
  }, [dispatch, gender, height, age, activityLevel, goal]);

  useEffect(() => {
    if (goal || weight.length) {
      dispatch(calculateTDEE()); // Dispatch the thunk
    }
  }, [goal, weight, activityLevel, dispatch]);

 
  const handleWeightChange = (e) => {
    setWeightInput(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newWeightValue = parseFloat(weightInput);

    if (!weightInput || !gender || !height || !birthDate ) {
      console.error("Missing values");
      setErrorMessage("Alla fällt måste fyllas i");
      return;
    }

    const hasWeightChanged = newWeightValue !== latestWeight;

    const date = new Date().toISOString().split("T")[0];

    // Lägg till vikten i weight-arrayen endast om den har ändrats
    if (hasWeightChanged) {
      dispatch(addWeight({ weight: newWeightValue, date }));
    }

    // Navigera tillbaka till dashboard
    navigate("/");
  };

  const handleBirthDateChange = (e) => {
    const birthDateValue = e.target.value;
    dispatch(setBirthDate(birthDateValue));

    const birthDateObj = new Date(birthDateValue);
    const today = new Date();
    const calculatedAge = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      dispatch(setAge(calculatedAge - 1));
    } else {
      dispatch(setAge(calculatedAge));
    }
  };

  return (
    <main id='main-content' className="flex flex-col items-center p-4 gap-4">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start p-4 max-w-4xl w-full'>
        <div className="flex flex-col gap-4">
          <form className="w-full card p-6 rounded-lg shadow-md mt-4 fixed-width">
            <h2 className="text-2xl font-bold text-center mb-4">
              Profil
            </h2>

            <div className="mb-4">
              <fieldset className="flex flex-col">
                <legend className="label-custom">
                  Kön <span className="font-normal">(viktig för uträkning av kalorier)</span>
                  :
                </legend>
                <div className="flex">
                  <label className="block m-4">
                    <input
                      type="radio"
                      id="gender-male"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={() => dispatch(setGender("male"))}
                      required
                      className="mr-2"
                    />
                    Man
                  </label>
                  <label className="block m-4">
                    <input
                      type="radio"
                      id="gender-female"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={() => dispatch(setGender("female"))}
                      required
                      className="mr-2"
                    />
                    Kvinna
                  </label>
                </div>
              </fieldset>
            </div>

            <label htmlFor="weight" className="label-custom">
              Vikt (kg):
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={weightInput || ""}
              onChange={handleWeightChange}
              required
              className={`block w-full border rounded p-2 mb-4 ${weightInput ? "" : "border-accent border-2"}`}
            />

            <label htmlFor="height" className="label-custom">
              Längd (cm):
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={height || ""}
              onChange={(e) => dispatch(setHeight(e.target.value))}
              required
              className={`block w-full border rounded p-2 mb-4 ${height ? "" : "border-accent border-2"}`}
            />

            <label htmlFor="birthdate" className="label-custom">
              Födelsedatum (yyyy-mm-dd):
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={birthDate || ""}
              onChange={handleBirthDateChange}
              required
              className={`block w-full border rounded p-2 mb-4 ${birthDate ? "" : "border-accent border-2"}`}
            />

            <label htmlFor="activity-level" className="label-custom">
              Aktivitetsnivå:
            </label>
            <select
              id="activity-level"
              value={activityLevel}
              required
              onChange={(e) =>
                dispatch(setActivityLevel(parseFloat(e.target.value)))
              }
              className={`block w-full border rounded p-2 mb-4 ${activityLevel ? "" : "border-accent border-2"}`}
            >
              <option value={1.2}>Stillasittande (lite eller ingen träning)</option>
              <option value={1.375}>
                Lätt aktiv (lätt träning/sport 1-3 dagar/vecka)
              </option>
              <option value={1.55}>
                Måttligt aktiv (måttlig träning/sport 3-5 dagar/vecka)
              </option>
              <option value={1.725}>
                Mycket aktiv (hård träning/sport 6-7 dagar/vecka)
              </option>
              <option value={1.9}>
                Elit/idrottare (mycket hård träning, fysiskt jobb)
              </option>
            </select>

            <label htmlFor="goal" className="label-custom">
              Mål:
            </label>
            <select
              id="goal"
              value={goal}
              onChange={(e) => dispatch(setGoal(parseFloat(e.target.value)))}
              className={`block w-full border rounded p-2 mb-4 `}
            >
              <option value="-500">Gå ner i vikt</option>
              <option value="0">Hålla vikten</option>
              <option value="500">Gå upp i vikt</option>
            </select>

            <Button
              onClick={handleSave}
              className="w-full"
            >
              Spara
            </Button>
            <p
              className={`p-2 rounded m-2 ${errorMessage ? "border-2 border-accent" : ""}`}
            >
              {errorMessage}
            </p>

            {tdee !==0 && (
              <h2 className="text-lg mt-4 text-center">
                Ditt totala dagliga energibehov: <br />
                <span className="font-bold">{Math.round(tdee)} kcal</span>
              </h2>
            )}
          </form>
        </div>
        <div className="flex flex-col gap-4">
          <WeightList weightData={Array.isArray(weight) ? weight : []} />
        </div>
      </div>
    </main>
  );
};

export default ProfileForm;


