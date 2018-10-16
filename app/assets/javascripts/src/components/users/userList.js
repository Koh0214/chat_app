import _ from 'lodash'
import React from 'react'
import UsersStore from '../../stores/users'
import FriendshipsAction from '../../actions/friendships'

export default class UserList extends React.Component {
  static get propTypes() {
    return {
      searchString: React.PropTypes.string,
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    console.log(UsersStore.getUsers())
    return {users: UsersStore.getUsers()}
  }

  componentDidMount() {
    UsersStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UsersStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  createFriendship(to_user_id) {
    const currentUserId = parseInt($("#current_user_id").attr('data'), 10)
    FriendshipsAction.createFriendship(to_user_id, currentUserId)
  }

  render() {
    const searchUsers = this.state.users
    const currentUserID = parseInt($("#current_user_id").attr('data'), 10)

    return (
      <ul className='search_user_list'>
        {
          _.map(searchUsers, (user) => {
            if ( user.id != currentUserID) {
              return (
                <a href = '/'>
                  <li className='search_user_list_item' key={user.id}>
                    <div className='search_user_list_result text-center mx-auto' onClick={this.createFriendship.bind(this, user.id)}>
                      <img className='search_user_list_result_image' src={ 'http://www.officiallyjd.com/wp-content/uploads/2018/07/20180703_ayase_21.jpg' } />
                      {user.name}
                    </div>
                  </li>
                </a>
              )
            }
          })
        }
      </ul>
    )
  }
}

// <img className='search_user_list_result_image' src={user.image ? '/user_images/' + user.image : '/assets/images/default_image.jpg'} />
