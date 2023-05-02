import { houses as houseCollection } from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import validation from '../helpers.js';

const housesCollection = await houseCollection();

const createComment = async (
    poster,
    accomodationId,
    comment
  ) => {
    let newComment = {
        firstName: poster.firstName,
        lastName: poster.lastName,
        emailAddress: poster.emailAddress,
        accomodationId: accomodationId,
        comment: comment,
        commentDate: new Date().toUTCString()
    };

    const updateComment = await housesCollection.updateOne(
      {_id: new ObjectId(accomodationId)}, 
      {$push: {comments: newComment}}, 
      {returnDocument: 'after'});
    
    if (updateComment.modifiedCount === 0) {
      throw `could not add comments to post ${accomodationId}`;
    }
    return true;
  };

  export {createComment};