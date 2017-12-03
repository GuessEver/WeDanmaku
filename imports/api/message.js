import Message from '../classes/message'

Message.extend({
  meteorMethods: {
    toggleOnScreen () {
      if (!this.activity().isInProcess()) return
      this.onScreen = !this.onScreen
      return this.save()
    },
    toggleOnDanmaku () {
      if (!this.activity().isInProcess()) return
      this.onDanmaku = !this.onDanmaku
      return this.save()
    }
  }
})
