import React from 'react'
import Calendar from 'components/calendar'
import { Container, Sidebar } from 'semantic-ui-react'
import EventDetails from 'components/event-details'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectSidebarOpen, setSidebarClosed, toggleSidebar } from 'redux/slices/ui'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default () => {
  const dispatch = useAppDispatch()
  const handleToggleSidebar = React.useCallback(() => {
    dispatch(toggleSidebar())
  }, [])
  const handleHideSidebar = React.useCallback(() => {
    dispatch(setSidebarClosed())
  }, [])
  const sidebarOpen = useAppSelector(selectSidebarOpen)

  return (
    <Container fluid style={{ padding: '1em' }}>
      <Sidebar.Pushable>
        <Sidebar
          animation="overlay"
          width="very wide"
          onHide={handleHideSidebar}
          vertical="true"
          inverted="true"
          visible={sidebarOpen}
          style={{ backgroundColor: '#4c9a74' }}
        >
          <EventDetails />
        </Sidebar>
        <Sidebar.Pusher dimmed={sidebarOpen}>
          <div style={{ textAlign: 'right' }} onClick={handleToggleSidebar}>
            Add Event
          </div>
          <Calendar />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Container>
  )
}
