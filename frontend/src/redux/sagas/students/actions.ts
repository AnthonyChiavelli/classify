import IStudent from 'types/student'

export const fetchStudentsAction = () => ({ type: 'FETCH_STUDENTS' })
export const fetchStudentsSuccess = (students: any[]) => ({ type: 'FETCH_STUDENTS_SUCCESS', payload: students })
export const addStudentAction = (studentData: IStudent) => ({ type: 'ADD_STUDENT', payload: studentData })
export const importStudentsAction = (studentData: IStudent[]) => ({ type: 'IMPORT_STUDENTS', payload: studentData })
export const deleteStudentAction = (studentId: string) => ({ type: 'DELETE_STUDENT', payload: studentId })
