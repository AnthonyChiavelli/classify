import { Db, ObjectID } from 'mongodb'
import IImportResult from 'types/import'
import IStudent from 'types/student'

export class Service {
  dbClient: Db

  constructor(database: Db) {
    this.dbClient = database
  }

  validateCSVStudent(studentRecord: object) {
    const requiredFields = ['First Name', 'Last Name', 'School', 'Family', 'Grade Level']
    const optionalFields = ['Notes']
    requiredFields.forEach((f: string) => {
      if (!(f in studentRecord)) {
        throw new Error(`Invalid student object. Missing required field: ${f}`)
      }
    })
    Object.keys(studentRecord).forEach((f: string) => {
      if (!requiredFields.includes(f) && !optionalFields.includes(f)) {
        throw new Error(`Invalid student object. Invalid field field: ${f}`)
      }
    })
  }

  mapCSVentryToStudent(studentRecord: object): IStudent {
    this.validateCSVStudent(studentRecord)
    const fieldMap = new Map([
      ['First Name', 'firstName'],
      ['Last Name', 'lastName'],
      ['School', 'school'],
      ['Family', 'familyId'],
      ['Grade Level', 'gradeLevel'],
      ['Notes', 'notes'],
    ])
    const cleanedStudent: { [key: string]: string } = {}
    Object.entries(studentRecord).forEach(([k, v]) => {
      const cleanedKey = fieldMap.get(k)
      cleanedStudent[cleanedKey] = v
    })
    return cleanedStudent as unknown as IStudent
  }

  async fetchStudents() {
    return await this.dbClient
      .collection('students')
      .find({ _removed: { $ne: true } })
      .toArray()
  }

  async fetchStudent(id: string) {
    return await this.dbClient.collection('students').findOne({ _id: id, _removed: { $ne: true } })
  }

  async createStudent(studentData: object): Promise<IStudent> {
    const existing = await this.dbClient.collection('students').findOne({ ...studentData, _removed: { $ne: true } })
    if (existing) {
      throw new Error('Student with this data already exists')
    } else {
      const res = await this.dbClient.collection('students').insertOne(studentData)
      return await this.dbClient.collection('students').findOne({ _id: res.insertedId })
    }
  }

  async deleteStudent(studentId: string): Promise<boolean> {
    const existing = await this.dbClient.collection('students').findOne({ _id: ObjectID(studentId) })
    if (!existing) {
      throw new Error('Student not found')
    } else {
      // TODO see if student is involved in events!
      await this.dbClient.collection('students').updateOne({ _id: ObjectID(studentId) }, { $set: { _removed: true } })
      return true
    }
  }

  async importStudents(students: IStudent[]): Promise<IImportResult> {
    const errors = []
    const created = []
    for (const [index, studentRecord] of students.entries()) {
      try {
        const student = this.mapCSVentryToStudent(studentRecord)
        const result = await this.createStudent(student)
        created.push(result)
      } catch (e) {
        errors.push({ error: e.message, row: index + 1 })
      }
    }
    return {
      errors,
      created,
    }
  }
}
