import express from 'express';
import FetchController from '#controller/v1/FetchController.cla';

const router = new express.Router();


router.get('/refetch', async(req,res) => {
    FetchController.appFetchData(req, res);
});

export default router;