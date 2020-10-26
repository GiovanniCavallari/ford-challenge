import { Alert } from '../models';
import { formatDateAndHour } from '../utils/formatDate';
import { sensorNameTranslations } from '../utils/sensorNameTranslations';

async function getAlertsByCarChassis(chassis) {
  try {
    const result = await Alert.findAll({
      attributes: ['id', 'title', 'description', 'sensor', 'carChassis', 'createdAt'],
      where: { carChassis: chassis },
      order: [['id', 'DESC']],
    });

    const alerts = result.map((alert) => {
      const serializedAlert = {
        ...alert.dataValues,
        date: formatDateAndHour(alert.createdAt),
        translation: sensorNameTranslations[alert.sensor],
      };

      delete serializedAlert.createdAt;
      return serializedAlert;
    });

    return alerts;
  } catch (error) {
    return false;
  }
}

async function getAlertById(id) {
  try {
    const result = await Alert.findOne({
      attributes: ['id', 'title', 'description', 'sensor', 'carChassis', 'createdAt'],
      where: { id },
    });

    const alerts = {
      ...result.dataValues,
      date: formatDateAndHour(result.createdAt),
      translation: sensorNameTranslations[result.sensor],
    };
    delete alerts.createdAt;

    return alerts;
  } catch (error) {
    return false;
  }
}

async function createAlert(data) {
  try {
    const result = await Alert.create(data);
    return result;
  } catch (error) {
    return false;
  }
}

export default {
  getAlertsByCarChassis,
  getAlertById,
  createAlert,
};
