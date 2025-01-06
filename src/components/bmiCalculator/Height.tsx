import { Dispatch, SetStateAction } from "react";

interface HeightInterface {
  height: number;
  setHeight: Dispatch<SetStateAction<number>>;
}

const Height = (props: HeightInterface) => {
  const { height, setHeight } = props;

  return (
    <div>
      <label
        htmlFor="height"
        className="block font-serif text-lg font-light leading-6 text-gray-800"
      >
        Height
      </label>

      <div className="relative mt-2 rounded-md shadow-sm">
        <div
          className="pointer-events-none absolute inset-y-0 right-6 
flex items-center pl-3"
        >
          <span className="text-gray-500 sm:text-sm">Cm</span>
        </div>

        <input
          type="number"
          name="height"
          id="height"
          className="block w-full rounded-md border-0 py-1.5 pl-5 pr-2 
text-gray-900 outline-none ring-1 ring-inset ring-gray-300 
placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
focus:ring-cyan-500 sm:text-sm sm:leading-6"
          placeholder="0.00"
          aria-describedby="height"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Height;
