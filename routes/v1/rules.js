'use strict';

import express from 'express'
import Check from '../../middlewares/check.js'
import Rules from '../../controller/rules/rules'
const router = express.Router()

router.get('/getRules', Check.checkAdmin, Rules.getRules);

export default router