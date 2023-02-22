const jwt = require('jsonwebtoken');
const JWT_SECRET='pranayisagood$boy';

const fetchuser =(req,res,next)=>{
    const token= req.header('auth-token');
    if(!token){
        res.status(404).send({error: " please provide avalid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        //console.log(data)
        next();
    } catch (error) {
        res.status(401).send({error: " please authinticate using a valid token"})
    }
    
}

module.exports = fetchuser;