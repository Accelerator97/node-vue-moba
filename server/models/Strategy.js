const mongoose = require('mongoose')

const strategySchema = new mongoose.Schema({
  title: { type: String },
  url: { type: String },
  img: { type: String },
  play_volume: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  hero: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Strategy', strategySchema,'strategies')