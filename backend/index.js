import { connectToMongo } from "./db.js";
import express from "express";
import { authRouter } from './routes/auth.js'
import { notesRouter } from './routes/notes.js'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

await connectToMongo();  //run command nodemon .\index.js to connect mongo db

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/notes', notesRouter)

app.listen(port, () => {
    console.log(`iNotebook app listening on port http://localhost:${port}`)
})