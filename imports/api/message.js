import Message from '../classes/message'
import Activity from '../classes/activity'

Message.extend({
  meteorMethods: {
    toggleOnScreen () {
      this.onScreen = !this.onScreen
      return this.save()
    },
    toggleOnDanmaku () {
      this.onDanmaku = !this.onDanmaku
      return this.save()
    }
  }
})


const xmlData = (xml, key) => {
  let reg = RegExp(`<${key}>((.|\n)*?)<\/${key}>`)
  let res = reg.exec(xml)
  if (res && res[1]) {
    let cdata = res[1].match(/<!\[CDATA\[((.|\n)*?)\]\]>/)
    if (cdata && cdata[1]) {
      return cdata[1]
    } else {
      return res[1]
    }
  } else {
    return ''
  }
}

HTTP.methods({
  '/api/activity/:_id/wechat': {
    post: function (data) {
      let activity = Activity.findOne(this.params._id)
      if (activity) {
        let xml = data.toString()
        let message = new Message()
        message.activityId = activity._id
        message.sendedAt = new Date(xmlData(xml, 'CreateTime') + '000')
        message.openId = xmlData(xml, 'FromUserName')
        message.type = xmlData(xml, 'MsgType')
        message.content = xmlData(xml, 'Content')
        message.msgId = xmlData(xml, 'MsgId')
        message.onScreen = activity.autoOnScreen
        message.onDanmaku = activity.autoOnDanmaku
        message.save()
      } else {
        this.setStatusCode(404)
      }
    }
  }
})
