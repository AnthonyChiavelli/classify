import 'dotenv/config'
import express, { Express, Request, Response } from 'express'
import path from 'path'
import { Db } from 'mongodb'
import { initializeDB } from 'database'
import bodyParser from 'body-parser'
import { Service } from 'service'

const SERVER_PORT = process.env.SERVER_PORT

const app: Express = express()
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
  app.get('/students', () => {
    return service.fetchStudents()
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
