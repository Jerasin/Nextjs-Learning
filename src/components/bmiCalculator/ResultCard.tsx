import { useState } from "react";

interface ResultCardInterface {
  bmi: number;
  category: string;
  reset: Function;
}

const ResultCard = (props: ResultCardInterface) => {
  const { bmi, category, reset } = props;

  const data = [
    {
      label: "Your BMI is",
      value: bmi,
    },
    {
      label: "Result:",
      value: category,
    },
  ];

  return (
    <div
      className="flex flex-col justify-between rounded-xl 
bg-[#FFC436] p-5 lg:py-10"
    >
      <div className="flex flex-col gap-y-8">
        {data.map((item, i) => (
          <div key={i} className="flex items-end justify-between">
            <div>
              <p
                className="text-[#3C4048] text-lg 
font-bold"
              >
                {item.label}
              </p>
            </div>
            <div className="flex items-baseline gap-x-2">
              <span className="text-2xl font-bold text-[#3C4048]">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="mt-14 w-full rounded-md bg-[#FFFADD] px-3.5 
py-2.5 text-lg font-semibold uppercase text-black shadow-sm 
hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 
focus-visible:outline-offset-4 focus-visible:outline-white"
        onClick={(e) => reset(e)}
      >
        Reset BMI
      </button>
    </div>
  );
};

export default ResultCard;
