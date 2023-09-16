const jwt = require('jsonwebtoken')

const verifyJwt = (req,res,next) =>{
    const authHeader = req.headers.authorization || req.headers.Authorization
    if(!authHeader?.startsWith("Bearer ")) return res.status(401).json({message:"you are not authenticated"})
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoded) =>{
        if (err) return res.status(403).json({error:"invalid token"})
        
        req.Email = decoded.Email
        req.Role = decoded.Role
        next()    
    })
    
}

module.exports = verifyJwt