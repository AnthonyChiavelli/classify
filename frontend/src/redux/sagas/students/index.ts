import { call, put, StrictEffect, take } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga/effects'
import pluralize from 'pluralize'
import { setStudents, addNewlyCreatedStudents, removeDeletedStudent } from 'redux/slices/student-roster'
import { setMessageDialogOpenState, setStudentAddModalOpen } from 'redux/slices/ui'
import IStudent from 'types/student'

function* fetchStudents(): Generator<StrictEffect, void, any> {
  const response = yield call(fetch, '/api/students')
  const students = yield call([response, 'json'])
  yield put(setStudents(students))
}

function* addStudent(action: { payload: IStudent; type: string }): Generator<StrictEffect, void, any> {
  const response = yield call(fetch, '/api/students', {
    method: 'POST',
    body: JSON.stringify(action.payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const body = yield call([response, 'json'])
  if (response.status === 200) {
    yield put(addNewlyCreatedStudents([body]))
  } else {
    yield put(
      setMessageDialogOpenState({
        open: true,
        title: 'Student Creation Error',
        message: body.error || 'Unspecified error. Try again later or contact support',
      })
    )
  }
  yield put(setStudentAddModalOpen({ open: false }))
}

function* importStudents(action: { payload: IStudent[]; type: string }): Generator<StrictEffect, void, any> {
  yield put(
    setMessageDialogOpenState({
      open: true,
      title: 'Import students',
      message: `Import ${pluralize('student', action.payload.length, true)}?`,
      confirm: true,
    })
  )
  yield take('MODAL_CONFIRM')
  const response = yield call(fetch, '/api/students/import', {
    method: 'POST',
    body: JSON.stringify({ students: action.payload }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const res: { created: IStudent[]; errors: Array<{ error: string; row: number }> } = yield call([response, 'json'])
  yield put(addNewlyCreatedStudents(res.created))
  yield put(setStudentAddModalOpen({ open: false }))
  let message = ''
  if (res.errors.length) {
    message += res.errors.reduce((msg, error) => `${msg} Row ${error.row}: ${error.error}\n`, '')
  }
  message += `\n ${pluralize('record', res.created.length, true)} records successfully imported`
  yield put(setMessageDialogOpenState({ open: true, title: 'Import Result', message }))
}

function* deleteStudent(action: { payload: string; type: string }): Generator<StrictEffect, void, any> {
  yield put(
    setMessageDialogOpenState({
      open: true,
      title: 'Remove Student',
      message: 'Are you sure you want to do this?',
      confirm: true,
    })
  )
  yield take('MODAL_CONFIRM')
  const response = yield call(fetch, '/api/students', {
    method: 'DELETE',
    body: JSON.stringify({ studentId: action.payload }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  let errorMessage: string
  try {
    const body = yield call([response, 'json'])
    errorMessage = body.error || 'Server Error'
  } catch (e) {
    errorMessage = 'Unspecified error. Try again later or contact support'
  }
  if (response.status == 200) {
    yield put(removeDeletedStudent(action.payload))
  } else {
    yield put(
      setMessageDialogOpenState({
        open: true,
        title: 'Student Deletion Error',
        message: errorMessage,
      })
    )
  }
}

export default [
  takeLatest('FETCH_STUDENTS', fetchStudents),
  takeLatest('ADD_STUDENT', addStudent),
  takeLatest('IMPORT_STUDENTS', importStudents),
  takeLatest('DELETE_STUDENT', deleteStudent),
]
