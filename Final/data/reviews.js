import { houses as houseCollection } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import validation from '../helpers.js';

const housesCollection = await houseCollection();

const createReview = async (
  poster,
  accommodationId,
  reviewData
) => {
  const existingReview = await housesCollection.findOne(
    { _id: new ObjectId(accommodationId), 'reviews.emailAddress': poster.emailAddress }
  );

  if (existingReview) {
    throw `User with email ${poster.emailAddress} has already reviewed accommodation ${accommodationId}`;
  }

  const now = new Date();
  const reviewDate = now.toLocaleString('en-US')

  let newReview = {
    _id: new ObjectId(),
    firstName: poster.firstName,
    lastName: poster.lastName,
    emailAddress: poster.emailAddress,
    rating: reviewData.rating,
    review: reviewData.review,
    reviewDate: reviewDate
  };

  const updateReview = await housesCollection.updateOne(
    { _id: new ObjectId(accommodationId) },
    { $push: { reviews: newReview } },
    { returnDocument: 'after' });

  if (updateReview.modifiedCount === 0) {
    throw `could not add review to accommodation ${accommodationId}`;
  }
  return true;
};

const deleteReview = async (accommodationId, userEmail, reviewId) => {
  if (!accommodationId || !reviewId) throw 'You must provide both accommodationId and reviewId';

  const house = await housesCollection.findOne({ _id: new ObjectId(accommodationId) });
  if (!house) throw `House with id ${accommodationId} not found`;

  const reviewToDelete = house.reviews.find(review => review._id.equals(new ObjectId(reviewId)));

  if (!reviewToDelete) {
    throw `Review with id ${reviewId} not found in accommodation ${accommodationId}`;
  }

  if (reviewToDelete.emailAddress !== userEmail) {
    throw `User with email ${userEmail} is not authorized to delete review ${reviewId}`;
  }

  const updateResult = await housesCollection.updateOne(
    { _id: new ObjectId(accommodationId) },
    { $pull: { reviews: { _id: new ObjectId(reviewId) } } }
  );

  if (updateResult.modifiedCount === 0) {
    throw `Could not delete review with id ${reviewId} from accommodation ${accommodationId}`;
  }

  return true;
};

const getAll = async () => {
  const reviewsCollection = await reviews();
  return await reviewsCollection.find({}).toArray();
};

const getReviewsByAccommodationId = async (accommodationId) => {
  const house = await housesCollection.findOne({ _id: new ObjectId(accommodationId) });
  if (!house) throw `House with id ${accommodationId} not found`;
  return house.reviews;
};


export { createReview, deleteReview, getAll, getReviewsByAccommodationId };
