import { houses as houseCollection } from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import validation from '../helpers.js';

const housesCollection = await houseCollection();

const createComment = async (
    poster,
    accomodationId,
    comment
  ) => {
    if (comment.trim() == '') throw 'comment cannot be empty';
    comment = comment.trim();
    const now = new Date();
    const commentDate = now.toLocaleString('en-US')

    let newComment = {
        firstName: poster.firstName,
        lastName: poster.lastName,
        emailAddress: poster.emailAddress,
        comment: comment,
        commentDate: commentDate
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