import { useState, useEffect } from "react";

const MARATHON_DISTANCE_MARKERS = [
  "Start",
  1,
  2,
  3,
  "5K",
  4,
  5,
  6,
  "10K",
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  "13.1",
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  "26.2",
];

const TIMES = MARATHON_DISTANCE_MARKERS.map((marker) => ({
  marker,
  time: null,
  checked: false,
}));

console.log("TIMES", TIMES);

// const MARKER_DATA = {};

// const MARKER_DATA = MARATHON_DISTANCE_MARKERS.map((marker) => ({
//   marker,
//   time: null,
// }));

// console.log("MARKER_DATA", MARKER_DATA);

// console.log(MARKER_DATA.keys());

export default function Distance() {
  console.log("* Before times state");

  const [times, setTimes] = useState(TIMES);

  console.log("times", times);

  console.log("* After times state");

  useEffect(() => {
    console.log("* Run once");

    const storedTimes = localStorage.getItem("times");

    console.log("times in local storage", storedTimes);

    if (storedTimes) {
      setTimes(JSON.parse(localStorage.getItem("times")));
    }
  }, []);

  function handleChange(index, value) {
    // TODO
    console.log("handleChanged", index, value);

    const changedItem = times[index];

    changedItem.checked = value;
    changedItem.time = new Date().toLocaleTimeString();

    if (value) {
      setTimes(Object.assign([], times, { [index]: changedItem }));

      localStorage.setItem("times", JSON.stringify(times));
    } else {
      if (confirm("Are you sure?")) {
        setTimes(Object.assign([], times, { [index]: changedItem }));

        localStorage.setItem("times", JSON.stringify(times));
      }
    }
  }

  function handleClear() {
    if (confirm("Are you sure?")) {
      // TODO
      setTimes(
        MARATHON_DISTANCE_MARKERS.map((marker) => ({
          marker,
          time: null,
          checked: false,
        }))
      );

      localStorage.removeItem("times");
    }
  }

  return (
    <>
      <div className="mt-4 px-4 text-3xl font-bold">Distance</div>
      <div className="px-4">
        {/* {MARKER_DATA.map((item, index) => ( */}
        {times &&
          times.map((item, index) => (
            <div
              className="flex justify-between items-center mt-4 text-lg"
              key={`marker-${index}`}
            >
              <div className="w-1/3">
                <strong>{item.marker}</strong>
              </div>
              <span>{item.time ? item.time : "None"}</span>
              <input
                className="w-10 h-10"
                type="checkbox"
                // TODO
                // value={true}
                checked={item.checked}
                onChange={(event) => handleChange(index, event.target.checked)}
              />
            </div>
          ))}
        <button
          className="my-4 w-full px-4 py-2 rounded bg-transparent hover:bg-blue-500 text-lg text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </>
  );
}
