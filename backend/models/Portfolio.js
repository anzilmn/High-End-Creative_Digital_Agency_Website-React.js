const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['UI', 'Branding', 'Development', 'Motion'], required: true },
  image: { type: String, default: '' },
  tags: [String],
  link: { type: String, default: '' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);