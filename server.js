const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient, ObjectId} = require('mongodb')
const { response } = require('express')
require('dotenv').config()
const PORT = 8000;

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'sample_mflix',
    collection

MongoClient.connect(dbConnectionStr)
    .then(client =>  {
        console.log("Connection to database successful")
        db = client.db(dbName)
        collection = db.collection('movies')
    })

//Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//this is pulling an array of possibilities for the search bar
app.get("/search", async(req, res) =>{
    try {
        let result = await collection.aggregate([
            {
                "$Search" : {
                    "autocomplete" : {
                        "query" : `${request.query.query}`,
                        "path": "title",
                        "fuzzy": {
                            "maxEdits": 2,
                            "prefixLength": 3
                        }
                    }
                }
            }
        ]).toArray()
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

//This get is pulling the information for the selected movie
app.get("/get/:id", async(req, res) => {
    try {
        let result = await collection.findOne({
            "_id" : ObjectId(request.params.id)
        })
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log("Server is running")
})