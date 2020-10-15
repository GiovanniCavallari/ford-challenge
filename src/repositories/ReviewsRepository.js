import { Review } from '../models';
import { formatDateAndHour } from '../utils/formatDate';

async function getReviewsByCarChassis(chassis) {
  try {
    const result = await Review.findAll({
      attributes: ['id', 'date', 'type', 'description', 'carChassis'],
      where: { carChassis: chassis },
    });

    const reviews = result.map((review) => {
      return {
        ...review.dataValues,
        date: formatDateAndHour(review.date),
      };
    });

    return reviews;
  } catch (error) {
    return false;
  }
}

export default { getReviewsByCarChassis };
