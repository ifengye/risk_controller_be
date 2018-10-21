'use strict';

import rules from './v1/rules';
import users from './v1/users';

export default app => {
	app.use('/rules', rules);
	app.use('/users', users);
}