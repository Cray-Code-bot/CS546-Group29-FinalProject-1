import express from 'express';
import * as housesData from '../data/houses.js';
import * as commentsData from '../data/comments.js';
import * as reviewsData from '../data/reviews.js';
import xss from 'xss';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const reviewsList = await reviewsData.getAll();
        res.status(200).json(reviewsList);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get("/:id/add", async (req, res) => {
    
    try {
        const review = await reviewsData.getById(req.params.id);
        res.render('reviews/add', { review });
    } catch (e) {
        res.status(400).render("reviews/error", { error: e });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
        const houseId = await reviewsData.getById(req.params.id).houseId;
        res.redirect(`/houses/${houseId}`);
    } catch (e) {
        res.status(404).render("reviews/error", { error: e });
    }
});

router.post('/:id', async (req, res) => {
    try {
        console.log(req.session.user)
        const reviewData = {
            houseId: xss(req.params.id),
            user: xss(req.session.user.emailAddress),
            rating: parseFloat(xss(req.body.rating)),
            reviewText: xss(req.body.reviewText),
        };
         
        if (!req.session.user) {
            return res.status(400).render("reviews/error", { message: "You need to login"});
        }

        console.log('reviewsData before create:', reviewData);

        const newReview = await reviewsData.create(reviewData);
        console.log("newReview", newReview);
        res.redirect('/houses/' + newReview.houseId);
    } catch (e) {
        console.error('Error during review creation:', e);
        res.status(500).render("reviews/error", { message: `not added: ${e.message}`, error: e });

    }
     
});

router.get('/house/:houseId', async (req, res) => {
    try {
        const houseId = req.params.houseId;
        const reviews = await reviewsData.getReviewsByHouseId(houseId);
        res.status(200).json(reviews);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedreviewsData = {
        rating: parseFloat(xss(req.body.rating)),
        reviewText: xss(req.body.reviewText),
      };
        await reviewsData.update(req.params.id, updatedreviewsData);
        res.status(200).json(await reviewsData.getById(req.params.id));
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
  
router.post('/:id/delete', async (req, res) => {
    if (!req.session.user) {
      return res.status(400).render("reviews/error", { message: "You need to login"});
    }

    try {
        const reviewId = req.params.id;
        const review = await reviewsData.getById(reviewId);
        /*if (req.session.user.emailAddress !== review.user) {
            return res.status(400).render("reviews/error", { message: "You are not the owner of this house"});
        }*/
        const houseId = review.houseId
        await reviewsData.remove(reviewId);
        res.redirect('/houses/' + houseId);
    } catch (e) {
        console.error('Error during house deletion:', e);
        res.status(400).render('reviews/error', { message: 'review not deleted', error: e });
    }
});

export default router;