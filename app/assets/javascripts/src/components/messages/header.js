import React from 'react'

class Header extends React.Component {
  render() {
    return (
        <header className='header'>
          <div className='header-left'>
            <a href='/' className='header__service-name font-weight-bold'>ChatApp</a>
          </div>
          <div className='header-right d-flex flex-row-reverse'>
            <div role='button' data-toggle='dropdown' className='dropdown-toggle drop-down__name'>
              {$("#current_user_name").attr('data')}
            </div>
            <ul className='dropdown-menu' role='menu'>
              <li role='presentation'>
                <a href={'/users/' + $("#current_user_id").attr('data')} data-method='get' className='header__dropdown-menu'>マイページ</a>
              </li>
              <li role='presentation'>
                <a href='/users/sign_out' data-method='delete'  className='header__dropdown-menu'>ログアウト</a>
              </li>
            </ul>
            <a href='/users/search' data-method='get' className='header__search-user'>ユーザー検索</a>
          </div>
        </header>
      )
  }
}

export default Header
