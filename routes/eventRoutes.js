const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Add a new event
router.post('/add', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json({ message: 'Event added successfully', event });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ key: 1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an event
// Update an event by 'key'
router.put('/update/:key', async (req, res) => {
    try {
        // Ensure that the body contains all the necessary fields
        const { key, name, doe, desc, bannerLink, regLink, photosLink, winners, isLive } = req.body;

        // Validate that the required fields are present in the body
        if (!key || !name || !doe || !desc || !bannerLink || !regLink || !photosLink || !winners || isLive === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Find and update the event by 'key'
        const updatedEvent = await Event.findOneAndUpdate({ key: req.params.key }, req.body, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event updated successfully', updatedEvent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Delete an event
router.delete('/delete/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/:key', async (req, res) => {
    try {
        const event = await Event.findOne({ key: req.params.key });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
