import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import notesRoutes from './routes/notes'
import userRoutes from './routes/users'
import morgan from 'morgan'
import createHttpError, { isHttpError } from 'http-errors'
import session from "express-session"
import env from "./util/validateEnv"
import MongoStore from "connect-mongo"
import { requiresAuth } from '../middelware/auth'
import cors from "cors"

const app = express()

app.use(morgan('dev'))
app.use(express.json())


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true, // allow cookies & sessions across origins
}))

app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
    sameSite: "lax",      // ⚙️ Important for CORS + cookies
    secure: false,        // ⚙️ Set to true if using HTTPS in production
  },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: env.MONGO_CONNECTION_STRING
  })
}))

app.use('/api/users', userRoutes)
app.use('/api/notes', requiresAuth, notesRoutes)

app.use((req, res, next) => {
    next(createHttpError(404, 'Endpoint not found'))
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errorMessage = 'An unkown error occured'
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status
        errorMessage = error.message
    }
    res.status(statusCode).json({ error: errorMessage })
})

export default app
