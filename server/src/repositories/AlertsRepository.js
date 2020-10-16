import { Alert } from '../models';
import { formatDateAndHour } from '../utils/formatDate';

async function getAlertsByCarChassis(chassis) {
  try {
    const result = await Alert.findAll({
      attributes: ['id', 'type', 'description', 'carChassis', 'createdAt'],
      where: { carChassis: chassis },
    });

    const alerts = result.map((alert) => {
      const serializedAlert = {
        ...alert.dataValues,
        date: formatDateAndHour(alert.createdAt),
      };

      delete serializedAlert.createdAt;
      return serializedAlert;
    });

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
    console.log('Error', error);
    return false;
  }
}

export default { getAlertsByCarChassis, createAlert };