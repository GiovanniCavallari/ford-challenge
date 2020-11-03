import { Sensor } from '../models';

const attributes = [
  'fuel',
  'odometer',
  'oil',
  'brake',
  'temperature',
  'rfTirePressure',
  'lfTirePressure',
  'rrTirePressure',
  'rlTirePressure',
  'rfTireTemp',
  'lfTireTemp',
  'rrTireTemp',
  'rlTireTemp',
];

async function getSensorsByCarChassis(chassis) {
  try {
    const sensors = await Sensor.findAll({
      attributes,
      where: { carChassis: chassis },
      order: [['id', 'ASC']],
      limit: 1,
    });
    return sensors;
  } catch (error) {
    return false;
  }
}

async function getAllSensors(page = 1) {
  const offset = page - 1;

  try {
    const sensors = await Sensor.findAll({
      attributes: [...attributes, 'carChassis'],
      offset,
      order: [['id', 'ASC']],
      limit: 1,
    });
    return sensors;
  } catch (error) {
    return false;
  }
}

async function getSensorsByName(name, chassis) {
  try {
    const sensors = await Sensor.findOne({
      attributes: [name],
      where: { carChassis: chassis },
      order: [['id', 'ASC']],
    });
    return sensors;
  } catch (error) {
    return false;
  }
}

async function getSensorsById(id) {
  try {
    const sensors = await Sensor.findOne({
      attributes,
      where: { id },
    });
    return sensors;
  } catch (error) {
    return false;
  }
}

async function createSensor(data) {
  try {
    const result = await Sensor.create(data);
    return result;
  } catch (error) {
    return false;
  }
}

async function updateApiSensorsLine(data) {
  try {
    await Sensor.update(data, { where: { id: 1 } });
    return true;
  } catch (error) {
    return false;
  }
}

export default {
  getSensorsByCarChassis,
  getAllSensors,
  getSensorsByName,
  getSensorsById,
  createSensor,
  updateApiSensorsLine,
};
