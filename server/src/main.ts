import express, { Express, Request, Response } from 'express'
import path from 'path'

// TODO move to env
const SERVER_PORT = 2000

const app: Express = express()

app.listen(SERVER_PORT, async () => {
  // eslint-disable-next-line no-console
  console.info(`Server running on port ${SERVER_PORT}`)
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