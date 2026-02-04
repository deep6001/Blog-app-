import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import cookieParser from 'cookie-parser';
import ConnectDB from './config/db.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

ConnectDB();

app.use(cors(
  {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }
));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/posts',postRoutes);



app.get('/', (req, res) => {
  res.send('Hello, World!');
}
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

