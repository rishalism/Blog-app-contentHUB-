import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan';
import cookieparser from 'cookie-parser'
import cors from 'cors'
import session, { SessionOptions } from 'express-session'
const app = express();
import UserRoute from '../Backend/routes/UserRoutes'
import ConnectMongoDb from './config/dbConfig';
import errorHandleMiddleware from './middlewares/ErrorHandler';
import path from 'path'
// connect db and start server 

async function startServer() {
    const port = process.env.PORT || 3000;
    try {
        // Connect to MongoDB
        await ConnectMongoDb();

        // Start the Express server
        app.get('/', (req: Request, res: Response) => {
            res.send('Hello, TypeScript with Node.js!');
        });


        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
}
startServer()

app.use(express.json({ limit: '50mb' }))
app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000 }))
app.use(cookieparser())
app.use("/images", express.static(path.join(__dirname, "assets", "images")));

app.use(cors({
    origin: process.env.CORS_URL,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))



const sessionOptions: SessionOptions = {
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 3600000,
    },
}
app.use(session(sessionOptions))
app.use('/api/users', UserRoute)
app.use(errorHandleMiddleware)
