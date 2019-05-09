module.exports = function(req, res, next){
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  //NOTE should be checking token process. Put always true for any token
  next();
}
