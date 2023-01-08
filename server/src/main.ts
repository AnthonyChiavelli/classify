import 'dotenv/config'
import express, { Express, Request, Response } from 'express'
import path from 'path'
import { Db } from 'mongodb'
import { initializeDB } from 'database'
import bodyParser from 'body-parser'
import { Service } from 'service'

const SERVER_PORT = process.env.SERVER_PORT
const API_PREFIX = '/api'

const app: Express = express()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.listen(SERVER_PORT, async () => {
  // eslint-disable-next-line no-console
  console.info(`Server running on port ${SERVER_PORT}`)
  try {
    const dbClient: Db = await initializeDB()
    // eslint-disable-next-line no-console
    console.info(`Database connected`)
    app.emit('DATABASE_READY', dbClient)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.info(`Database connection failed: `, e)
  }
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.on('DATABASE_READY', async (database: Db) => {
  const service = new Service(database)

  app.get(API_PREFIX + '/students', async (req, res) => {
    const studs = await service.fetchStudents()
    return res.send(studs)
  })
  app.post(API_PREFIX + '/students', async (req, res) => {
    const student = req.body
    delete student._id
    try {
      await service.createStudent(student)
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
    return res.send(student)
  })

  app.delete(API_PREFIX + '/students', async (req, res) => {
    const studentId = req.body.studentId
    try {
      await service.deleteStudent(studentId)
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
    return res.send(200)
  })
  app.post(API_PREFIX + '/students/import', async (req, res) => {
    const students = req.body.students
    try {
      const errors = await service.importStudents(students)
      return res.send(errors)
    } catch (e) {
      return res.status(400).send({ error: e.message })
    }
  })

  app.get(API_PREFIX + '*', () => {
    return 404
  })
  defineBundleEndpoints()
})

const defineBundleEndpoints = () => {
  app.get('*/bundle.js', function (req: Request, response: Response) {
    response.sendFile(path.resolve('..', 'dist', 'bundle.js'))
  })

  app.get('*', function (req: Request, response: Response) {
    response.sendFile(path.resolve('..', 'dist', 'index.html'))
  })
}
