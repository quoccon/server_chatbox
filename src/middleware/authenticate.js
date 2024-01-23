const jwt = require('jsonwebtoken');


exports.authenticateToken = (req,res,next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token,'quoccon12344321',(err,decoded) => {
        if(err){
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = {
            userId : decoded.userId,
        };
        next();
    });
}