const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

// solved the login with th refresh token
const login = async (req,res) =>{
    const {Email,Password} = req.body
    if(!Email || !Password) return res.status(400).json({message:"Email And Password are required"})
    try{
        const user = await prisma.user.findUnique({
            where:{
                Email:Email,

            }
        })
    if(!user) return res.status(401).json({message:"No user found with this email",origin:"Email"})

        const match = await bcrypt.compare(Password,user.Password)
        if (!match) return res.status(401).json({message:"Incorrect Password",origin:"Password"})

        const accessToken = jwt.sign(
            { Email:user.Email, Role:user.Role },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"}
        )
        const refreshToken = jwt.sign(
            { Email:user.Email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"7d"}
        )

        await prisma.user.update({
            where:{
                Id:user.Id
            },
            data:{
                RefreshToken:refreshToken
            }
        })

        res.cookie("token",refreshToken,{httpOnly:true, maxAge: 7 * 24 * 60 * 60 * 1000, secure:true, sameSite:'None'})

        return res.status(200).json({accessToken,Role:user.Role})

        // if(!!user){
        //     bcrypt.compare(String(Password), user.Password, (err, response) => {
        //         if (err) return res.status(500).json({ error: "Password compare error" });
        //         if (response) {
        //             const infos = {
        //                 fname:user.Fname,
        //                 lname:user.Lname,
        //                 id:user.Id,
        //                 email:user.Email,
        //                 plan:user.Plan,
        //                 subscription:user.Subscription,
        //                 role:user.Role
                        
        //             }
        //             const token = jwt.sign(infos,"Omega-Lambda-7-X-L-9-somethingig",{expiresIn:"2m"})
        //             res.cookie('token',token) // i need to make the cookie max aged
        //             // res.cookie('token',token,{ maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true })
        //             return res.json({ status: "success",infos,token });
        //         } 
        //         else {
        //           return res.status(401).json({ error: "Incorrect password" });
        //         }
        //       });
        // }
        // else{
        //     return res.status(404).json({ error: `No user with this email in the database`})
        // }
    }
    catch (e){
        res.status(500).json({ error: `can't log user an error occured`,error:e.message });

    }
    finally{
        prisma.$disconnect();
    }
}
//! helper function
const getUserModules = async (sem1,sem2,plan,subscription) =>{
    let userModules;
    if(sem1 && !sem2){
        if(subscription === "FREE"){
            userModules = await prisma.module.findMany({
                where:{
                    isFree:true,
                    Year:plan,
                    Semester:'SEMESTER1',
                },
                select:{
                    Id:true
                }
            })
        }
        else{
            userModules = await prisma.module.findMany({
                where:{
                    
                    Year:plan,
                    Semester:'SEMESTER1',
                },
                select:{
                    Id:true
                }
            })
        }
    }
    else if(sem2 && !sem1){
        if(subscription === "FREE"){
            userModules = await prisma.module.findMany({
                where:{
                    isFree:true,
                    Year:plan,
                    Semester:'SEMESTER2',
                },
                select:{
                    Id:true
                }
            })
  
        }
        else{
            userModules = await prisma.module.findMany({
                where:{
                    Year:plan,
                    Semester:'SEMESTER2',
                },
                select:{
                    Id:true
                }
            })
        }
    }
    else if (sem1 && sem2){
        if(subscription === "FREE"){
            const sem1 = await prisma.module.findMany({
                where:{
                    isFree:true,
                    Year:plan,
                    Semester:'SEMESTER1',
                },
                select:{
                    Id:true
                }
            })
            const sem2 = await prisma.module.findMany({
                where:{
                    isFree:true,
                    Year:plan,
                    Semester:'SEMESTER2',
                },
                select:{
                    Id:true
                }
            })
  
            userModules = sem1.concat(sem2)
        }
        else{
            const sem1 = await prisma.module.findMany({
                where:{
                    Year:plan,
                    Semester:'SEMESTER1',
                },
                select:{
                    Id:true
                }
            })
            const sem2 = await prisma.module.findMany({
                where:{
                    Year:plan,
                    Semester:'SEMESTER2',
                },
                select:{
                    Id:true
                }
            })
            userModules = sem1.concat(sem2)
        }
    }
    return userModules
  }
