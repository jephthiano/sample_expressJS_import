import express from 'express';
import auth from '#route/v1/auth.rou';
import fetch from '#route/v1/fetch.rou';
import test from '#route/v1/test.rou';
import { tokenValidator } from '#middleware/tokenValidator';
import { returnNotFound} from '#core_util/handler.util';

const router = new express.Router();

// USING ROUTES
router.use("/test", test);// test route
router.use("/auth",auth);// auth route
router.use("/fetch", tokenValidator, fetch);// fetch route
// router.use("/profile", tokenValidator, profile);// profile 

router.use('*', (req, res) => {
    returnNotFound(res, 'Invalid request');
})

export default router;