import { Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

/* Modules */
import xssValidator from '../modules/xssProtection';

/* Middlewares */
import isUserAuthenticated from '../middlewares/isUserAuthenticated';

const router = new Router();

/* Login Router */
router.get("/login", isUserAuthenticated, (req, res) => {
    res.render("auth/login");
})

/* Sign up router */
router.get("/register", isUserAuthenticated, (req, res) => {
    res.render("auth/register");
});

/* Authentication process */
router.post("/login", isUserAuthenticated, async (req, res) => {

    let email = xssValidator(req.body.email);
    let password = req.body.password;

    const userExists = await User.findOne( { email: email }, (err, user) => {
        if(err)
            res.logger.error(err);
        return user;
    } )

    if(!userExists) {
        return res.send({
            "success": false,
            "reason": "Email doesn't exist"
        })
    }

    let passwordMatch = bcrypt.compareSync(password, userExists.password);
    if(passwordMatch) {
        req.session.user = userExists;
        return res.send({
            success: true,
            reason: "Logged in"
        });
    } else {
        return res.send({
            "success": false,
            "reason": "Incorrect password"
        });
    }

});

router.post("/register", isUserAuthenticated, async (req, res) => {
    
    // TODO: Email Verification

    /* Parse Inputs */
    let username = xssValidator(req.body.username);
    let email = xssValidator(req.body.email);
    let password = req.body.password;
    /* Salt and hash the password */
    password = bcrypt.hashSync(password, 10);

    /* Validations */
    const userExists = await User.findOne( { $or: [{username: username}, {email: email}] }, (err, user) => {
        if(err)
            res.logger.error(err);
        return user;
    });

    if(userExists) {
        return res.send({
            "success": false,
            "reason": "Username or email already registered!"
        })
    }

    const toRegister = new User({
        username: username,
        email: email,
        password, password
    })

    toRegister.save();
    res.send({
        "success": true,
        "reason": "Successfully registered!"
    })
});

export default router;