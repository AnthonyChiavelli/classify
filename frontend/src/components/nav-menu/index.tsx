import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default () => {
  return (
    <Menu borderless>
      <Menu.Item>
        <Link to="/">Calendar</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/students">Student Roster</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/analytics">Analytics</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  )
}
