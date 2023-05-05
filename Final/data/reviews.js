import { reviews as reviewsCollectionImport } from '../config/mongoCollections.js';
import { houses as housesCollectionImport } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

const create = async (reviewData) => {
  const reviewsCollection = await reviewsCollectionImport();
  const newReview = {
    houseId: reviewData.houseId,
    user: reviewData.user,
    rating: reviewData.rating,
    reviewText: reviewData.reviewText,
    date: new Date().toUTCString(),
  };

  const insertInfo = await reviewsCollection.insertOne(newReview);
  if (insertInfo.insertedCount === 0) throw 'Could not add review';

  const newId = insertInfo.insertedId;

  const review = await getById(newId.toString());
  return JSON.parse(JSON.stringify(review));
};

const getById = async (id) => {
  if (!id) throw 'You must provide an id to search for';
  const reviewsCollection = await reviewsCollectionImport();
  const objId = ObjectId.createFromHexString(id);
  const review = await reviewsCollection.findOne({ _id: objId });
  if (review === null) throw 'No review with that id';
  return JSON.parse(JSON.stringify(review));
};

const getAll = async () => {
  const reviewsCollection = await reviewsCollectionImport();
  const reviews = await reviewsCollection.find({}).toArray();
  return reviews;
};

const remove = async (id) => {
  if (!id) throw 'You must provide an id to search for';

  const reviewsCollection = await reviewsCollectionImport();
  const reviewToRemove = await reviewsCollection.findOne({ _id: new ObjectId(id) });

  if (!reviewToRemove) {
    throw `No review with the id ${id} exists`;
  }

  const deletionInfo = await reviewsCollection.deleteOne({ _id: new ObjectId(id) });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete review with id of ${id}`;
  }

  return true;
};

const getReviewsByHouseId = async (houseId) => {
  const reviewsCollection = await reviewsCollectionImport();
  const reviews = await reviewsCollection.find({ houseId }).toArray();
  return reviews;
};

export {
  create,
  getById,
  getAll,
  remove,
  getReviewsByHouseId
};