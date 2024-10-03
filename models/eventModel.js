import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  time: {
    type: String,
    required: [true, 'Event time is required'],
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
  },
  maxParticipants: {
    type: Number,
    required: [true, 'Maximum number of participants is required'],
    min: [1, 'There must be at least one participant'],
  },
  confirmedParticipants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  waitlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true, 
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
