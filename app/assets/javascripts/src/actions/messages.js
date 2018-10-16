// actions/messages.js
import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    console.log('changeOpenChat')
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },

  // getの場合
  getMessages(openChatId) {
    // FIXME 初期IDの設定
    if ( openChatId == null ){
      var openChatId = 1
    }
    console.log('getMessages : action')
    return new Promise((resolve, reject) => {
      request
      .get('/api/messages') // FIXME APIEndpointsで書き換え
      .query({openChatId})
      .end((error, res) => {
        if (!error && res.status === 200) {
          console.log('getMessages : Action in if')
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGES,
            json,
          })
          console.log('getMessages success')
          console.log(json)
          resolve(json)
        } else {
          console.log('getMessages reject')
          reject(res)
        }
      })
    })
  },

  // postの場合
  sendMessage(openUserId, value) {
    const fromUserId = $("#current_user_id").attr('data');
    // openUserId > どのチャット画面に向かって送ったかを示す。openUserIdはチャットの相手、fromは自分がひもづく。
    return new Promise((resolve, reject) => {
      request
      .post('/api/messages')
      // .post(`${APIEndpoints.MESSAGES}`) // TODO APIEndpointsを使って定数に書き換え
      .set('X-CSRF-Token', CSRFToken())
      .send({ from: fromUserId,
              to: openUserId,
              contents: value,
              timestamp: new Date().getTime(), // 13桁のUNIX_timestamp
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const message = JSON.parse(res.text)
          const userId = openUserId
          debugger
          Dispatcher.handleServerAction({
            type: ActionTypes.SEND_MESSAGE,
            message,
            userId,
          })
        } else {
          reject(res)
        }
      })
    })
  },

  savePicture(openUserId, file) {
    const fromUserId = $("#current_user_id").attr('data');
    debugger
    return new Promise((resolve, reject) => {
      request
      .post('/api/messages')
      // .post(`${APIEndpoints.MESSAGES}/upload_image`)
      .set('X-CSRF-Token', CSRFToken())
      .attach( 'picture', file, file.name)
      .field('to', openUserId)
      .field('from', fromUserId)
      .field('contents', '')
      .field('timestamp', new Date().getTime())
      .end((error, res) => {
        if (!error && res.status === 200) {
          debugger
          let json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_PICTURE,
            image: file.name,
            openUserId,
            json,
          })
          resolve(json)
        } else {
          debugger
          reject(res)
        }
      })
    })
  },

}
