import React from 'react'
import Header from './header'
import UserList from './userList'
import MessagesBox from './messagesBox'
// import MessagesStore from '../../stores/messages'
// import MessagesAction from '../../actions/messages'

class App extends React.Component {
  render() {
    return (
        <div className='app'>
          <Header />
          <UserList />
          <MessagesBox />
        </div>
      )
  }
}

export default App
