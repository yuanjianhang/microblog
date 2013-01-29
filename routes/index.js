/*
 * GET home page.
 */
module.exports = {
	index: function(req, res) {
		res.render("index", {
			title: "首页"
		});
	},
	reg: function(req, res) {
		res.render("reg", {
			title: "用户注册"
		});
	}
};