'use strict';

import rules from './v1/rules'

export default app => {
	app.use('/rules', rules);
}