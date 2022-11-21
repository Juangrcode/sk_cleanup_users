import mongoose, { ConnectOptions } from 'mongoose'
import config from '../config'

const MONGO_URI: string = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`

interface ConnectionOptionsExtend {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
}

class MongooseLib {
  constructor () {}

  async connect () {
    const options: ConnectOptions & ConnectionOptionsExtend = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    await mongoose
      .connect(MONGO_URI, options)
      .then(() =>
        console.log(
          `[db] Connect success in mongodb+srv://${config.dbUser}:password@host/${config.dbName}`
        )
      )
      .catch((err: Error) => console.error(`[db] ${err}`))
  }
}

export default MongooseLib
