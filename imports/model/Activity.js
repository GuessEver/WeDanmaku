import { Mongo } from 'meteor/mongo'
import { Class } from 'meteor/jagi:astronomy'

export const Activity = new Mongo.Collection('activity')
export default Class.create({
  name: 'Activity',
  collection: Activity,
  fields: {
    name: String,
    description: String,
    startedAt: Date,
    endedAt: Date
  },
  behaviors: {
    timestamp: {}
  }
})
