/*=====================================================
high level API that uses the UserAuthService.js
/*=====================================================*/

/*** set max cookie age ****/

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

/* Log out a user by clearing the session ID and cookies */
UserAuthAction.prototype.logout = function(request, response, done) {
    response.clearCookie('username');
    response.clearCookie('password');
    delete request.session.id;
}

/* set cookies and sessionID */
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
            response.cookie('username', username);
            response.cookie('password', password);
            request.session.id = result._id;
            done(err, result);
        }
    });

}

UserAuthAction.prototype.register = function(request, response, done) {
    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email;
    /* result is the user document returned */
    this.userAuthService.createNewUser(username, password, email, function(err, result){
        if (err && typeof err === 'string')
            done(err);
        else if (err)
            done('unknown error');
        else {
            response.cookie('username', username);
            response.cookie('password', password);
            request.session.id = result._id;
            done(err, result);
        }
    });   
}

/* call this function before responding to any request, if cookies are present
    will use existing session */
UserAuthAction.prototype.checkLogin = function(request, response, done){
    if (this.isLoggedIn(request))
        done(null);
    else {
        this.loginUsingCookies_(request, response, function(err){
            if (err)
                done(err);
            else 
                done(null);
        });
    }
}

UserAuthAction.prototype.loginUsingCookies_ = function(request, response, done){
    var username = request.cookies.username;
    var password = request.cookies.password;
    if (username === undefined || password === undefined){
        done('no login data present');
    }
    else {
        this.userAuthService.getAccount(username, password, function(err, result){
            if (err){
                response.clearCookie('username');
                response.clearCookie('password');
                if (typeof err === 'string'){
                    done(err);
                }
                else {
                    done('unknown error');
                }
            }
            else {
                request.session.id = result._id;
                done(null);
            }
        });
    }
}



module.exports = UserAuthAction;




