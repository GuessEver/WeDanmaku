import Activity from '../classes/activity'
import { HTTP } from 'meteor/cfs:http-methods'
import uuid from 'uuid'

Activity.extend({
  meteorMethods: {
    create (name, description) {
      this.name = name
      this.description = description
      this.token = uuid.v4()
      return this.save()
    },
    update (name, description) {
      this.name = name
      this.description = description
      return this.save()
    },
    resetToken () {
      this.token = uuid.v4()
      return this.save()
    },
    start () {
      this.startedAt = new Date()
      return this.save()
    },
    end () {
      this.endedAt = new Date()
      return this.save()
    },
    toggleAutoOnScreen () {
      this.autoOnScreen = !this.autoOnScreen
      return this.save()
    },
    toggleAutoOnDanmaku () {
      this.autoOnDanmaku = !this.autoOnDanmaku
      return this.save()
    }
  }
})
