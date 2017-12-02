import { Class } from 'meteor/jagi:astronomy'
import { Mongo } from 'meteor/mongo'
import Activity from './activity'

export const Message = new Mongo.Collection('message')

export default Class.create({
  name: 'Message',
  collection: Message,
  fields: {
    activityId: {
      type: String
    },
    sendedAt: { // CreateTime
      type: Date,
      optional: true
    },
    openId: { // FromUserName
      type: String,
      optional: true
    },
    type: { // MsgType
      type: String,
      default: 'text'
    },
    content: { // Content
      type: String
    },
    msgId: { // MsgId
      type: String,
      optional: true
    },
    onScreen: {
      type: Boolean,
      default: false
    },
    onDanmaku: {
      type: Boolean,
      default: false
    }
  },
  helpers: {
    activity () {
      return Activity.findOne(this.activityId)
    }
  },
  behaviors: {
    timestamp: {}
  }
})