// solved the register
const register = async (req, res) => {
    const { Fname, Lname, Email, Password, Plan } = req.body;

if (!Fname || !Lname || !Email || !Password || !Plan ) return res.status(400).json({message:"infos are not filled correctly Fname, Lname, Email, Password, Plan..."})
    bcrypt.hash(String(Password), 10, async (err, hash) => {
    
        if (err) return res.json({ Error: "Error hashing password" });
        const hashed = hash;
        try {
            const duplicate = await prisma.user.findUnique({
                where:{
                    Email:Email.trim()
                }
            })
            if(duplicate) return res.status(409).json({message:"A user with this email already exists"})

            
            // creating user
            let userModules = await getUserModules(true,true,Plan,"FREE")
            console.log(userModules)
            await prisma.user.create({
                data: {
                    Fname:Fname.trim(),
                    Lname:Lname.trim(),
                    Email:Email.trim(),
                    Password: hashed,
                    Plan, // first second third fourth fifth
                    Subscription: "FREE", // free paid plus
                    FullName: Fname.trim() + " " + Lname.trim(),
                    Semester1:true,
                    Semester2:true,
                    Role:"USER",
                    Points:{
                        create:userModules.map((mod)=>{
                          return{
                            moduleId:mod.Id,
                            totalPoints:0,
                            currentTime:new Date()
                          }
                        })
                      }
                },
        });

        // res.status(201).json({ message: "User created successfully",status:"success" });
        res.status(201).json({ message: "User created successfully"});
      } catch (error) {
        res.status(500).json({ error: "User error", message: error.message });
      } finally {
        prisma.$disconnect();
      }
    });
};
  
// solved the logout
const logout = async (req,res) =>{
    const cookies = req.cookies
    if(!cookies?.token) return res.json({message:"No cookie Found"})
    const refreshToken = cookies.token
    const foundUser = await prisma.user.findUnique({
        where:{
            RefreshToken:refreshToken
        }
    })
    if(!foundUser) {
        res.clearCookie("token",{httpOnly:true, maxAge: 7 * 24 * 60 * 60 * 1000, secure:true, sameSite:'None'})
        return res.json({message:"No user Found"})
    }
    await prisma.user.update({
        where:{
            Id:foundUser.Id
        },
        data:{
            RefreshToken:null
        }
    })
    res.clearCookie("token",{httpOnly:true, maxAge: 7 * 24 * 60 * 60 * 1000, secure:true, sameSite:'None'})
    return res.json({message:"logged out successfully"})
}
const autoLogin = async(req,res) => {
    const cookies = req.cookies
    if(!cookies?.token) return res.status(401).json({message:"No cookie Found"})
    const refreshToken = cookies.token // if user tamperred with refreshtoken there is no foundUser
    const foundUser = await prisma.user.findUnique({
        where:{
            RefreshToken:refreshToken
        },
        select:{
            Email:true,
            Role:true
        }
    })
    if(!foundUser) return res.status(403).json({message:"no user found with this refreshtoken"})
    const accessToken = jwt.sign(

        { Email:foundUser.Email, Role:foundUser.Role },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}

    )
    return res.status(200).json({message:"user fetched successfully",Role:foundUser.Role,accessToken:accessToken})
}
const getUser = async(req,res) =>{
    const userInfos = await prisma.user.findUnique({
        where:{
            Email:req.Email
        },
        select:{
            Id:true,
            Fname:true,
            Lname:true,
            FullName:true,
            Email:true,
            Plan:true,
            Subscription:true,
            Semester1:true,
            Semester2:true,
            Date1:true,
            Date2:true,
        }
    })
    return res.status(200).json({message:"user fetched successfully",user:userInfos})
}

// solved the refreshToken
const refreshToken = async (req,res) =>{
    try{
        const cookies = req.cookies
        if(!cookies?.token) return res.sendStatus(401)
        const refreshToken = cookies['token']
        // user is null if no user with that refreshToken
        const user = await prisma.user.findUnique({
            where:{
                RefreshToken:refreshToken
            }
        })
        if (!user) return res.status(403)

        jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err,decoded) =>{
                    if(err || decoded.Email != user.Email) return res.status(403).json("invalid token")
                
                    const accessToken = jwt.sign(

                        { Email:user.Email, Role:user.Role },
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn:"15m"}
                
                    )
                     
                     return res.status(200).json({accessToken,Role:user.Role})
                    }
                )
    }
    catch (error){
        res.status(500).json({message:"server error",error:error.message})
    }
    finally {
        prisma.$disconnect()
    }
}


module.exports = {
    login,
    register,
    getUser,
    logout,
    refreshToken,
    autoLogin
}