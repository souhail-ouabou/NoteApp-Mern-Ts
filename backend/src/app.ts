import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import notesRoutes from './routes/notes'
import morgan from "morgan"

const app = express()


app.use(morgan("dev"))
app.use(express.json());


app.use("/api/notes",notesRoutes)


app.use((req, res, next)=>{
    next(Error("Endpoint not found"))
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errMsg = 'An unkown error occured'
    if (error instanceof Error) errMsg = error.message
    res.status(500).json({ error: errMsg })
})

export default app
