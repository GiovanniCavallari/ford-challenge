import { Car, Sensor } from '../models';

async function getCarByChassis(chassis) {
  try {
    const car = await Car.findOne({
      attributes: ['chassis', 'name', 'model', 'licensePlate'],
      where: { chassis },
      include: [
        {
          model: Sensor,
          as: 'sensors',
          attributes: { exclude: ['id', 'carChassis', 'createdAt', 'updatedAt'] },
          order: [['id', 'ASC']],
          limit: 1,
        },
      ],
    });
    return car;
  } catch (error) {
    return false;
  }
}

export default { getCarByChassis };
