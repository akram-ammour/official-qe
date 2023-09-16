const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const getUserModules = async (user) =>{
    const sem1 = user.Semester1
    const sem2 = user.Semester2
    const plan = user.Plan
    const subscription = user.Subscription
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

// const getUserRank = async (userId, moduleId) => {
//     const userRankResult = await prisma.$queryRaw`
//       SELECT
//         u.Id As Id,
//         ROW_NUMBER() OVER (ORDER BY p.totalPoints DESC, p.currentTime ASC) AS userRank,
//         COUNT(*) OVER () AS totalUsers
//       FROM \`User\` u
//       JOIN \`Points\` p ON u.Id = p.userId
//       WHERE p.moduleId = ${moduleId}
//     `;
    
//     const userRank = userRankResult.find(user => user.Id == userId)
//     return userRank;
//   };
  
const getUserRank = async (userId, moduleId) => {
    const userRankResult = await prisma.$queryRaw`
    WITH RankedUsers AS (
      SELECT
        u.Id AS Id,
        p.totalPoints As totalPoints,
        ROW_NUMBER() OVER (ORDER BY p.totalPoints DESC, p.currentTime ASC) AS userRank,
        COUNT(*) OVER () AS totalUsers
      FROM \`User\` u
      JOIN \`Points\` p ON u.Id = p.userId
      WHERE p.moduleId = ${moduleId}
    )
    SELECT Id, userRank, totalUsers
    FROM RankedUsers;
    `;
    
    const userRank = userRankResult.find(user => user.Id == userId)
    return {userRank:Number(userRank.userRank),totalUsers:Number(userRank.totalUsers)};
};

const getOverAllSemesterRank = async (user, semester) => {
    let userRankResult;
  
    if (semester === "SEMESTER1") {
      userRankResult = await prisma.$queryRaw`
        SELECT
          u.Id AS userId,
          SUM(p.totalPoints) AS totalPoints,
          ROW_NUMBER() OVER (ORDER BY SUM(p.totalPoints) DESC, MIN(p.currentTime) ASC) AS userRank,
          COUNT(*) OVER () AS totalUsers
        FROM \`User\` u
        JOIN \`Points\` p ON u.Id = p.userId
        JOIN \`Module\` m ON p.moduleId = m.Id
        WHERE u.Plan = ${user.Plan} AND u.Semester1 = true
          AND m.Year = ${user.Plan} AND m.Semester = "SEMESTER1"
        GROUP BY u.Id
      `;
    } else {
      userRankResult = await prisma.$queryRaw`
        SELECT
          u.Id AS userId,
          SUM(p.totalPoints) AS totalPoints,
          ROW_NUMBER() OVER (ORDER BY SUM(p.totalPoints) DESC,MIN(p.currentTime) ASC) AS userRank,
          COUNT(*) OVER () AS totalUsers
        FROM \`User\` u
        JOIN \`Points\` p ON u.Id = p.userId
        JOIN \`Module\` m ON p.moduleId = m.Id
        WHERE u.Plan = ${user.Plan} AND u.Semester2 = true 
          AND m.Year = ${user.Plan} AND m.Semester = "SEMESTER2"
        GROUP BY u.Id
      `;
    }
  
    const userRank = userRankResult.find(item => item.userId == user.Id)
    return {userRank:Number(userRank.userRank),totalPoints:Number(userRank.totalPoints),totalUsers:Number(userRank.totalUsers)};
  
  };

// had 2 works
const getUserTitle = async  (userId,moduleId) => {
  let userPoints
  userPoints = await prisma.points.findUnique({
      where:{
          userId_moduleId:{
              moduleId:moduleId,
              userId:userId
          }
      }
  })
  
  userPoints = userPoints.totalPoints
  
  let totalPointsInModule
  totalPointsInModule = await prisma.question.count({
      where:{
          Cours:{
              moduleId:moduleId
          }
      }
  })
  // totalpoints = coursePoints + examPoints
  totalPointsInModule = totalPointsInModule * 2 * 100
  if (totalPointsInModule === 0){
    return {title:"Noob",percentage:0}
  }
  let percentage = Math.trunc((userPoints* 100)/totalPointsInModule) 

  let title;
  if (percentage > 100){
    percentage = 100
    title = 'Grandmaster';

  }
  if (percentage >= 92) {
      title = 'Grandmaster';
  } else if (percentage >= 80) {
      title = 'Master';
  } else if (percentage >= 60) {
      title = 'Genius';
  } else if (percentage >= 30) {
      title = 'Learner';
  } else if (percentage >= 10) {
      title = 'Rookie';
  } else {
      title = 'Noob';
  }
  
  return {title,percentage};
}
  
const getOverAllSemesterTitle = async (user,semester) =>{
    const plan = user.Plan
    const subscription = user.Subscription
    let modules
    if(subscription === "FREE"){
      modules = await prisma.module.findMany({
          where:{
              isFree: true,
              Semester:semester,
              Year:plan
          }
      })
    }
    else{
      modules = await prisma.module.findMany({
        where:{
            Semester:semester,
            Year:plan
        }
    })
    }
    // let globalPercentage
    let globalPercentagePromises = modules.map(async (value, index) => {
      const title =(await getUserTitle(user.Id, value.Id));
      return title.percentage
    });
  
    let globalPercentage
    let globalPercentageResults = await Promise.all(globalPercentagePromises);
  
    let totalPercentage = globalPercentageResults.reduce((prev, curr) => {
      return prev + curr;
    }, 0);
    
    globalPercentage = Math.trunc(totalPercentage / modules.length);

    let title;
    if (globalPercentage > 100){
      globalPercentage = 100
      title = 'Grandmaster';
  
    }
    else if (globalPercentage >= 92) {
      title = 'Grandmaster';
    } else if (globalPercentage >= 80) {
      title = 'Master';
    } else if (globalPercentage >= 60) {
      title = 'Genius';
    } else if (globalPercentage >= 30) {
      title = 'Learner';
    } else if (globalPercentage >= 10) {
      title = 'Rookie';
    } else {
      title = 'Noob';
    }
  
    return { title, globalPercentage };
};
  


//todo handle the ranking rows not found 



const getUserGlobalRanking = async (req,res) => {
    const Id = Number(req.params.userId)
    try{ 
        const user = await prisma.user.findUnique({
            where:{
                Id
            }
        })
        if(!user) return res.status(404).json({message:"user doesn't exist"})
        if(!user.Semester1 && !user.Semester2) return res.status(403).json({message:" user has no semester"})
        // if a module doesn't have a point then give them points
        const userModules = await getUserModules(user)
        userModules.map( async (mod) => {
            let points
            points = await prisma.points.findUnique({
                where:{
                     userId_moduleId:{
                        moduleId:mod.Id,
                        userId:user.Id
                     }
                }
            })
            if(!points) {
                await prisma.points.create({
                    data:{
                        moduleId:mod.Id,
                        totalPoints:0,
                        userId:user.Id
                    }
                })
            }
        })
        
        
        
        //! getting the overAllRank
        //! getting the overAllTitle
        let semOverAllRank
        let semOverAllTitle

        if(user.Semester1 && !user.Semester2){
            semOverAllRank = {
                sem1: await getOverAllSemesterRank(user,"SEMESTER1"),
                sem2: null
            }
            semOverAllTitle = {
                sem1: await getOverAllSemesterTitle(user,"SEMESTER1"),
                sem2: null
            }
        }
        else if (!user.Semester1 && user.Semester2){
            semOverAllRank = {
                sem1: null,
                sem2: await getOverAllSemesterRank(user,"SEMESTER2")
            }
            semOverAllTitle = {
                sem1: null,
                sem2: await getOverAllSemesterTitle(user,"SEMESTER2")
            }
        }
        else if (user.Semester1 && user.Semester2){
            semOverAllRank = {
                sem1:   await getOverAllSemesterRank(user,"SEMESTER1"),
                sem2: await getOverAllSemesterRank(user,"SEMESTER2")
            } 
            semOverAllTitle = {
                sem1:   await getOverAllSemesterTitle(user,"SEMESTER1"),
                sem2: await getOverAllSemesterTitle(user,"SEMESTER2")
            } 
        }

        res.status(200).json({ semOverAllRank, semOverAllTitle });
    }
    catch (error){
        console.log(error.message)
        res.status(500).json({message:error.message,error:"error retrieving user Points"})
    }
    finally{
        prisma.$disconnect()
    }
}


const getUserModuleRanking = async (req,res) => {
    const Id = Number(req.params.userId)
    const moduleId = Number(req.params.moduleId)
    try{
        const user = await prisma.user.findUnique({
            where:{
                Id
            }
        })
        const module = await prisma.module.findUnique({
            where:{
                Id:moduleId
            }
        })
        if(!user) return res.status(404).json({message:"user doesn't exist"})
        if(!module) return res.status(404).json({message:"module doesn't exist"})
        const userModules = await getUserModules(user)
        //does user own the module 
        const userOwnsModule = userModules.some(item => item.Id === moduleId)
        if(!userOwnsModule) return res.status(403).json({message:'user doesn\'t own/have module'})
        let points
        points = await prisma.points.findUnique({
            where:{
                    userId_moduleId:{
                    moduleId:moduleId,
                    userId:user.Id
                    }
            }
        })
        if(!points) {
            await prisma.points.create({
                data:{
                    moduleId:moduleId,
                    totalPoints:0,
                    userId:user.Id
                }
            })
        }

        //! getting the Rank
        const title = await getUserTitle(Id,moduleId)
        
        //! getting the Title
        const ranking = await getUserRank(Id,moduleId)
        
        
        return  res.json(
                    {
                        status:"success", 
                        data:{
                            ranking,
                            title
                        }
                    }
                )
    }
    catch (error){
        console.log(error.message)
        res.status(500).json({message:error.message,error:"error retrieving user Points"})
    }
    finally{
        prisma.$disconnect()
    }
}


const createUserPoints = async (req,res) => {
    const moduleId = Number(req.body.moduleId)
    
    const Id = Number(req.params.userId)
    const nbOfQuestions = Number(req.body.NumberOfQuestions || 1)

    const PPQ = Number(req.body.PPQ || 100) 

    try{
        const user = await prisma.user.findUnique({
            where:{
                Id
            }
        })
        const module = await prisma.module.findUnique({
            where:{
                Id:moduleId
            }
        })
        if(!user) return res.status(404).json({message:"user doesn't exist"})
        if(!module) return res.status(404).json({message:"module doesn't exist"})
        const userModules = await getUserModules(user)
        const userOwnsModule = userModules.some(item => item.Id === moduleId)
        if(!userOwnsModule) return res.status(403).json({message:'user doesn\'t own/have module'})

        //! later  only allow user to create points he has access too
        const userPoints = await prisma.points.findUnique({
            where:{
                userId_moduleId:{
                    moduleId:moduleId,
                    userId:Id
                }
        }})
        if(!userPoints){
            await prisma.points.create({
                data:{
                    userId:Id,
                    moduleId:moduleId,
                    totalPoints:(PPQ * nbOfQuestions),
                    
                    
                }
            }) 
        }
        else{
            await prisma.points.update({
            where:{       
                userId_moduleId:{
                    moduleId:moduleId,
                    userId:Id
                }
            },
            data:{
                totalPoints:{
                    increment:(PPQ * nbOfQuestions),
                },
                currentTime:new Date()
            }
        }) 
    }
    return res.json({message:"user points added successfully",status:"success"})

    }
    catch (error){
        console.log(error.message)
        res.status(500).json({message:error.message,error:"error adding user Points"})

    }
    finally{
        prisma.$disconnect()
    }
}

module.exports = {
    getUserGlobalRanking,
    getUserModuleRanking,
    createUserPoints
}