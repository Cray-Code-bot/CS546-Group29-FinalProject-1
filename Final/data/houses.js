import { houses as houseCollection } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';


//create new house
const create = async (houseData) => {
  
  const housesCollection = await houseCollection();

  const newHouse = {
    user: houseData.user,
    type: houseData.type,
    category: houseData.category,
    city: houseData.city,
    state: houseData.state,
    zip: houseData.zip,
    rent: houseData.rent,
    description: houseData.description,
    postDate: new Date().toUTCString(),
    comments: [],
    reviews: []
  };

  const insertInfo = await housesCollection.insertOne(newHouse);
  if (insertInfo.insertedCount === 0) throw 'Could not add house';

  const newId = insertInfo.insertedId;

  const house = await getById(newId.toString()); // Changed this line
  return JSON.parse(JSON.stringify(house));
};

const getById = async (id) => {
  if (!id) throw 'You must provide an id to search for';
  const housesCollection = await houseCollection();
  const objId = ObjectId.createFromHexString(id);
  const house = await housesCollection.findOne({ _id: objId });
  if (house === null) throw 'No house with that id';
  return JSON.parse(JSON.stringify(house));
};

const getAll = async () => {
  const housesCollection = await houseCollection();
  const houses = await housesCollection.find({}).toArray();
  return houses;
};

const remove = async (id) => {
  if (!id) throw "You must provide an id to search for";

  const collection = await houseCollection();
  const houseToRemove = await collection.findOne({ _id: new ObjectId(id) });

  if (!houseToRemove) {
    throw `No house with the id ${id} exists`;
  }

  const deletionInfo = await collection.deleteOne({ _id: new ObjectId(id) });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete house with id of ${id}`;
  }

  return true;
};

const update = async (id, updatedHouse) => {
  if (!id) throw "You must provide an id to search for";

  const collection = await houseCollection();
  const currentHouse = await collection.findOne({ _id: new ObjectId(id) });

  if (!currentHouse) {
    throw `No house with the id ${id} exists`;
  }

  if (!updatedHouse.type || typeof updatedHouse.type !== 'string') {
    throw "You must provide a valid type";
  }

  if (!updatedHouse.category || typeof updatedHouse.category !== 'string') {
    throw "You must provide a valid category";
  }

  if (!updatedHouse.city || typeof updatedHouse.city !== 'string') {
    throw "You must provide a valid city";
  }

  if (!updatedHouse.state || typeof updatedHouse.state !== 'string') {
    throw "You must provide a valid state";
  }

  if (!updatedHouse.zip || typeof updatedHouse.zip !== 'string' || updatedHouse.zip.length !== 5) {
    throw "You must provide a valid zip code";
  }

  if (updatedHouse.rent === undefined || typeof updatedHouse.rent !== 'number') {
    throw "You must provide a valid rent";
  }

  if (!updatedHouse.description || typeof updatedHouse.description !== 'string') {
    throw "You must provide a valid description";
  }

  const updatedHouseData = {
    $set: {
      type: updatedHouse.type,
      category: updatedHouse.category,
      city: updatedHouse.city,
      state: updatedHouse.state,
      zip: updatedHouse.zip,
      rent: updatedHouse.rent,
      description: updatedHouse.description,
      postDate: new Date().toUTCString()
    }
  };

  const updateInfo = await collection.updateOne({ _id: new ObjectId(id) }, updatedHouseData);
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
    throw "Update failed";
  }

  return await collection.findOne({ _id: new ObjectId(id) });
};

export { 
  create, 
  getById, 
  getAll, 
  remove,
  update
};
