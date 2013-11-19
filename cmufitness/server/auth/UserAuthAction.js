/*=====================================================
high level API that uses the UserAuthService.js
/*=====================================================*/


var C = {
    MaxCookieAge: 900000
}

function UserAuthAction(userAuthService) {
    this.userAuthService = userAuthService;
}


/* function to get user account info when logged in and directly send it as response */
UserAuthAction.prototype.getUserAccount = function(request, done) {
    if (!this.isLoggedIn_(request)) {
        done('Not logged in', null);
    } else {
        var username = request.cookies.username;
        var password = request.cookies.password;
        this.userAccountService.getUserAccount(username, password, done);
    }
}

UserAuthAction.prototype.isLoggedIn_ = function(request) {
    return (request.session.username !== undefined &&
            request.cookies.username !== undefined &&
            request.cookies.password !== undefined);
}

/* modify response cookies and send the user account info */
UserAuthAction.prototype.login = function(request, response, done){
    var username = request.body.username;
    var password = request.body.password;
    /* result is the user account document on query by username */
    this.userAuthService.getUserAccount(username, password, function(err, result){
        if (err && typeof err === 'string')
            done(err);
        else if (err)
            done('unknown error');
        else {
            response.cookie('username', username, { maxAge: C.MaxCookieAge });
            response.cookie('password', password, { maxAge: C.MaxCookieAge });
            request.session.username = username;
            done(err, result);
        }
    });

}

UserAuthAction.prototype.register = function(request, response, done) {
    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email;
    /* result is the user account document returned */
    this.userAuthService.createNewUser(username, password, email, function(err, result){
        if (err && typeof err === 'string')
            done(err);
        else if (err)
            done('unknown error');
        else {
            response.cookie('username', username, { maxAge: C.MaxCookieAge });
            response.cookie('password', password, { maxAge: C.MaxCookieAge });
            ///can't set property of undefined?: request.session.username = username;
            done(err, result);
        }
    });   
}

module.exports = UserAuthAction;




