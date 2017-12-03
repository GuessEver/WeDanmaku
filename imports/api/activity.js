import Activity from '../classes/activity'
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
      if (this.isEnded()) return
      this.name = name
      this.description = description
      return this.save()
    },
    resetToken () {
      if (this.isEnded()) return
      this.token = uuid.v4()
      return this.save()
    },
    start () {
      if (this.isStarted()) return
      this.startedAt = new Date()
      return this.save()
    },
    end () {
      if (!this.isInProcess()) return
      this.endedAt = new Date()
      return this.save()
    },
    toggleAutoOnScreen () {
      if (this.isEnded()) return
      this.autoOnScreen = !this.autoOnScreen
      return this.save()
    },
    toggleAutoOnDanmaku () {
      if (this.isEnded()) return
      this.autoOnDanmaku = !this.autoOnDanmaku
      return this.save()
    }
  }
})
