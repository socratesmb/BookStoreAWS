import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js'
import { importData } from './createBook.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()

const app = express();

const PORT = process.env.PORT || 5000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

app.get('/health.html', (req, res) => {
    res.sendFile(__dirname + '/health.html');
});

app.use('/api/books/', bookRoutes)

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} and listening on PORT ${PORT}`.blue)
})

app.get('/', (req, res) => {
    res.send('API is running...')
})

importData();