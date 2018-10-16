import React from 'react'
import UserList from './userList'
import UsersAction from '../../actions/users'
import Header from '../messages/header'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      searchWord: '',
    }
  }

  searchUser(e) {
    const searchWord = e.target.value
    this.setState({
      searchWord,
    })
    UsersAction.searchUsers(searchWord)
  }

  render() {
    const {searchWord} = this.state
    return (
      <div className='search'>
        <Header />
        <div className='chatapp-logo text-center font-weight-bold'>
          <span className='logo-c'>C</span>
          <span className='logo-h'>h</span>
          <span className='logo-a'>a</span>
          <span className='logo-t'>t</span>
          <span className='logo-A'>A</span>
          <span className='logo-p'>p</span>
          <span className='logo-p2'>p</span>
        </div>
        <input
          type='text'
          className='search_form mx-auto d-block'
          value={searchWord}
          onChange={this.searchUser.bind(this)}
          placeholder='検索する名前を入れてくださいー！'
        />
        <UserList {...this.state} />
      </div>
    )
  }
}
