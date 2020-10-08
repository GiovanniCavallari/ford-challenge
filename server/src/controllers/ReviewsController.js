import ReviewsRepository from '../repositories/ReviewsRepository';
import errorResponse from '../utils/errorResponse';

async function index(request, response) {
  const { chassis } = request.params;

  const reviews = await ReviewsRepository.getReviewsByCarChassis(chassis);

  if (!reviews || reviews.length === 0) {
    const message = `Reviews for car with chassis ${chassis} not found`;
    return errorResponse(response, 404, message);
  }

  return response.json(reviews);
}

export default { index };
