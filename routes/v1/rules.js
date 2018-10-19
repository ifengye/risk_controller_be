'use strict';

import express from 'express'
import Rules from '../../controller/rules/rules'
const router = express.Router()

router.get('/getRules', Rules.getRules);

export default router