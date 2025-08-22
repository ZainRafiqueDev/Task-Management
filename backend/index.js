import express from 'express';
import cors from 'cors';
// import morgan from 'morgan';
// import helmet from 'helmet';
// import compression from 'compression';
// import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB  from './src/config/db.js';
import authRoutes from './src/routes/authroutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
// import taskRoutes from './src/routes/taskRoutes.js';
// import worklogRoutes from './src/routes/worklogRoutes.js';
// import { notFound, errorHandler } from './src/middleware/error.js';

dotenv.config();
const app = express();

// MongoDB connection
connectDB();


// app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }));
// app.use(helmet());
// app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(morgan('dev'));


app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/worklogs', worklogRoutes);

app.get('/', (_req, res) => res.json({ ok: true, message: 'Task Manager API running' }));


// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
