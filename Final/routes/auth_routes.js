//import express, express router as shown in lecture code
import { Router } from "express";
import { checkUser, createUser } from "../data/users.js";
import session from "express-session";


const router = Router();

router.route("/").get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/register")
  .get(async (req, res) => {
    //code here for GET
    res.render("register");
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
      return res
        .render("register")
        .status(400)
        .json({ error: "First name is missing" });
    }

    if (!lastNameInput) {
      return res
        .render("register")
        .status(400)
        .json({ error: "Last name is missing" });
    }

    if (!emailAddressInput) {
      return res
        .render("register")
        .status(400)
        .json({ error: "Email address is missing" });
    }

    if (!passwordInput) {
      
      res.status(400);
      res.json({error:"passwordInput is missing"})
    }

    if (!confirmPasswordInput) {
      return res
        .render("register")
        .status(400)
        .json({ error: "confirmPassword is missing" });
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
      return res.status(400).json({ error: e });
    }

    try {
      if (passwordInput !== confirmPasswordInput) {
        throw "Error both the password and confirm password need to be same";
      }
    } catch (e) {
      return res.status(400).json({ error: e });
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
      return res.status(400).json({ error: e });
    }
   
    let result = null;
    try {
      result = await createUser(
        firstNameInput,
        lastNameInput,
        emailAddressInput,
        passwordInput,
      );
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    if (result.insertedUser == true) {
      res.redirect("login");
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router
  .route("/login")
  .get(async (req, res) => {
    //code here for GET
    res.render("login");
  })

router.route("/protected").get(async (req, res) => {
  //code here for GET
  let today = new Date();
  let currentTime =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  if (req.session.user) {
    res.render("protected", {
      firstName: req.session.user.firstName,
      currentTime: currentTime,
      role: req.session.user.role,
    });
  }
});


router.route("/error").get(async (req, res) => {
  //code here for GET
});




export default router;
