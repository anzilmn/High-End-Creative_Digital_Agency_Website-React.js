const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  industry: { type: String, required: true },
  challenge: { type: String, required: true },
  solution: { type: String, required: true },
  results: [String],
  image: { type: String, default: '' },
  tags: [String],
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('CaseStudy', caseStudySchema);