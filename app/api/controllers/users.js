const userModel = require('../models/users');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');				

module.exports = {
	create: function(req, res, next) {
		
		userModel.create({ name: req.body.name, email: req.body.email,role: req.body.role, password: req.body.password }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "User added successfully!!!", data: null});
				  
				});
	},

	authenticate: function(req, res, next) {
		userModel.findOne({email:req.body.email}, function(err, userInfo){
					if (err) {
						next(err);
					} else {

						if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

						 const token = jwt.sign({id: userInfo._id,role:userInfo.role}, req.app.get('secretKey'), { expiresIn: '1h' }); 
						 //var jsonData = JSON.parse(res);
						 //console.log(jsonData);	
						 //console.log(JSON.parse(res));

						 res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
						

						}else{

							res.json({status:"error", message: "Invalid email/password!!!", data:null});

						}
					}
				});
	},

}					
