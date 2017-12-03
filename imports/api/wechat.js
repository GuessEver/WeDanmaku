import Message from '../classes/message'
import Activity from '../classes/activity'
import sha1 from 'crypto-js/sha1'
import { HTTP } from 'meteor/cfs:http-methods'

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
const checkSignature = (signature = '', timestamp = '', nonce = '', token = '') => {
  let arr = [token, timestamp, nonce].sort()
  let hash = sha1(arr.join('')).toString()
  return signature === hash
}
HTTP.methods({
  '/api/activity/:_id/wechat': {
    get: function () { // wechat verify
      let activity = Activity.findOne(this.params._id)
      if (activity && checkSignature(this.query.signature, this.query.timestamp, this.query.nonce, activity.token)) {
        return this.query.echostr
      } else {
        return '微信 Signature 验证失败'
      }
    },
    post: function (data) {
      let activity = Activity.findOne(this.params._id)
      if (activity && checkSignature(this.query.signature, this.query.timestamp, this.query.nonce, activity.token)) {
        if (activity.isInProcess()) {
          let xml = data.toString()
          let message = new Message()
          message.activityId = activity._id
          message.sendedAt = new Date(+xmlData(xml, 'CreateTime') * 1000)
          message.openId = xmlData(xml, 'FromUserName')
          message.type = xmlData(xml, 'MsgType')
          message.content = xmlData(xml, 'Content')
          message.msgId = xmlData(xml, 'MsgId')
          message.onScreen = activity.autoOnScreen
          message.onDanmaku = activity.autoOnDanmaku
          message.save()
          return 'success'
        }
      } else {
        return '微信 Signature 验证失败'
      }
    }
  }
})
