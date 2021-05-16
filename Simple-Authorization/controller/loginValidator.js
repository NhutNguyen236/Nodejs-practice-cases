/**
 * Check username session
 * Jump to routePass if session is set else jump back routeFail 
 */
function routeJump(req, res, routePass, routeFail){
    var user = req.session.username
    var quote = undefined

    if(user && user == 1){
        quote = 'Casual User'
        // Always pass Object here when render, no String , no Number
        // If you dont convert it to the right type, you will meet this error in link down below
        // https://teamtreehouse.com/community/error-in-express-when-rendering-with-es6-shorthand
        return res.render(routePass, {user, quote: quote})
    }
    else if(user && user == 2){
        quote = 'VIP User'
        return res.render(routePass, {user, quote: quote})
    }
    return res.redirect(routeFail)
}

exports.routeJump = routeJump