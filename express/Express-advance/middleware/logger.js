function log(req, res, next){
    console.log('logging...');
    next();
};
function Authenticating(req, res, next){
    console.log('Authenticating...');
    next();
}

module.exports.log = log;
module.exports.auth = Authenticating;