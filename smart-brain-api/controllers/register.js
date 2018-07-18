const jwt = require('jsonwebtoken');

const redisClient = require('./signin').redisClient;


const handleRegister = (db, bcrypt, req, res) => {
	const {email, name, password} = req.body;
	if(!email || !name || !password){
		return Promise.reject("incorrect form submission");
	}
	const hash = bcrypt.hashSync(password);
	return db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.then(user => user[0])
			.catch(err => Promise.reject('unable to get user'))
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => Promise.reject("unabel to register"))
	
}

const getAuthTokenId = (req, res) => {
	const  { authorization } = req.headers;
	return redisClient.get(authorization, (err, reply) =>{
		if (err || !reply){
			return res.status(400).json("Unauthorized");
		}
		return res.json({id: reply})
	})
}

const signToken = (email) => {
	const jwtPayload = { email };
	return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' });
}

const setToken = (key, value) => {
	//return promise need instal external libray 
	return Promise.resolve(redisClient.set(key, value))
}

const createSessions = (user) => {
	//this function create a session user
	//JWT toke, return user data
	//install jsonwebtoken
	const { email, id } = user;
	const token = signToken(email);
	return setToken(token, id)
		.then(() => {
			return { success: 'true', userId: id, token }
		})
		.catch(console.log)
}

const registerAuthentification = (db, bcrypt) => (req, res) => {
	const { authorization } = req.headers;
	return authorization ? 
		getAuthTokenId(req, res) : 
		handleRegister(db, bcrypt, req, res)
		.then(data => {
			return data.id && data.email ? createSessions(data) : Promise.reject(data)
		})
		.then(session => res.json(session))
		.catch(err => res.status(400).json(err))
}



module.exports = {
	registerAuthentification: registerAuthentification
}