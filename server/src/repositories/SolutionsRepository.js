import { Solution } from '../models';

async function getSolutionsBySensorName(sensor) {
  try {
    const solutions = [];

    const result = await Solution.findAll({
      attributes: ['description'],
      where: { sensor },
    });

    result.map(({ description }) => solutions.push(description));

    return solutions;
  } catch (error) {
    return false;
  }
}

export default {
  getSolutionsBySensorName,
};
