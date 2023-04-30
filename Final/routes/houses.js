import express from 'express';
import * as housesData from '../data/houses.js';
import xss from 'xss';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const housesList = await housesData.getAll();
        //the handlnars
        res.status(200).render("houses/list", { housesList, successMessage: req.query.successMessage  });
    } catch (e) {
        res.status(400).render("houses/error", { error: e });
    }
});

router.get('/list', async (req, res) => {
  try {
    const housesList = await housesData.getAll();
    console.log("housesList", housesList);
    res.render('houses/list', { housesList: housesList });
  } catch (e) {
    console.error(e);
    res.status(500).render("houses/error", { message: "An error occurred while fetching the houses list.", error: e });
  }
});

router.get("/add", async (req, res) => {
  try {
    res.render("houses/add");
  } catch (e) {
    res.status(400).render("houses/error", { error: e });
  }
});

function validateHouseInfo(houseInfo) {
  const { type, category, city, state, zip, rent } = houseInfo;

  if (!type || !category || !city || !state || !zip || !rent) {
    return { valid: false, message: "Please enter all the fields." };
  }

  if(type.trim().length == 0 || category.trim().length == 0 || city.trim().length == 0 || state.trim().length == 0|| zip.trim().length == 0|| rent.trim().length == 0) {
    return { valid: false, message: "Please do not only enter space." };
  }

  if (typeof type !== 'string' || typeof category !== 'string' || typeof city !== 'string' || typeof state !== 'string' || typeof zip !== 'string' || typeof parseFloat(rent) !== 'number') {
    return { valid: false, message: "Invalid data type." };
  }

  return { valid: true };
}

router.post('/post', async (req, res) => {
  let houseInfo = {
    type: xss(req.body.type),
    category: xss(req.body.category),
    city: xss(req.body.city),
    state: xss(req.body.state),
    zip: xss(req.body.zip),
    rent: xss(req.body.rent),
    description: xss(req.body.description)
  };

  const validationResult = validateHouseInfo(houseInfo);
  if (!validationResult.valid) {
    return res.status(400).render("houses/error", { message: validationResult.message });
  }

  console.log('houseInfo before create:', houseInfo);

  try {
    const newhouse = await housesData.create(houseInfo);
    console.log("newhouse", newhouse);
    res.status(200).render("houses/message", { message: "house created successfully" });
  } catch (e) {
    console.error('Error during house creation:', e);
    res.status(400).render("houses/error", { message: "not created", error: e });
  }
});

router.get('/house/:id/delete', async (req, res) => {
  try {
    const houseId = req.params.id;
    console.log('Deleting house with id:', houseId);
    await housesData.remove(houseId);
    res.status(200).render('houses/message', { message: 'House deleted successfully' });
  } catch (e) {
    console.error('Error during house deletion:', e);
    res.status(400).render('houses/error', { message: 'House not deleted', error: e });
  }
});

router.put('/:id/edit', async (req, res) => {
  try {
    const updatedHouse = await housesData.update(req.params.id, req.body);
    res.status(200).json(updatedHouse);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
/*
router.get('/:id/edit', async (req, res) => {
  try {
    const house = await housesData.get(req.params.id);
    res.render('houses/edit', { house });
  } catch (e) {
    res.status(404).render('houses/error', { error: e });
  }
});*/

export default router;