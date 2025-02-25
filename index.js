import express from 'express';
import cors from 'cors';
import { PORT, URL_FRONTEND } from './config.js';
import { connectionDb } from './db/connectionMongoDb.js';
import { routesAuth } from './routes/routesAuth.js';
import cookieParser from 'cookie-parser';
import { routesCategory } from './routes/routesCategory.js';
import { routesProduct } from './routes/routesProduct.js';
import { routesSupplier } from './routes/routesSupplier.js';
import { routesOrder } from './routes/routesOrder.js';
import { routesCustomer } from './routes/routesCustomer.js';
import { routesSales } from './routes/routesSales.js';

const app = express();

// Conexión a BD
connectionDb();

const corsOptions = {
    origin: URL_FRONTEND,
    credentials: true,
};

// Para auth con cookies en server que admita las cookies
// const corsOptions = {
//     origin: 'https://tienda-285p.onrender.com',
//     credentials: true,
// };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// rutas
app.use('/auth', routesAuth);
app.use('/sale', routesSales);
app.use('/order', routesOrder);
app.use('/product', routesProduct);
app.use('/supplier', routesSupplier);
app.use('/customer', routesCustomer);
app.use('/category', routesCategory);

app.options('*', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://tienda-285p.onrender.com');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
});

app.listen(PORT, () => {
    console.log('Corriendo en el puerto ' + PORT);
});