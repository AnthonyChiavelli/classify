import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Schedule from 'pages/schedule'
import Analytics from 'pages/analytics'
import Settings from 'pages/analytics'
import StudentRoster from 'pages/student-roster'
import NavMenu from 'components/nav-menu'
import { store } from 'redux/store'
import { Provider } from 'react-redux'
import MessageDialog from 'components/message-dialog'

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MessageDialog />
        <Container fluid>
          <NavMenu />
          <Routes>
            <Route path="/students" element={<StudentRoster />} />
            <Route path="/" element={<Schedule />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  )
}
