import express from 'express';
import * as housesData from '../data/houses.js';
import * as reviewsData from '../data/reviews.js';
import xss from 'xss';

const router = express.Router();

router.get('/:accommodationId', async (req, res) => {
    try {
      const accommodationId = xss(req.params.accommodationId);
      const house = await housesData.getById(accommodationId);
      let addReview = true;
      if (house.reviews.map(review => review.emailAddress).includes(req.session.user.emailAddress) || house.emailAddress == req.session.user.emailAddress) {
        addReview = false;
      }
      for (let i = 0; i < house.reviews.length; i++) {
        if (req.session.user.emailAddress == house.reviews[i].emailAddress ) {
            house.reviews[i].reviewed = true;
        }
      }
      res.status(200).render('houseReviews', { title: 'Reviews', house: house, addReview: addReview });
    } catch (e) {
      res.status(400).render('reviews/message', {title: 'Reviews not found', message: 'Reviews not found', error: e });
    }
});

router.post('/:accommodationId', async (req, res) => {
    try {
        const accommodationId = xss(req.params.accommodationId);
        const reviewData = {
            rating: xss(parseFloat(req.body.rating)),
            review: xss(req.body.review),
      };
        console.log("reviewData", reviewData);
  
        const newReview = await reviewsData.createReview(req.session.user, accommodationId, reviewData);
        console.log("newReview", newReview);
        res.status(201).json({ success: true, message: 'Review created successfully', newReview });
    } catch (e) {
        console.error('Error during review creation:', e);
        res.status(400).json({ success: false, message: 'Review not created', error: e });
    }  
});   
  
  
router.post('/:accommodationId/:reviewId/delete', async (req, res) => {
    if (!req.session.user) {
        res.redirect("/login");
    }
  
    const { accommodationId, reviewId } = req.params;
    const userEmail = req.session.user.emailAddress;
    
    console.log('Accommodation ID:', accommodationId);
    console.log('Review ID:', reviewId);
  
    try {
        await reviewsData.deleteReview(accommodationId, userEmail, reviewId);
        res.status(200).render('reviews/message', {title: 'Review Deleted', message: 'Review deleted successfully', accommodationId: accommodationId});
    } catch (e) {
        console.error('Error during review deletion:', e);
        res.status(400).render('reviews/message', {title: 'Review Deletion Error',  message: 'Review not deleted', error: e });
    }
});

export default router;
