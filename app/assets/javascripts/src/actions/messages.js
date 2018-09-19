// actions/messages.js
import Dispatcher from '../dispatcher'
import {ActionTypes} from '../constants/app' // 追記

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID, // 変更箇所
      userID: newUserID,
    })
  },
  // 追記
  sendMessage(userID, message) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SEND_MESSAGE, // 変更箇所
      userID: userID,
      message: message,
      timestamp: +new Date(),
    })
  },
}
