import { useState, useEffect } from "react";

export default function Fuel() {
  const TYPE_EVENT = "event";
  const TYPE_EVENT_WITH_QTY = "event_with_qty";

  // TODO: Temporary
  const EVENTS = [
    { name: "Maurten Drink Mix 320 CAF 320", type: TYPE_EVENT_WITH_QTY },
    { name: "Flow Alkaline Spring Water", type: TYPE_EVENT_WITH_QTY },
    {
      // name: "Gatorade® Endurance Formula™ (Lemon-Lime)",
      name: "Gatorade® (Lemon-Lime)",
      type: TYPE_EVENT_WITH_QTY,
    },
    { name: "Maurten GEL 100", type: TYPE_EVENT },
    { name: "Maurten GEL 100 CAF 100", type: TYPE_EVENT },
    { name: "NEVERSECOND C30 Citrus", type: TYPE_EVENT },
    { name: "NEVERSECOND C30 Berry", type: TYPE_EVENT },
  ];

  const [timelineItems, setTimelineItems] = useState([]);
  // TODO
  const [timelineEventQuantities, setTimelineEventQuantities] = useState(
    EVENTS.filter((event) => event.type === TYPE_EVENT_WITH_QTY).map(
      (event) => {
        if (event.type === TYPE_EVENT_WITH_QTY) {
          return { name: event.name, qty: 0 };
        }
      }
    )
  );

  // console.log("timelineEventQuantities", timelineEventQuantities);

  useEffect(() => {
    setTimelineItems(JSON.parse(localStorage.getItem("timeline")));
  }, []);

  function handleEvent(name) {
    const now = new Date();
    const newTimeline = [
      ...(timelineItems || []),
      { name, date: now.toISOString(), time: now.toLocaleTimeString() },
    ];

    setTimelineItems((timelineItems) => newTimeline);

    localStorage.setItem("timeline", JSON.stringify(newTimeline));

    // console.log(localStorage.getItem("timeline"));
  }

  function handleClear() {
    if (confirm("Are you sure?")) {
      setTimelineItems([]);

      localStorage.removeItem("timeline");
    }
  }

  return (
    <>
      <div className="mt-4 px-4 text-3xl font-bold">Fuel</div>
      <div className="px-4">
        {timelineItems && timelineItems.length
          ? timelineItems.map(function (element, index) {
              return (
                <div className="mt-4 text-lg" key={`item-${index}`}>
                  <strong>{index + 1}</strong> - {element.name} - {element.date}
                  , <strong>{element.time}</strong>
                </div>
              );
            })
          : "No items"}
      </div>
      <div className="mt-4 px-4">
        {EVENTS.map(function (element, index) {
          const type = element.type;
          const name = element.name;

          // TODO
          // if (type === TYPE_EVENT) {
          return (
            <button
              className="mt-4 w-full px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold"
              onClick={() => handleEvent(name)}
              key={`event-${index}`}
            >
              {name}
            </button>
          );
          /*
            } else if (type === TYPE_EVENT_WITH_QTY) {
              return (
                <div key={`event-${index}`}>
                  <button
                    className="mt-4 mx-4 px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white font-bold"
                    onClick={() => handleEvent(name)}
                  >
                    {name}
                  </button>
                  <a href="#" onClick={() => handleDecrementEventQty(index)}>
                    -
                  </a>
                  <span>0</span>
                  <a href="#" onClick={() => handleIncrementEventQty(index)}>
                    +
                  </a>
                </div>
              );
            }
            */
        })}
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
