import { Router } from "express";
import createEvent from "../services/events/createEvent.js";
import getEventById from "../services/events/getEventById.js";
import getEvents from "../services/events/getEvents.js";
import updateEventById from "../services/events/updateEvent.js";
import deleteEventById from "../services/events/deleteEvent.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { title } = req.query;
    const events = await getEvents(title);
    res.json(events);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await getEventById(id);

    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).send({ message: `Event with id ${id} not found!` });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
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
    const newEvent = await createEvent(
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
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await deleteEventById(id);

    if (event) {
      res
        .status(200)
        .send({ message: `Event with id${id} succesfully dleted` });
    } else {
      res.status(404).json({ message: `Event with id${id} not found!` });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
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
    const event = await updateEventById(id, {
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
      res
        .status(200)
        .send({ message: `Event with id${id} succesfully updated` });
    } else {
      res.status(404).json({ message: `Event with ${id} not found!` });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
