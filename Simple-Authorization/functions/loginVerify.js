
var express = require('express')
var session = require('express-session')

// This does not work fine...
function route_move(req, res, routePass, routeFail){

    if(req.session.username){
        return res.render(String(routePass))
	}
    res.redirect(String(routeFail))
}


//module.exports = check_session
exports.route_move = route_move