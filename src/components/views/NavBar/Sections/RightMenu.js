/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Menu, Icon, Badge } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const [success, setSuccess] = useState('false');
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user.loginSucces) {
      setSuccess('true');
    }
  }, [user])
  
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };
  console.log('prop', props)
  console.log('user', user)
  console.log('success', success)

if (user && success) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="history">
        <a href="/history">History</a>
      </Menu.Item>

      <Menu.Item key="upload">
        <a href="/product/upload">Upload</a>
      </Menu.Item>

      <Menu.Item key="mypick">
        <a href="/user/mypick" style={{ display: 'block', height: '60px', marginRight: '-14px', position: 'relative' }}>
          <Icon type="heart" style={{ fontSize: 25 }}/>
          { user.userData && user.userData.mypick[0] &&
            <div style={{ borderRadius: '3px', height: '6px', width: '6px', backgroundColor:  'tomato', position: 'absolute', top: '12px', right: '22px' }}></div>
          } 
        </a>
      </Menu.Item>

      <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
        <Badge count={user.userData && user.userData.cart.length}>
          <a href="/user/cart" className="head-example" style={{ marginRight: -22, color: '#667777'}}>
            <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }} />
          </a>
        </Badge>
      </Menu.Item>

      <Menu.Item key="logout">
        <a onClick={logoutHandler}>Logout</a>
      </Menu.Item>
    </Menu>
  )
} else {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/login">Signin</a>
      </Menu.Item>
      <Menu.Item key="app">
        <a href="/register">Signup</a>
      </Menu.Item>
    </Menu>
  )
}


}

export default withRouter(RightMenu);

