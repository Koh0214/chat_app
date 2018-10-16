// actions/messages.js
import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, CSRFToken} from '../constants/app'

export default {
  // postの場合
  createFriendship(toUserId, fromUserId) {
    debugger
    return new Promise((resolve, reject) => {
      request
      .post('/api/friendships')
      // .post(`${APIEndpoints.FRIENDSHIPS}`) // TODO APIEndpointsを使って定数に書き換え
      .set('X-CSRF-Token', CSRFToken())
      .send({ to_user_id: toUserId,
              from_user_id: fromUserId,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          // debugger
          const message = JSON.parse(res.text)
          // const userId = openUserId
          Dispatcher.handleServerAction({
            type: ActionTypes.SEND_MESSAGE,
            message,
            // userId
          })
        } else {
          // debugger
          reject(res)
        }
      })
    })
  },
}
