import { Sensor } from '../models';

async function getSensorsByCarChassis(chassis) {
  try {
    const sensors = await Sensor.findAll({
      attributes: [
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
      ],
      where: { carChassis: chassis },
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
      attributes: [
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
        'carChassis',
      ],
      offset,
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
    });
    return sensors;
  } catch (error) {
    return false;
  }
}

export default {
  getSensorsByCarChassis,
  getAllSensors,
  getSensorsByName,
};
