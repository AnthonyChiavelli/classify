/* eslint-disable prettier/prettier */
import React from 'react'
import { Container, Form, Header, Divider, InputOnChangeData, TextAreaProps, Grid } from 'semantic-ui-react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import {
  selectEventType,
  setEventType,
  setClassType,
  selectClassType,
  selectParentName,
  selectConsultationChannel,
  selectDiscoveryChannel,
  setParentName,
  setConsultationChannel,
  setDiscoveryChannel,
} from 'redux/slices/event-details'
import StudentSearch from 'components/student-list'

export default () => {
  // TODO use react final form?
  const dispatch = useAppDispatch()
  const eventType = useAppSelector(selectEventType)
  const classType = useAppSelector(selectClassType)
  const parentName = useAppSelector(selectParentName)
  const consultationChannel = useAppSelector(selectConsultationChannel)
  const discoveryChannel = useAppSelector(selectDiscoveryChannel)

  const handleChangeEventType = React.useCallback(
    (_e: React.ChangeEvent<HTMLInputElement>, { value }: { value: string }) => {
      if (value === 'class' || value === 'consultation') {
        dispatch(setEventType(value))
      }
    },
    []
  )

  const handleChangeClassType = React.useCallback(
    (_e: React.ChangeEvent<HTMLInputElement>, { value }: { value: string }) => {
      if (value === 'individual' || value === 'group') {
        dispatch(setClassType(value))
      }
    },
    []
  )

  const renderClassForm = () => {
    return (
      <>
        <Form.Group grouped>
          <label>{classType === 'group' ? 'Students' : 'Student'}</label>
          <StudentSearch allowMultiple={classType === 'group'} />
          <Divider />
        </Form.Group>
      </>
    )
  }

  const renderConsultationForm = () => {
    return (
      <>
        <Form.Input
          fluid
          label="Parent / Contact Name"
          placeholder="Name"
          value={parentName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) =>
            dispatch(setParentName(data.value))
          }
        />
        <Form.Group grouped>
          <label>Students</label>
          <StudentSearch allowMultiple />
          <Divider />
        </Form.Group>

        <Form.TextArea
          label="How did you hear about me?"
          placeholder="Referal, facebook, etc"
          value={discoveryChannel}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps) =>
            dispatch(setDiscoveryChannel(String(data.value)))
          }
        />
        <Form.Group grouped>
          <label>Consultation Type</label>
          {[
            { l: 'Phone', v: 'phone' },
            { l: 'In Person', v: 'inPerson' },
            { l: 'Email', v: 'email' },
            { l: 'Zoom', v: 'zoom' },
          ].map(({ l, v }) => (
            <Form.Radio
              label={l}
              value={v}
              checked={v === consultationChannel}
              onChange={() => dispatch(setConsultationChannel(v))}
            />
          ))}
          <Divider />
        </Form.Group>
      </>
    )
  }

  return (
    <Container style={{ height: '100%', padding: '1em' }}>
      <Form size="big">
        <Header>Add Booking</Header>
        <Grid columns={2}>
          <Grid.Column>
            <Form.Group grouped>
              <label>Booking Type</label>
              <Form.Radio
                label="Class"
                value="class"
                onChange={handleChangeEventType}
                checked={eventType === 'class'}
              />
              <Form.Radio
                label="Consultation"
                value="consultation"
                onChange={handleChangeEventType}
                checked={eventType === 'consultation'}
              />
              <Divider />
            </Form.Group>
          </Grid.Column>
          {eventType === 'class' && (
            <Grid.Column>
              <Form.Group grouped>
                <label>Class Type</label>
                <Form.Radio
                  label="Individual"
                  value="individual"
                  onChange={handleChangeClassType}
                  checked={classType === 'individual'}
                />
                <Form.Radio
                  label="Group"
                  value="group"
                  onChange={handleChangeClassType}
                  checked={classType === 'group'}
                />
                <Divider />
              </Form.Group>
            </Grid.Column>
          )}
        </Grid>

        {eventType === 'class' && renderClassForm()}
        {eventType === 'consultation' && renderConsultationForm()}

        {/* <Form.Input fluid label="First name" placeholder="First name" />
        <Form.Input fluid label="Last name" placeholder="Last name" /> */}
      </Form>
    </Container>
  )
}
