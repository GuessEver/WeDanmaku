import { Meteor } from 'meteor/meteor'
import Activity from '../model/Activity'

if (Meteor.isServer) {
  Meteor.publish('activity', () => Activity.find())
}

Meteor.methods({
  'activity.create' (name, description) {
    let activity = new Activity({
      name, description
    })
    activity.validate()
    activity.save()
  },
  'activity.update' (activityId, name, description) {
    let activity = Activity.findOne(activityId)
    activity.name = name
    activity.description = description
    activity.save()
  },
  'activity.start' (activityId) {
    let activity = Activity.findOne(activityId)
    activity.startedAt = new Date()
    activity.save()
  },
  'activity.end' (activityId) {
    let activity = Activity.findOne(activityId)
    activity.endedAt = new Date()
    activity.save()
  }
})
