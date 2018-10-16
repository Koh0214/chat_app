// stores/messages.js
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from '../stores/user' // 追記
import {ActionTypes} from '../constants/app'
// import MessagesAction from '../actions/messages' // 追記

var messages = {
  2: {
    user: {
      profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
      id: 2,
      name: 'Ryan Clark',
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
      recipient: 1424352522000,
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

var openChatID = parseInt(Object.keys(messages)[0], 10)

class ChatStore extends BaseStore {
  addChangeListener(callback) {
    console.log('addChangeListnerInStores')
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    console.log('removeChangeListenerInStores')
    this.off('change', callback)
  }
  getOpenChatUserID() {
    console.log('getOpenChatUserIDInStores')
    return openChatID
  }
  getChatByUserID(id) {
    console.log('getChatByUserIDInStores')
    return messages[id]
  }
  getAllChats() {
    console.log('getAllChatInStores')
    // console.log(messages['2'])
    return messages
  }

  getMessages() {
    console.log('getMessagesInStores')
    debugger
    if (!this.get('messages')) this.setMessages([{'id':1,'contents':'初期値 aesop asesop aesop!','from':2,'timestamp':1424469793099,'created_at':'2018-09-20T04:09:11.458Z','updated_at':'2018-09-21T15:21:15.126Z'}, {'id':2,'contents':'ahahahahahaha!','from':2,'timestamp':1424469793100,'created_at':'2018-09-21T05:15:48.116Z','updated_at':'2018-09-21T15:37:51.304Z'}])
    debugger
    console.log(this.get('messages'))
    return this.get('messages')
  }

   setMessages(array) {
     console.log('setMessagesInStores')
     console.log(array)
     debugger
     this.set('messages', array)
     debugger
   }

}
const MessagesStore = new ChatStore()

// stores/messages.js
MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    // MessageActionの方で、どのアクションとして送るかによって呼ばれるものが決まる。
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      console.log('UPDATE_OPEN_CHAT_ID')
      openChatID = action.userID
      messages[openChatID].lastAccess.currentUser = +new Date() // 追記
      MessagesStore.setMessages(action.json) // getMessagesで取得したjsonをセッターを利用して保存しています。
      MessagesStore.emitChange()
      break

    case ActionTypes.SEND_MESSAGE:
      console.log('SEND_MESSAGE')
      console.log(action)
      debugger
      // userIdはその時に開いていたチャットの相手のid
      const userId = action.userId
      MessagesStore._storage.messages.push({
        contents: action.message.contents,
        timestamp: action.message.timestamp,
        from: action.message.from
      })
      messages[userId].lastAccess.currentUser = +new Date() // 追記
      debugger
      MessagesStore.emitChange()
      break

    case ActionTypes.GET_MESSAGES: // 上のapi通信で使用したgetMessagesアクションを受け取っているとします。
      console.log('GET_MESSAGE')
      // ここではいい感じに取得しているっぽい？
      console.log(action.json)
      debugger
      MessagesStore.setMessages(action.json) // getMessagesで取得したjsonをセッターを利用して保存しています。
      debugger
      MessagesStore.emitChange()
      break
  }

  return true
})
export default MessagesStore
