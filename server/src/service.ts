import { Db, ObjectID } from 'mongodb'

export class Service {
  dbClient: Db

  constructor(database: Db) {
    this.dbClient = database
  }

  async fetchStudents() {
    return await this.dbClient.collection('students').find().toArray()
  }

  async fetchStudent(id: ObjectID) {
    return await this.dbClient.collection('students').findOne({ _id: id })
  }
}
