const MongoClient = require('mongodb').MongoClient
const keys = process.env.NODE_ENV === 'production' ? '' : require('../keys.js')
const uri = `mongodb+srv://yuvalTheKing:${process.env.NODE_ENV === 'production' ? process.env.mongo : keys.mongo}@cluster0.bajg6.mongodb.net/?retryWrites=true&w=majority`

module.exports = {
    getCollection
}

const dbName = 'stayDB'

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err
    }
}




