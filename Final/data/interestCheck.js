import { houses as houseCollection } from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

const housesCollection = await houseCollection();

const createInterest = async (
    accomodationId,
    name,
    number
  ) => {
    if (number == "") throw 'Phone number cannot be empty!';
    if(typeof number!="number")
    {
      throw "Enter numerical values only for the phone number. Do not include +, -, or ()!";
    }
    if(number.length > 25)
    {
      throw "A phone number can have a maximum of 25 digits."
    }

    let newInterest = {
        name: name,
        number: number
    };

    const updateInterest = await housesCollection.updateOne(
      {_id: new ObjectId(accomodationId)}, 
      {$push: {interest: newInterest}}, 
      {returnDocument: 'after'});
    
    if (updateInterest.modifiedCount === 0) {
      throw `Could not add your phone number to post ${accomodationId}`;
    }
    return true;
  };

  export {createInterest};