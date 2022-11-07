import { useState, useEffect } from "react";

import Fuel from "./Fuel";
import Distance from "./Distance";

import styles from "../styles/Timeline.module.scss";

export default function Timeline() {
  const [currentTab, setCurrentTab] = useState(0);

  const TABS = [Fuel, Distance];

  function renderTab() {
    const Component = TABS[currentTab];

    return <Component />;
  }

  // console.log("timelineEventQuantities", timelineEventQuantities);

  // useEffect(() => {
  //   setTimelineItems(JSON.parse(localStorage.getItem("timeline")));
  // }, []);

  function handleNavClick(num) {
    setCurrentTab(num - 1);
  }

  // function handleEvent(name) {
  //   const now = new Date();
  //   const newTimeline = [
  //     ...(timelineItems || []),
  //     { name, date: now.toISOString(), time: now.toLocaleTimeString() },
  //   ];

  //   setTimelineItems((timelineItems) => newTimeline);

  //   localStorage.setItem("timeline", JSON.stringify(newTimeline));

  //   // console.log(localStorage.getItem("timeline"));
  // }

  // function handleIncrementEventQty(index) {
  //   console.log("handleIncrementEventQty", index);

  //   timelineEventQuantities.findIndex((event) => {
  //     // TODO
  //   });
  // }

  // function handleDecrementEventQty(index) {
  //   // TODO
  //   console.log("handleDecrementEventQty", index);
  // }

  // function handleClear() {
  //   if (confirm("Are you sure?")) {
  //     setTimelineItems([]);

  //     localStorage.removeItem("timeline");
  //   }
  // }

  return (
    <>
      <div className={styles.container}>
        <div className="flex items-center justify-center mt-2">
          <div
            className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
            role="group"
          >
            <button
              type="button"
              className="rounded-l inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-base leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
              onClick={() => handleNavClick(1)}
            >
              Fuel
            </button>
            <button
              type="button"
              className="rounded-r inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-base leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
              onClick={() => handleNavClick(2)}
            >
              Distance
            </button>
          </div>
        </div>
        <div className="w-full">{renderTab()}</div>
      </div>
    </>
  );
}
