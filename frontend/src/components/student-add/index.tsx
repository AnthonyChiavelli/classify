import React from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { addStudentAction } from 'redux/sagas/students/actions'
import { selectStudentAddModalOpen, setStudentAddModalOpen } from 'redux/slices/ui'
import { Modal, Button, Icon, Header, Form, InputOnChangeData } from 'semantic-ui-react'
import IStudent from 'types/student'

export default () => {
  const dispatch = useAppDispatch()
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [family, setFamily] = React.useState('')
  const [school, setSchool] = React.useState('')
  const [gradeLevel, setGradeLevel] = React.useState(1)

  const modalOpen = useAppSelector(selectStudentAddModalOpen)

  const handleAddStudent = React.useCallback(() => {
    const studentData: IStudent = {
      _id: 'new',
      firstName,
      lastName,
      familyId: family,
      school,
      gradeLevel,
      areasOfConcern: [],
    }
    dispatch(addStudentAction(studentData))
  }, [firstName, lastName, family, school])

  return (
    <span>
      <Modal
        onClose={() => dispatch(setStudentAddModalOpen(false))}
        onOpen={() => dispatch(setStudentAddModalOpen(true))}
        open={modalOpen}
        trigger={
          <Button color="green">
            <Icon name="add" />
            Add Student
          </Button>
        }
      >
        <Modal.Header>Add New Student</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Enter Attributes</Header>
          </Modal.Description>
          <Form>
            <Form.Input
              label="First Name"
              value={firstName}
              onChange={(_, data: InputOnChangeData) => setFirstName(data.value)}
            />
            <Form.Input
              label="Last Name"
              value={lastName}
              onChange={(_, data: InputOnChangeData) => setLastName(data.value)}
            />
            <Form.Input
              label="Family"
              value={family}
              onChange={(_, data: InputOnChangeData) => setFamily(data.value)}
            />
            <Form.Input
              label="School"
              value={school}
              onChange={(_, data: InputOnChangeData) => setSchool(data.value)}
            />
            <Form.Input
              type="number"
              label="Grade Level"
              min="1"
              max="12"
              value={gradeLevel}
              onChange={(_, data: InputOnChangeData) => setGradeLevel(Number(data.value))}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => dispatch(setStudentAddModalOpen({ open: false }))}>
            Cancel
          </Button>
          <Button content="Add" labelPosition="right" icon="plus" onClick={handleAddStudent} positive />
        </Modal.Actions>
      </Modal>
    </span>
  )
}
