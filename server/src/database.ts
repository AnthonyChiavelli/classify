import { MongoClient, Db } from 'mongodb'
export let _database: Db | undefined

export async function initializeDB(): Promise<Db> {
  const client = new MongoClient(process.env.MONGO_URI)
  const con = await client.connect()
  _database = await con.db(process.env.MONGO_DB_NAME)
  return _database
}
