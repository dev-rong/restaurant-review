//connect to the db, start the server
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from './dao/restaurantsDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'

dotenv.config() // load in the environment variables
const MongoClient = mongodb.MongoClient// access to mongoclient

const port = process.env.PORT || 8000 

// connect to the db
// pass info in the db url
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 50, //50 people connected at a time
        wtimeoutMS: 2500,
        useNewUrlParser: true //mongodb node.js driver rewrote the tool used to parse mongodb connection strings
    }
    )
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        //right after connecting to db / before to server
        //call inject db
        await RestaurantsDAO.injectDB(client) //get initial reference to the restaurants collection in the db
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => { // after db connected, how we start the webserver
            console.log(`listening on port ${port}`)
        })
    })
