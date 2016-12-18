// configure the accounts UI to usernames instead of email addresses
// this can be used for signing-up

import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY',
});