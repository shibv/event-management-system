// controllers/eventController.js

import Event from '../models/eventModel.js';
import { errorResponse } from '../utils/errorResponse.js';


// get all the details 
export const getAllEvents = async(req, res) => {
  try {
      const eventList = await Event.find();

      if(!eventList || eventList.length <= 0 ){
        return next(errorResponse(400, 'No events found.'));
      }
      return res.status(200).json(eventList);
  } catch (error) {
    next(error);
  }
}

// Create an event
export const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, time, location, maxParticipants } = req.body;

    // Validate required fields
    if (!title || !date || !time || !location || !maxParticipants) {
      return next(errorResponse(400, 'All fields (title, date, time, location, maxParticipants) are required.'));
    }

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

    if (!event) {
      return next(errorResponse(404, 'Event not found.'));
    }

    const { userId } = req.body;

    if (!userId) {
      return next(errorResponse(400, 'User ID is required.'));
    }

    // Check if user is already in the confirmed list
    if (event.confirmedParticipants.includes(userId)) {
      return next(errorResponse(400, 'User is already confirmed for the event.'));
    }

    // Check if user is already in the waitlist
    if (event.waitlist.includes(userId)) {
      return next(errorResponse(400, 'User is already in the waitlist for the event.'));
    }

    // Add user to confirmed list or waitlist based on availability
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

    if (!event) {
      return next(errorResponse(404, 'Event not found.'));
    }

    const { userId } = req.body;

    if (!userId) {
      return next(errorResponse(400, 'User ID is required.'));
    }

    // Check if the user is in the confirmed participants
    if (!event.confirmedParticipants.includes(userId)) {
      return next(errorResponse(400, 'User is not in the confirmed participants list.'));
    }

    // Remove user from confirmed participants
    event.confirmedParticipants = event.confirmedParticipants.filter((p) => p.toString() !== userId);

    // Move the first user from the waitlist to confirmed participants, if any
    if (event.waitlist.length > 0) {
      const nextInLine = event.waitlist.shift();
      event.confirmedParticipants.push(nextInLine);
    }

    await event.save();
    return res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};



// confirmed list , waitlist  
export const getEventParticipants = async(req, res, next) => {
  try {
      const eventId = req.params.id;
      const event = await Event.findById(eventId)
      .populate('confirmedParticipants', 'name') // Populate the 'name' field of confirmed participants
      .populate('waitlist', 'name');
                      

      if(!event){
        return next(errorResponse(400, "Event not found"));
      }

      return res.status(200).json({confirmedParticipants: event.confirmedParticipants,
        waitlist: event.waitlist});
  } catch (error) {
    next(error);
  }
}