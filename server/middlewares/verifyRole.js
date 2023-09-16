const verifyRole = (Role) =>{
    return (req,res,next) =>{
        if (!req?.Role) return res.sendStatus(401)
        if (req.Role !== Role){
            return res.status(401).json({messages:"No Admin Privileges"})
        }
        next()
    }
}

module.exports = verifyRole