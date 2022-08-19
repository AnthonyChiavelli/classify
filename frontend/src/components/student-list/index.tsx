import React from 'react'
import { Search, List } from 'semantic-ui-react'
import IStudent from 'types/student'
import StudentListItem from './student-list-item'
import { selectStudentRoster } from 'redux/slices/student-roster'
import { selectSelectedStudents, addStudent } from 'redux/slices/event-details'
import { useAppDispatch, useAppSelector } from 'redux/hooks'

interface IStudentSearchProps {
  allowMultiple: boolean
}

export default (props: IStudentSearchProps) => {
  const dispatch = useAppDispatch()
  const studentRoster: IStudent[] = useAppSelector(selectStudentRoster)
  const selectedStudents = useAppSelector(selectSelectedStudents)
  const studentSearchItems = React.useMemo(
    () => studentRoster.map((s) => ({ title: s.firstName, description: s.school, studentId: s.id })),
    [studentRoster]
  )

  const handleSelectStudent = React.useCallback((_event: any, data: { result: { studentId: string } }) => {
    dispatch(addStudent(data.result.studentId))
  }, [])

  const renderTypeahead = () => {
    return (
      <Search
        results={studentSearchItems}
        placeholder="Add Student"
        fluid
        minCharacters={0}
        onResultSelect={handleSelectStudent}
      />
    )
  }
  return (
    <List divided relaxed size="tiny">
      {selectedStudents.map((s) => (
        <StudentListItem student={s} key={s.id} />
      ))}
      {(selectedStudents.length === 0 || props.allowMultiple) && renderTypeahead()}
    </List>
  )
}
