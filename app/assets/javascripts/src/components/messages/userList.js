import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import Utils from '../../utils'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/users'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/users'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    console.log('constructor : userList')
    UsersAction.getUsers()
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    console.log('getStateFromStore : userList')

    const allUsers = UserStore.getUsers()

    return {
      openChatID: MessagesStore.getOpenChatUserID(),
      users: allUsers
    }
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  changeOpenChat(openChatId) {
    MessagesAction.changeOpenChat(openChatId)
    // FIXME currentUserIdを含めて、どのメッセージを取得してくるか考える
    const currentUserId = parseInt($("#current_user_id").attr('data'), 10)
    MessagesAction.getMessages(openChatId)
  }

  render() {
    console.log(this.state)
    // this.state.usersは取れている。
    // this.state.messageList.sort((a, b) => {
    //   if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
    //     return -1
    //   }
    //   if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
    //     return 1
    //   }
    //   return 0
    // })

    const users = this.state.users.map((user, index) => {
      // const date = Utils.getNiceDate(message.lastMessage.timestamp)

      // var statusIcon
      // if (message.lastMessage.from !== message.user.id) {
      //   statusIcon = (
      //     <i className='fa fa-reply user-list__item__icon' />
      //   )
      // }
      // if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
      //   statusIcon = (
      //     <i className='fa fa-circle user-list__item__icon' />
      //   )
      // }

      // var isNewMessage = false
      // if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
      //   isNewMessage = message.lastMessage.from !== UserStore.user.id
      // }

      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        // 'user-list__item--new': isNewMessage,
        'user-list__item--active': this.state.openChatID === user.id,
      })

      return (
        <li
          onClick={ this.changeOpenChat.bind(this, user.id) }
          className={ itemClasses }
          key={ user.id }
        >
          <div className='user-list__item__picture'>
            <img src={ 'http://www.officiallyjd.com/wp-content/uploads/2018/07/20180703_ayase_21.jpg' } />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { user.id }：{ user.name }
              <abbr className='user-list__item__timestamp'>
              </abbr>
            </h4>
            <span className='user-list__item__message'>
            </span>
          </div>
        </li>
      )
    }, this)

    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          { users }
        </ul>
      </div>
    )
  }
}

export default UserList
