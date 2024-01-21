import eventsData from "../../data/events.json" assert { type: "json" };

const getEvents = title => {
  return eventsData.events.filter(event => {
    return !title || event.title === title;
  });
};

export default getEvents;
