import { Class } from 'meteor/jagi:astronomy'
import { Mongo } from 'meteor/mongo'
import Message from './message'
import uuid from 'uuid'

export const Activity = new Mongo.Collection('activity')

export default Class.create({
  name: 'Activity',
  collection: Activity,
  fields: {
    name: {
      type: String,
      validators: [
        { type: 'minLength', param: 2 },
        { type: 'maxLength', param: 20 }
      ]
    },
    description: {
      type: String,
      optional: true,
      validators: [
        { type: 'minLength', param: 2 },
        { type: 'maxLength', param: 50 }
      ]
    },
    startedAt: {
      type: Date,
      optional: true
    },
    endedAt: {
      type: Date,
      optional: true
    },
    token: {
      type: String,
      default: uuid.v4()
    },
    autoOnScreen: {
      type: Boolean,
      default: false
    },
    autoOnDanmaku: {
      type: Boolean,
      default: false
    }
  },
  helpers: {
    messages(options = {}) {
      return Message.find({ activityId: this._id }, options)
    },
    isStarted () {
      return !!this.startedAt
    },
    isInProcess () {
      return this.isStarted() && !this.isEnded()
    },
    isEnded () {
      return !!this.endedAt
    }
  },
  behaviors: {
    timestamp: {}
  }
})
