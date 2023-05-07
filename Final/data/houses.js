import { houses as houseCollection } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import { users } from '../config/mongoCollections.js';
import cloudinary from '../utils/cloudinary.js';

//create new house
const create = async (accommodationData,emailAddress) => {
  let {roomType,roomCategory,gender,city,state,rent,address,description,imageUrls,imagePublicIds}=accommodationData;
  
  roomType=roomType.trim().toLowerCase();
  roomCategory=roomCategory.trim().toLowerCase();
  gender=gender.trim().toLowerCase();
  city=city.trim().toUpperCase();
  state=state.trim();
  address=address.trim();
  description=description.trim();

  if(!roomType || !roomCategory || !gender || !city || !state || !rent || !description || !address){
        throw "Enter all the fields";
  }
      
  if(roomType.trim().length==0 || roomCategory.trim().length==0 || gender.trim().length==0 || city.trim().length==0 || 
            state.trim().length==0 || rent.trim().length==0 || description.trim().length==0 || address.trim().length==0){
  
          throw "The entered field values should not be empty or contain white spaces";
  }
  
  if(!((roomType=="1bhk") ||(roomType=="2bhk") ||(roomType=="3bhk"))){
        throw "The room type needs to be 1BHK,2BHK,3BHK";
  }
      
  if(!((roomCategory=="private") || (roomCategory=="shared"))){
        throw "The room category needs to be either Private or Shared";
  }
  
  if(!((gender=="male") || (gender=="female") || (gender=="any"))){
        throw "The gender needs to be either Male,Female or Any";
  }
  
  let rentCheck=parseInt(rent);
  
  if(typeof rentCheck!="number"){
        throw "Enter numerical values for the rent field";
  }
  
  if(rentCheck<=0){
    throw "Dont't enter values less than or equal to zero"
  }

  let statesList=['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
  
  if(!statesList.includes(state)){
        throw "Do not enter the state out of the states list";
  }
  let descriptionWords=description.trim().split(/\s+/).length;

    let addressWords=address.trim().split(/\s+/).length;

    if(descriptionWords.length>500){
      throw "Description should be less than 500 words";
    }

    if(addressWords.length>30){
      throw "Address should be less than 30 words"
    }
  
  const newAccomodation = {
    roomType: roomType,
    roomCategory: roomCategory,
    gender:gender,
    address:address,
    city: city,
    state: state,
    rent: rent,
    description: description,
    imageUrls:imageUrls,
    imagePublicIds:imagePublicIds,
    postDate: new Date().toLocaleString(),
    comments: [],
    reviews: [],
    emailAddress: emailAddress
  };
  const housesCollection = await houseCollection();
  
  const insertInfo = await housesCollection.insertOne(newAccomodation);
  if (insertInfo.insertedCount === 0) throw 'Could not add house';

  let newId = insertInfo.insertedId;

  await addPostToAccount(newId.toString(),emailAddress);

  const house = await getById(newId.toString()); // Changed this line
  return JSON.parse(JSON.stringify(house));
};

const addPostToAccount=async(accommodationId,email)=>{

  console.log(typeof accommodationId);

  if(!ObjectId.isValid(accommodationId)){
    throw "Error AccomodationId is invalid";
  }

  const userCollection=await users();

  let userAccount=await userCollection.findOne({emailAddress:email});

  if(userAccount==null){
    throw "Error user Account is invalid";
  }

  await userCollection.updateOne({emailAddress:email},{$push:{accommodations:accommodationId}});  

}


const getById = async (id) => {
  if (!id) throw 'You must provide an id to search for';
  const housesCollection = await houseCollection();
  const objId =   ObjectId.createFromHexString(id);
  const house = await housesCollection. findOne({ _id: objId });
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
  const imagePublicIds=houseToRemove.imagePublicIds;

  for (const publicId of imagePublicIds) {
    
    await cloudinary.uploader.destroy(publicId);
  }

  const deletionInfo = await collection.deleteOne({ _id: new ObjectId(id) });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete house with id of ${id}`;
  }

  return true;
};

const update = async (id, updatedAccommodation) => {
  if (!id) throw "You must provide an id to search for";
  const roomType = updatedAccommodation.roomType.trim().toLowerCase();
  const roomCategory = updatedAccommodation.roomCategory.trim().toLowerCase();
  const gender = updatedAccommodation.gender.trim().toLowerCase();
  const city = updatedAccommodation.city.trim().toLowerCase();
  const state = updatedAccommodation.state;
  const rent = updatedAccommodation.rent;
  const address=updatedAccommodation.address;
  const description = updatedAccommodation.description;
  const imageUrls=updatedAccommodation.imageUrls;
  const imagePublicIds=updatedAccommodation.imagePublicIds;
  if(!roomType || !roomCategory || !gender || !city || !state || !rent || !description){
    throw "Enter all the fields";
  }
      
  if(roomType.trim().length==0 || roomCategory.trim().length==0 || gender.trim().length==0 || city.trim().length==0 || 
    state.trim().length==0 || rent.trim().length==0 || description.trim().length==0){
      throw "The entered field values should not be empty or contain white spaces";
  }
  
  if(roomType!="1bhk" && roomType!="2bhk" && roomType!="3bhk"){
    throw "The room type needs to be 1BHK,2BHK,3BHK";
  }
      
  if(roomCategory!="private" && roomCategory!="shared"){
    throw "The room category needs to be either Private or Shared";
  }
  
  if(gender!="male" && gender!="female" && gender!="any"){
    throw "The gender needs to be either Male,Female or Any";
  }
  
  let rentCheck=parseInt(rent);
  
  if(typeof rentCheck!="number"){
    throw "Enter numerical values for the rent field";
  }
  
  if(rentCheck<=0){
    throw "Dont't enter values less than or equal to zero"
  }

  let statesList=['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
  
  if(!statesList.includes(state)){
    throw "Do not enter the state out of the states list";
  }

  let descriptionWords=description.trim().split(/\s+/).length;
    
  let addressWords=address.trim().split(/\s+/).length;
    
  if(descriptionWords.length>500){
    throw "Description should be less than 500 words";
  }
    
  if(addressWords.length>30){
      throw "Address should be less than 30 words"
  }

  const currentHouse=await getById(id);

  let currentImagePublicIds=currentHouse.imagePublicIds;

  for (const publicId of currentImagePublicIds) {
    
    await cloudinary.uploader.destroy(publicId);
  }

  const updatedHouseData = {
    $set: {
      roomType: roomType,
      roomCategory: roomCategory,
      city: city,
      state: state,
      rent: rent,
      address:address,
      description: description,
      imageUrls:imageUrls,
      imagePublicIds:imagePublicIds,
      postDate: new Date().toLocaleString(),
    }
  };

  const housesCollection = await houseCollection();
  const updateInfo = await housesCollection.updateOne({ _id: new ObjectId(id) }, updatedHouseData);
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
    throw "Update failed";
  }

  return await housesCollection.findOne({ _id: new ObjectId(id) });
};


const searchAccommodation=async(
  roomType,
  roomCategory,
  gender,
  city,
  state  
)=>{

  if(!(roomType) || !(roomCategory)){
      throw "Enter the values for room type and category ";
  }

  if(!gender){
      throw "Enter the value for gender "
  }

  if(!state){
      throw "Enter the value for state"
  }
  if(!city){
    throw "Enter the value for city";
  }
  if(roomType.trim().length==0){
      throw "Error room type should not contain empty spaces"
  }

  if(roomCategory.trim().length==0){
      throw "Error room category should not contain empty spaces"
  }

  if(gender.trim().length==0){
      throw "Error gender should not contain empty spaces"
  }

  if(state.trim().length==0){
      throw "Error state should not contain empty spaces"
  }
  roomType=roomType.trim().toLowerCase();
  roomCategory=roomCategory.trim().toLowerCase();
  gender=gender.trim().toLowerCase();
  city=city.trim().toUpperCase();
  state=state.trim();

  let statesList=['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  if(!statesList.includes(state)){
    throw "Do not enter the state out of the states list";
  }
  
  if(!((roomType=="1bhk") || (roomType=="2bhk") || (roomType=="3bhk") || (roomType=="all"))){
    throw "The room type for search needs to be 1BHK,2BHK,3BHK or all";
  }
  
  if(!((roomCategory=="private") || (roomCategory=="shared"))){
    throw "The room category needs to be either Private or Shared";
  }

  if(!((gender=="male") || (gender=="female") || (gender=="any"))){
    throw "The gender needs to be either Male,Female or Any";
  }

  const housesCollection=await houseCollection();

  let resultSet=null;

  if(roomType=="all"){
    
    resultSet=await housesCollection.find({roomCategory:roomCategory,gender:gender,state:state,city:{$regex:`^${city}`, $options: 'i'}}).toArray();
  }
  else{
    resultSet=await housesCollection.find({roomType:roomType,roomCategory:roomCategory,gender:gender,state:state,city:{$regex:`^${city}`, $options: 'i'}}).toArray();

  }


  if(resultSet.length==0){
      throw "could not find the search results";
  }

  return resultSet;
}


export { 
  create, 
  getById, 
  getAll, 
  remove,
  update,
  searchAccommodation
};
