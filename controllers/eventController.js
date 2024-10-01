import Event from '../models/eventModel.js';

// Create an event
export const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, time, location, maxParticipants } = req.body;
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      maxParticipants,
      confirmedParticipants: [],
      waitlist: [],
    });
    const createdEvent = await event.save();
    return res.status(201).json(createdEvent);
  } catch (error) {
    next(error);
  }
};

// Join an event
export const joinEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    const userId = req.body.userId;

    if (event.confirmedParticipants.length < event.maxParticipants) {
      event.confirmedParticipants.push(userId);
    } else {
      event.waitlist.push(userId);
    }

    await event.save();
    return res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

// Cancel participation
export const cancelParticipation = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    const userId = req.body.userId;

    event.confirmedParticipants = event.confirmedParticipants.filter((p) => p.toString() !== userId);

    if (event.waitlist.length > 0) {
      const nextInLine = event.waitlist.shift();
      event.confirmedParticipants.push(nextInLine);
    }

    await event.save();
    return res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};
