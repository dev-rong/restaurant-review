//backend server
//separate main server codes from db access codes
//configure express server 
//attach cors, express.json middleware(sending/receiving json, specify routes)

import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

const app = express()

app.use(cors())
app.use(express.json()) // our server can accept json in the body of request(get, post...)

app.use("/api/v1/restaurants", restaurants) // specify initial url(/api/version/api name)
app.use(("*", (req, res) => res.status(404).json({error: "not found"})))

// export app as a module
// files that accesses the db import this module
export default app