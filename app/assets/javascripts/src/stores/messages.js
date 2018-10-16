// stores/messages.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import UserStore from '../stores/users'
import {ActionTypes} from '../constants/app'
// import MessagesAction from '../actions/messages'

var messages = {
  1: {
    user: {
      profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
      id: 2,
      name: 'Ryan Clarkkkkk',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424469794050,
      currentUser: 1424469794080,
    },
    messages: [
      {
        contents: 'WWWWWWWWWWWWWWWWWWWWant as game of ping pongggggggg11111111111ggggggggggggggggggggggggggggg?',
        from: 3,
        timestamp: 1424352522000,
      },
    ],
  },
  3: {
    user: {
      read: true,
      profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
      name: 'Jilles Soeters',
      id: 3,
      status: 'online',
    },
    lastAccess: {
      recipient: 1424992522000,
      currentUser: 1424352522080,
    },
    messages: [
      {
        contents: 'Want as game of ping pongggggggggggg?',
        from: 3,
        timestamp: 1424352522000,
      },
      {
        contents: 'plaaaaaaaaaaaaaaaaaaaaeeeeeeeeeeeeeeeease reply me!!!!!',
        from: 3,
        timestamp: 1424352522001,
      },
    ],
  },
}

// FIXME openChatIDの初期値を設定
var openChatID = parseInt(Object.keys(messages)[0], 10)


class ChatStore extends BaseStore {
  addChangeListener(callback) {
    console.log('addChangeListnerInStores')
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getOpenChatUserID() {
    return openChatID
  }
  getChatByUserID(id) {
    console.log('getChatByUserIDInStores')
    return messages[id]
  }
  getAllChats() {
    console.log('getAllChatInStores')
    return messages
  }
  updateOpenChatUserId(openChatID){
    var openChatID = openChatID
  }

  getMessages() {
    console.log('getMessagesInStores')
    if (!this.get('messages')) this.setMessages([])
    console.log(this.get('messages'))
    return this.get('messages')
  }

   setMessages(array) {
     console.log('setMessagesInStores')
     this.set('messages', array)
   }

}
const MessagesStore = new ChatStore()

// stores/messages.js
MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      console.log('UPDATE_OPEN_CHAT_ID')
      openChatID = action.userID
      // messages[openChatID].lastAccess.currentUser = +new Date() // 追記
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.SEND_MESSAGE:
      console.log('SEND_MESSAGE')
      // userIdはその時に開いていたチャットの相手のid
      const userId = action.userId
      MessagesStore._storage.messages.push({
        contents: action.message.contents,
        timestamp: action.message.timestamp,
        from: action.message.from,
        picture: { url: null },
      })
      // messages[userId].lastAccess.currentUser = +new Date()
      MessagesStore.emitChange()
      break

    case ActionTypes.GET_MESSAGES:
      console.log('GET_MESSAGE')
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_PICTURE:
      console.log('SAVE_PICTURE')
      MessagesStore._storage.messages.push({
        timestamp: action.json.timestamp,
        from: action.json.from,
        to: action.json.to,
        picture: { url: action.json.picture.url },
      })
      // messages[userId].lastAccess.currentUser = +new Date()
      MessagesStore.emitChange()
      break
  }

  return true
})
export default MessagesStore
