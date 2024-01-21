import eventData from "../../data/events.json" assert { type: "json" };

const updateEventById = (id, updatedEvent) => {
  const eventIndex = eventData.events.findIndex(event => event.id === id);

  if (eventIndex === -1) {
    return null;
  }

  const {
    createdBy,
    title,
    description,
    image,
    categoryIds,
    location,
    startTime,
    endTime,
  } = updatedEvent;

  eventData.events[eventIndex] = {
    ...eventData.events[eventIndex],
    createdBy: createdBy || eventData.events[eventIndex].createdBy,
    title: title || eventData.events[eventIndex].title,
    description: description || eventData.events[eventIndex].description,
    image: image || eventData.events[eventIndex].image,
    categoryIds: categoryIds || eventData.events[eventIndex].categoryIds,
    location: location || eventData.events[eventIndex].location,
    startTime: startTime || eventData.events[eventIndex].startTime,
    endTime: endTime || eventData.events[eventIndex].endTime,
  };
  return eventData.events[eventIndex];
};

export default updateEventById;
