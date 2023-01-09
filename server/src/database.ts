import { MongoClient, Db } from 'mongodb'
export let _database: Db | undefined

export async function initializeDB(): Promise<Db> {
  const client = new MongoClient(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
  )
  const con = await client.connect()
  _database = await con.db(process.env.MONGO_DB_NAME)
  return _database
}
