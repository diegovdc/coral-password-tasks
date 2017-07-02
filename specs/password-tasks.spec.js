const expect = require("chai").expect;
const hashPassword = require('../password-tasks').hashPassword;
const isValidPassword = require('../password-tasks').isValidPassword;


describe('Password Tasks', () => {
	const saltRounds = 10;
	const someOtherPlaintextPassword = 'not_bacon';
	let hashed_pass;
	let task_hashed_password;


	describe('hashPassword', () => {
		it('hashes a password', (done) => {
			hashPassword(saltRounds, someOtherPlaintextPassword).fork( 
				e => {
					console.log(e)
					done(e)
				},
				hash => {
					task_hashed_password = hash;
		    		expect(hash).to.not.equal(someOtherPlaintextPassword)
		    		done();
				} 
			)
		});
	});

	describe('isValidPassword', () => {//depends on a variable created by hashPassword
		it('verifies that a plain text password corresponds to it hashed version', (done) => {
			isValidPassword(someOtherPlaintextPassword, task_hashed_password).fork( 
				e => done(e),
				validity => {
		    		expect(validity).to.equal(true)
		    		done();
				} 
			)
		});

		it('verifies that a wrong plain text password does not correspond it hashed version', (done) => {
			isValidPassword('blablaPassworrrrrd', task_hashed_password).fork( 
				e => done(e),
				validity => {
		    		expect(validity).to.equal(false)
		    		done();
				} 
			)
		});
	})
});
