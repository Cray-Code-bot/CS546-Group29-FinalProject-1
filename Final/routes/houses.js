import express from 'express';
import * as housesData from '../data/houses.js';
import * as commentsData from '../data/comments.js';
import * as reviewsData from '../data/reviews.js';
import xss from 'xss';
import validation from '../helpers.js';
import upload from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js"
import { getRounds } from 'bcrypt';
import { getUserDetails } from "../data/users.js";

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


router.get("/search",async(req,res)=>{

  let city=req.query.cityTerm;
  let state=req.query.state;
  let roomCategory=req.query.roomCategory;
  let roomType=req.query.roomType;
  let gender=req.query.gender;

  try{

  roomType=roomType.trim().toLowerCase();
  roomCategory=roomCategory.trim().toLowerCase();
  gender=gender.trim().toLowerCase();
  city=city.trim();
  state=state.trim();

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
  }
  catch(error){
    return res.status(400).render("houses/error",{message:error});
  }
  try{
    const housesList=await housesData.searchAccommodation(roomType,roomCategory,gender,city,state);
    res.render("houses/list",{housesList:housesList});
  }
  catch(e){
    res.status(500).render("houses/error", { message:e });
  }
})


router.get("/add", async (req, res) => {
  if (!req.session.user) {
    return res.status(400).render("houses/error", { message: "You need to login"});
  }
  try {
    res.render("houses/add");
  } catch (e) {
    res.status(400).render("houses/error", { error: e });
  }
});

router.post('/post',upload.array("images",10), async (req, res) => {

  if (!req.session.user) {
    return res.status(400).render("houses/error", { message: "You need to login"});
  }

  let emailAddress=xss(req.session.user.emailAddress);

  let roomType=xss(req.body.roomType);
  let roomCategory=xss(req.body.roomCategory);
  let gender=xss(req.body.gender);
  let city=xss(req.body.city);
  let state=xss(req.body.state);
  let rent=xss(req.body.rent);
  let description=xss(req.body.description); 
  let address=xss(req.body.address);
  try {

  roomType=roomType.trim().toLowerCase();
  roomCategory=roomCategory.trim().toLowerCase();
  gender=gender.trim().toLowerCase();
  city=city.trim();
  state=state.trim();
  address=address.trim();
    if(!roomType || !roomCategory || !gender || !city || !state || !rent || !description || !address){
      throw "Enter all the fields";
    }
    
    if(roomType.trim().length==0 || roomCategory.trim().length==0 || gender.trim().length==0 || city.trim().length==0 || 
          state.trim().length==0 || rent.trim().length==0 || description.trim().length==0 || address.length==0){

        throw "The entered field values should not be empty or contain white spaces";
    }

    if(!((roomType=="1bhk") || (roomType=="2bhk") || (roomType=="3bhk"))){
      throw "The room type needs to be 1BHK,2BHK,3BHK";
    }
    
    if(!((roomCategory=="private")|| (roomCategory=="shared"))){
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
    
  } catch (error) {
    return res.status(400).render("houses/error",{message:error});
  }
  let imageUrls=[];

  let imagePublicIds=[];

  try{
    let imageFiles=req.files;

    if(imageFiles.length==0){
        return res.status(400).render("houses/error",{message:"No images attached!"});
    }

   for(const file of imageFiles){
     const result=await cloudinary.uploader.upload(file.path);
     imageUrls.push(result.secure_url);
     imagePublicIds.push(result.public_id);
   }

  }
  catch(err){
    return res.status(400).render("houses/error",{message:err});
  }

  let accommodationInfo={
    roomType:roomType,
    roomCategory:roomCategory,
    gender:gender,
    address:address,
    city:city,
    state:state,
    rent:rent,
    description:description,
    imageUrls:imageUrls,
    imagePublicIds:imagePublicIds,
    emailAddress:emailAddress
  }

  try {
    const newhouse = await housesData.create(accommodationInfo,emailAddress);
    console.log("newhouse", newhouse);
    return res.redirect('/houses/' + newhouse._id);
  } catch (e) {
    console.error('Error during house creation:', e);
    return res.status(400).render("houses/error", { message: "not created", error: e });
  }
});

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Param');
      const house = await housesData.getById(req.params.id);
      const ratings = house.reviews.map(review => review.rating);
      const userInfo = await getUserDetails(req.params.id);
      let sameUser = false;
      if (req.session.user.emailAddress == house.emailAddress) {
        sameUser = true;
      }
      let avg_rating = "";
      if (ratings.length > 0) {
        avg_rating = (ratings.reduce((total, current) => total + current, 0)/ratings.length).toFixed(2);
      }
      return res.status(200).render('houseDetails', { title: 'houseDetails', house: house, rating: avg_rating, 
      userInfo: userInfo, sameUser: sameUser });
    } catch (e) {
      res.status(404).render('houses/error', {message: e});
    }
  })

.post(async (req, res) => {
  try {
    req.params.id = validation.checkId(req.params.id, 'Id URL Param');
    if (req.params.id.trim() == "") throw 'Comment cannot be empty';
  } catch(e) {
    res.status(404).render('houses/error', {title: 'error', message: e})
  }

  try {
    const newComment = await commentsData.createComment(req.session.user, req.params.id, req.body.commentInput);
    if (newComment != true) throw 'new comment cannot be addded'
    const house = await housesData.getById(req.params.id);
    return res.render('houseDetails', { house});
  } catch (e) {
    res.status(400).render('houses/error', {title: 'error', message: e});
  }
});

router.post('/:id/delete', async (req, res) => {
  if (!req.session.user) {
    return res.status(400).render("houses/error", { message: "You need to login"});
  }
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

router.get('/:id/edit', async (req, res) => {
  if (!req.session.user) {
    return res.status(400).render("houses/error", { message: "You need to login"});
  }
  try {
    const house = await housesData.getById(req.params.id);
    res.render('houses/edit', { house });
  } catch (e) {
    res.status(404).render('houses/error', { message: 'House not found', error: e });
  }
});

router.post('/:id/edit', async (req, res) => {
  try {
    
    console.log('req.body.roomType',req.body.roomType);
    let accommodationInfo = {
      roomType:xss(req.body.roomType),
      roomCategory:xss(req.body.roomCategory),
      gender:xss(req.body.gender),
      city:xss(req.body.city),
      state:xss(req.body.state),
      rent:xss(req.body.rent),
      description:xss(req.body.description),
    };

    if (!req.session.user) {
      return res.status(400).render("houses/error", { message: "You need to login"});
    }

    const updatedAccommodation = await housesData.update(req.params.id, accommodationInfo);
    res.redirect('/houses');
  } catch (e) {
    console.error('Error during house update:', e);
    res.status(500).render('houses/error', { message: `Update failed: ${e.message}`, error: e });
  }
});


router.post('/houses', async (req, res) => {
  if (!req.session.user) {
    return res.status(400).render("houses/error", { message: "You need to login"});
  }
  try {
    const newHouse = await housesData.create(req.body);
    res.status(201).json(newHouse);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});




export default router;
