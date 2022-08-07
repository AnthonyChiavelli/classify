import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'
import Schedule from 'pages/schedule'
import Analytics from 'pages/analytics'
import Settings from 'pages/analytics'

const tabs = [
  { menuItem: 'Schedule', render: () => <Schedule /> },
  { menuItem: 'Analytics', render: () => <Analytics /> },
  { menuItem: 'Settings', render: () => <Settings /> },
]

export default () => {
  return (
    <Container fluid style={{ margin: '2em' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tab panes={tabs} />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}
