const R  = require('ramda');
const Task  = require('data.task');
const bcrypt = require('bcrypt');


// hashPassword :: Int -> String -> String
const hashPassword = R.curry((salt_rounds, password) =>  
	new Task((reject, resolve) => 
		bcrypt.genSalt(salt_rounds, (err, salt) => {
			if(err) {
				reject(`There was a error while generating a salt: \n${err}`)
				return;
			}
		    bcrypt.hash(password, salt, (err, hash) => {
		    	err ? reject(`There was a error while generating the password: \n${err}`) : resolve(hash)
		    	
		    }
		    );
		})
	)
);

// isValidPassword :: String -> String -> Bool
const isValidPassword = R.curry( (plain_pass, hashed_pass) =>  
	new Task( (reject, resolve) => 
		bcrypt.compare( plain_pass, hashed_pass, (err, res) => 
			err ? reject(err) : resolve(res))
	)
);


module.exports = {
	hashPassword,
	isValidPassword
};