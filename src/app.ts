
import './config/database';
import express from 'express';
import { residentRoutes } from './routes/residentRoute'; 
import { buildingRoutes } from './routes/buildingRoute';
import { errorHandler } from './middleware/errorHandler';
import * as dotenv from 'dotenv';

dotenv.config();


const app = express();


app.use(express.json());


app.use('/api', residentRoutes);
app.use('/api', buildingRoutes); 

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
