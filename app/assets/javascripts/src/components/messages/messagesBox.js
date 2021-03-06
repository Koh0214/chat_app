import React from 'react'
import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'
// import UserStore from '../../stores/users'
import MessagesStore from '../../stores/messages'
import Utils from '../../utils'
import MessagesAction from '../../actions/messages'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    console.log('constructor : messagesBox')
    MessagesAction.getMessages()
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    console.log('getStateFromStore : messageBox')
    console.log(MessagesStore.getMessages())
    return {messages: MessagesStore.getMessages()}
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    console.log(this.getStateFromStore())
    this.setState(this.getStateFromStore())
  }
  render() {
    const messagesLength = this.state.messages.length
    console.log("current_user.id : " + $("#current_user_id").attr('data'))
    const currentUserId = parseInt($("#current_user_id").attr('data'), 10)

    const messages = this.state.messages.map((message, index) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.from === currentUserId,
        'clear': true,
      })

      return (
          <li key={ message.timestamp + '-' + message.from } className={ messageClasses }>
            { message.picture.url == null &&
              <div className='message-box__item__contents'>
                { message.contents }
                <img className='message__picture' src={ message.picture.url } />
              </div>
            }
            { message.picture.url != null &&
              <div className='message-box__item__contents'>
                <img className='message__picture' src={ message.picture.url } />
              </div>
            }
          </li>
        )
    })

    // const lastMessage = this.state.messages[messagesLength - 1]

    // if (lastMessage.from === currentUserId) {
      // if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
      //   const date = Utils.getShortDate(lastMessage.timestamp)
      //   messages.push(
      //       <li key='read' className='message-box__item message-box__item--read'>
      //         <div className='message-box__item__contents'>
      //           Read { date }
      //         </div>
      //       </li>
      //     )
      // }
    // }
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages }
          </ul>
          <ReplyBox />,
        </div>
      )
  }
}

export default MessagesBox
