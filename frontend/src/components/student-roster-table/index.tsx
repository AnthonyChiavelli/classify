import { Button, Table, Icon } from 'semantic-ui-react'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { deleteStudentAction, fetchStudentsAction } from 'redux/sagas/students/actions'
import { selectStudentRoster } from 'redux/slices/student-roster'

export default () => {
  const dispatch = useAppDispatch()
  const students = useAppSelector(selectStudentRoster)

  const handleRemoveStudent = React.useCallback((studentId: string) => {
    dispatch(deleteStudentAction(studentId))
  }, [])

  React.useEffect(() => {
    dispatch(fetchStudentsAction())
  }, [])
  return (
    <div>
      <Table celled padded>
        <Table.Header>
          <Table.Row key="header">
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Family</Table.HeaderCell>
            <Table.HeaderCell>School</Table.HeaderCell>
            <Table.HeaderCell>Grade Level</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {students.map((s) => (
            <Table.Row key={s._id}>
              <Table.Cell>{s.firstName}</Table.Cell>
              <Table.Cell>{s.lastName}</Table.Cell>
              <Table.Cell>{s.familyId}</Table.Cell>
              <Table.Cell>{s.school}</Table.Cell>
              <Table.Cell>{s.gradeLevel}</Table.Cell>
              <Table.Cell>
                <Button icon color="red" onClick={handleRemoveStudent.bind(this, s._id)}>
                  <Icon name="delete" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
