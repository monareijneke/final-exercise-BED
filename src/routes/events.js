import { Router } from "express";
import createEvent from "../services/events/createEvent.js";
import getEventById from "../services/events/getEventById.js";
import getEvents from "../services/events/getEvents.js";
import updateEventById from "../services/events/updateEvent.js";
import deleteEventById from "../services/events/deleteEvent.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", (req, res) => {
  const { title } = req.query;
  const events = getEvents(title);
  res.json(events);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const event = getEventById(id);

  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404).send({ message: `Event with id ${id} not found!` });
  }
});

router.post("/", authMiddleware, (req, res) => {
  const {
    createdBy,
    title,
    description,
    image,
    categoryIds,
    location,
    startTime,
    endTime,
  } = req.body;
  const newEvent = createEvent(
    createdBy,
    title,
    description,
    image,
    categoryIds,
    location,
    startTime,
    endTime
  );
  res.status(201).json(newEvent);
});

router.delete("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const event = deleteEventById(id);

  if (event) {
    res.status(200).send({ message: `Event with id${id} succesfully dleted` });
  } else {
    res.status(404).json({ message: `Event with id${id} not found!` });
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const {
    createdBy,
    title,
    description,
    image,
    categoryIds,
    location,
    startTime,
    endTime,
  } = req.body;
  const event = updateEventById(id, {
    createdBy,
    title,
    description,
    image,
    categoryIds,
    location,
    startTime,
    endTime,
  });

  if (event) {
    res.status(200).send({ message: `Event with id${id} succesfully updated` });
  } else {
    res.status(404).json({ message: `Event with ${id} not found!` });
  }
});
export default router;
