const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const verifyRevokingRefreshToken = async (req,res,next) => {
    try{
        const foundUser = await prisma.user.findUnique({
            where:{
                Email:req.Email
            }
        })
        if(!foundUser?.RefreshToken){
            res.clearCookie("token",{httpOnly:true, maxAge: 7 * 24 * 60 * 60 * 1000, secure:true, sameSite:'None'})
            return res.sendStatus(401)
        }
        else{
            next()
        }
    }
    catch (error){
        console.log(error)
    }
}
module.exports = verifyRevokingRefreshToken

