import BookedSeatsOfTimeslot from "../models/BookedSeatsOfTimeslot.js";










export const addMovieToTimeSlot = async (req, res) => {
  try {
    const { movie, posted_date, timeSlot } = req.body;
    //   const theaterId = req.params.theaterId;
    console.log(req.body)

    // Validate the request body
    //   if ( !movie || !posted_date ||!timeSlot || !Array.isArray(timeSlot) || timeSlot.length === 0) {
    //     return res.status(400).json({ error: 'Invalid request. Please provide all required fields.' });
    //   }

    // Iterate over each time slot and store data for it
    const timeSlotDocuments = [];
    for (let slot of timeSlot) {
      // Create a new time slot document
      const newTimeSlot = new BookedSeatsOfTimeslot({
        timeslot: slot,
        date: posted_date,
        movie: movie.id,
      });

      timeSlotDocuments.push(newTimeSlot);
    }
    console.log(timeSlotDocuments)

    // Save all time slot documents to the database
    await BookedSeatsOfTimeslot.insertMany(timeSlotDocuments);

    // Respond with a success message
    res.status(201).json({ message: 'Data stored in different time slots successfully' });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error storing data in different time slots:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};