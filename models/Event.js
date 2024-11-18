const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    key: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    doe: { type: String, required: true },
    desc: { type: String, required: true },
    isLive: { type: Boolean, default: false },
    bannerLink: { type: String, required: true },
    regLink: { type: String, default: '' },
    photosLink: { type: [String], default: [] },
    winners: { type: [String], default: [] }
});

module.exports = mongoose.model('Event', EventSchema);
