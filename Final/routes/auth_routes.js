//import express, express router as shown in lecture code
import { Router } from "express";
import { checkUser, createUser, getUserDetails } from "../data/users.js";
import session from "express-session";
import validation from '../helpers.js';
import * as housesData from '../data/houses.js';

const router = Router();

router.route("/").get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/register")
  .get(async (req, res) => {
    //code here for GET
    res.render("register",{title: 'Register'});
  })
  .post(async (req, res) => {
    //code here for POST
    let {
      firstNameInput,
      lastNameInput,
      emailAddressInput,
      passwordInput,
      confirmPasswordInput,
    } = req.body;


    if (!firstNameInput) {
      
      return res.status(400).render("register", { message: "First name is missing"});
    }

    if (!lastNameInput) {
      return res.status(400).render("register",{message:"Last name is missing"});
    }

    if (!emailAddressInput) {

      return res.status(400).render("register",{message:"Email address is missing"});
    }

    if (!passwordInput) {
      
      return res.status(400).render("register",{message:"passwordInput is missing"});
    }

    if (!confirmPasswordInput) {
      return res.status(400).render("register",{message:"confirmPassword is missing"});
    }

    try {
      if (firstNameInput.trim().length == 0) {
        throw "Error firstname should not contain empty spaces";
      }

      if (firstNameInput.length < 2) {
        throw "Error firstName length should be atleast 2 characters";
      }

      if (firstNameInput.length > 25) {
        throw "Error firstName length should be upto 25 characters";
      }

      if (lastNameInput.trim().length == 0) {
        throw "Error lastName should not contain empty spaces";
      }

      if (lastNameInput.length < 2) {
        throw "Error lastName length should be atleast 2 characters";
      }

      if (lastNameInput.length > 25) {
        throw "Error lastName length should be upto 25 characters";
      }
    } catch (e) {
      return res.status(400).render("error",{message:e});
    }

    try {
      if (passwordInput !== confirmPasswordInput) {
        throw "Error both the password and confirm password need to be same";
      }
    } catch (e) {
      return res.status(400).render("error",{message:e});
    }
    try {
      let regex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^*?&])[A-Za-z\d@#$!%^*?&]{8,}$/;

      if (!regex.test(passwordInput)) {
        throw "Error password should contain at least one captial letter,special character or number ";
      }

      let regex2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!regex2.test(emailAddressInput)) {
        throw "Email address needs to be valid";
      }
    } catch (e) {
      return res.status(400).render("error",{message:e});;
    }
   
    let result = null;
    try {
      result = await createUser(
        firstNameInput,
        lastNameInput,
        emailAddressInput,
        passwordInput,
      );
    } catch (error) {
      return res.status(400).render("error",{message:error });;
    }
    if (result.user) {
      res.redirect("login");
    } else {
      return res.status(400).render("error",{message:"User registration failed"});;
    }
  });

router
  .route("/login")
  .get(async (req, res) => {
    //code here for GET
    res.render('login', {title:'login'});
  })
  .post(async (req, res) => {
    //code here for POST
    let emailAddressInput = req.body.emailAddressInput;
    let passwordInput = req.body.passwordInput;
    try {
      emailAddressInput = validation.checkEmail(emailAddressInput);
      passwordInput = validation.checkPassword(passwordInput);
    } catch (e) {
      return res.status(400).render('login', {title: 'Error', message: e});
    }

    try {
      const user = await checkUser(emailAddressInput, passwordInput);
      req.session.user = {firstName: user.firstName, lastName: user.lastName, emailAddress: user.emailAddress};
      res.redirect('/dashboard');
    } catch (e) {
      res.status(400).render('login', {title: 'Error', message: e});
    }
});
  
router.route("/dashboard")
  .get(async (req, res) => {
    if (req.session.user) {
      try {
        let usersList = []
        const housesList = await housesData.getAll();
        for (let i = 0; i < housesList.length; i++) {
          const userInfo = await getUserDetails(housesList[i]._id.toString());
          if (userInfo) {
            housesList[i].firstName = userInfo.firstName;
            housesList[i].lastName = userInfo.lastName;
          }
          let ratings = housesList[i].reviews.map(review => review.rating);
          let avg_rating = "";
          if (ratings.length > 0) {
            ratings = ratings.map(rating => parseFloat(rating));
            housesList[i].avg_rating = (ratings.reduce((total, current) => total + current, 0)/ratings.length).toFixed(2);
          }
        }
        res.status(200).render('dashboard', {title: 'dashboard', houses: housesList});
      } catch (e) {
        res.status(400).render("error", { title: 'error', message: e });
      }
      return;
    } else {
      res.redirect('/login');
    }
  })

  router.route("/userProfile")
  .get(async (req, res) => {
    if (req.session.user) {
      try {
        const housesList = await housesData.getByUserId(req.session.user.emailAddress);
        res.status(200).render('userProfile', {title: "User Profile", firstName: req.session.user.firstName, lastName: req.session.user.lastName, emailAddress: req.session.user.emailAddress, accommodations: housesList});
      } catch (e) {
        res.status(400).render("error", { title: 'error', message: e });
      }
      return;
    } else {
      res.redirect('/login');
    }
  })

router.route("/error").get(async (req, res) => {
  //code here for GET
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  if (req.session.user) {
    req.session.destroy()
    res.render('logout', {title: "logout"})
  }
});

export default router;
