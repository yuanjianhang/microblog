var crypto = require("crypto");
var User = require("../models/user.js");
/*
 * GET home page.
 */
module.exports = {
	index: function(req, res) {
		console.log(res.locals.success);
		console.log(res.locals.error);
		var data = {
			title: "首页",
			user: req.session.user || null,
			success: res.locals.success || "",
			error: res.locals.error || ""
		};
		res.render("index", data);
	},
	reg: function(req, res) {
		res.render("reg", {
			title: "用户注册"
		});
	},
	postReg: function(req, res) {
		if ( req.body["password-repeat"] != req.body["password"] ) {
			res.locals.error = "两次输入的密码不一致";
			return res.redirect("/reg");
		}

		var md5 = crypto.createHash("md5");
		var password = md5.update(req.body.password).digest("base64");

		var newUser = new User({
			name: req.body.username,
			password: password
		});
		console.log(newUser);

		//检测用户名是否存在
		User.get(newUser.name, function(err, user) {
			if ( user ) {
				err = "username already exists";
			}
			if (err) {
				res.locals.error = err;
				return res.redirect("/reg");
			};
			//否则新增用户
			newUser.save(function(err) {
				if ( err ) {
					res.locals.error = err;
					return res.redirect("/reg");
				}
				req.session.user = newUser;
				res.locals.user = newUser;
				res.locals.success = "注册成功";
				res.redirect("/");
			});
		});
	}
};