import mongoose from 'mongoose'
require('mongoose-double')(mongoose)

mongoose.Promise = global.Promise
const SchemaTypes = mongoose.Schema.Types;

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false)

//  スキーマの作成
const EventSchema = new mongoose.Schema({
  event_id: Number,
  title: String,
  catch: String,
  description: String,
  event_url: String,
  hash_tag: String,
  started_at: Date,
  ended_at: Date,
  limit: Number,
  event_type: String,
  series_id: Number,
  series_title: String,
  series_url: String,
  address: String,
  Place: String,
  lat: SchemaTypes.Double,
  lon: SchemaTypes.Double,
  owner_id: Number,
  owner_nickname: String,
  owner_display_name: String,
  accepted: Number,
  waiting: Number,
  updated_at: Date,
  day_of_the_week: Number,
  event_category: String,
  area: String,
})

// モデルの作成
const Event = mongoose.model('Event', EventSchema)

export default Event