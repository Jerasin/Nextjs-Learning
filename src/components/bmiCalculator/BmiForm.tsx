"use client";
import { useState, useEffect } from "react";

import Height from "./Height";
import Weight from "./Weight";
import ResultCard from "./ResultCard";

const BmiForm = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState("");

  const handleReset = (e: any) => {
    e.preventDefault();
    setHeight(0);
    setWeight(0);
    setBmi(0);
    setCategory("");
  };

  useEffect(() => {
    if (height > 0 && weight > 0) {
      const calculatedBmi = parseInt(
        (weight / ((height / 100) * (height / 100))).toFixed(1)
      );

      console.log("Calculated BMI:", calculatedBmi);
      setBmi(calculatedBmi);

      if (calculatedBmi < 18.5) {
        setCategory("Underweight");
      } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
        setCategory("Normal weight");
      } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
        setCategory("Overweight");
      } else if (calculatedBmi >= 30) {
        setCategory("Obesity");
      }
    } else {
      setBmi(0);
      setCategory("-");
    }
  }, [height, weight]);

  return (
    <form className="mx-auto grid max-w-6xl gap-y-5 lg:grid-cols-2 lg:gap-x-8">
      <div className="flex flex-col gap-y-8 py-5 lg:px-5 lg:py-6">
        <Height height={height} setHeight={setHeight} />
        <Weight weight={weight} setWeight={setWeight} />
      </div>

      <ResultCard bmi={bmi} category={category} reset={handleReset} />
    </form>
  );
};

export default BmiForm;
