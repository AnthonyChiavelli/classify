import React from 'react'
import classNames from 'classnames'
import IStudent from 'types/student'
import { Icon, Input, Popup } from 'semantic-ui-react'
import {
  removeStudent,
  selectAttendingStudentById,
  updateStudentCharge,
  updateStudentAbsense,
} from 'redux/slices/event-details'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import 'components/student-attendance-list/student-attendance-list-item.styl'

interface IStudentListItemProps {
  student: IStudent
}

export default (props: IStudentListItemProps) => {
  const dispatch = useAppDispatch()
  const attendingStudent = useAppSelector((state) => selectAttendingStudentById(state, props.student._id))
  const handleRemoveStudent = React.useCallback(() => {
    dispatch(removeStudent(props.student._id))
  }, [props.student])
  const handleMarkAbsentStudent = React.useCallback(() => {
    dispatch(updateStudentAbsense({ studentId: props.student._id, absent: !attendingStudent.absent }))
  }, [props.student, attendingStudent])

  const handleChangeCharge = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(
        updateStudentCharge({
          studentId: props.student._id,
          charge: Number(e.target.value),
        })
      ),
    []
  )

  return (
    <div className={classNames('student-attendance-list-item', { absent: attendingStudent.absent })}>
      <div className="name">
        {props.student.firstName} {props.student.lastName}
      </div>
      <div className="charge-input">
        <Input
          type="number"
          value={attendingStudent.charge}
          onChange={handleChangeCharge}
          disabled={attendingStudent.absent}
        />
      </div>
      <div className="icon-group">
        <Popup
          content="Mark Absent"
          trigger={<Icon name="calendar minus" onClick={handleMarkAbsentStudent} link size="large" />}
        />
        <Icon name="delete" onClick={handleRemoveStudent} link size="large" />
      </div>
    </div>
  )
}
