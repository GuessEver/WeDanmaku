import '../imports/api/activity'
import '../imports/api/message'
import '../imports/api/wechat'

import Activity from '../imports/classes/activity'
import Message from '../imports/classes/message'

Meteor.publish('activity', () => Activity.find())
Meteor.publish('message', (activityId) => Message.find({ activityId }))
