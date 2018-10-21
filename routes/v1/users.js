'use strict';

import express from 'express';
import Rules from '../../app/http/controllers/UserController';
const router = express.Router();

router.get('/getUserInfo', Rules.getUserInfo);

export default router;