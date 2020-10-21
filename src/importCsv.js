import { resolve } from 'path';
import { createReadStream } from 'fs';
import parse from 'csv-parser';
import SensorsRepository from './repositories/SensorsRepository';

const sensorsDataset = resolve(__dirname, 'database', 'files', 'sensors-dataset.csv');
const parser = parse({ columns: true });

createReadStream(sensorsDataset)
  .pipe(parser)
  .on('data', async (row) => {
    await SensorsRepository.createSensor(row);
  })
  .on('end', () => {
    console.log('Sensors dataset successfully processed');
  })
  .on('error', (error) => {
    console.warn(error);
  });
