const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, default: 5 },
  avatar: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);