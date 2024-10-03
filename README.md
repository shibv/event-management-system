# Event Management System

This is an Event Management System built with Node.js, Express, and MongoDB. It allows users to create, join, and manage events, as well as handle user registrations. The system is designed with clean architecture principles, separating concerns into different layers.

## API Endpoints

### User Routes

- POST /users - Create a new user.
  - Controller: createUser

### Event Routes

- GET /events - Get all events.
  - Controller: getAllEvents
- POST /events - Create a new event.
  - Controller: createEvent
- POST /events/:id/join - Join an event.
  - Controller: joinEvent
- POST /events/:id/cancel - Cancel participation in an event.
  - Controller: cancelParticipation
- GET /events/:id/participants - Get participants of an event.
  - Controller: getEventParticipants

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/shibv/event-management-system
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables in the `.env` file.
     ```bash
   MONGO_URI= 
   PORT=
   ```

4. Run the application:
   ```bash
   npm run dev
   ```


## Screenshots 

### Create a new event
[![ss1.png](https://i.postimg.cc/hGgmD4Rr/ss1.png)](https://postimg.cc/DSj05TZJ)

### Create a new user
[![s2.png](https://i.postimg.cc/YSWtsYsD/s2.png)](https://postimg.cc/3y3My472)

### Join an Event
[![ss3.png](https://i.postimg.cc/RZt8rdvt/ss3.png)](https://postimg.cc/nXHTBvjV)

### Cancel participation in an event
[![ss4.png](https://i.postimg.cc/c4gkYhgz/ss4.png)](https://postimg.cc/56JmWwm5)

### Get participants of an event
[![ss5.png](https://i.postimg.cc/wv4FRR6H/ss5.png)](https://postimg.cc/S28cws2t)