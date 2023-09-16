const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");


// const getQuestionsFromCourse = async (req, res) => {
//     const id = Number(req.params.id);
//     try {
//       const result = await queryQuestions(id, "COURS");
//       // const module = await prisma.question.findMany({
//       //     where:{
//       //         CoursId:id
//       //     },
//       //     select:{
//       //         Number:true,
//       //         CasClinique:true,
//       //         Text:true,
//       //         Image:true,
//       //         Options:true
//       //     },
//       //     include:{
//       //       Cours:true,
//       //     },
//       //     orderBy:[
//       //       {Exam:{Year:"desc"}},
//       //       {Exam:{Session:"asc"}}
//       //     ]
//       // })
//       res.json(result);
//     } catch (error) {
//       console.error("Error retrieving questions:", error);
//       // res.status(500).json({ error: "An error occurred" });
//       res.status(500).json({ error: `an error occured`, error: error });
//     } finally {
//       prisma.$disconnect();
//     }
//   };

// get users with filtering /search
const getUsers = async (req, res) => {
  const { q: query, y: userLevel, s: subscriptionPlan } = req.query;
  try {
    let filteredUsers;
    const whereClause = {
      OR: [
        {
          Email: {
            contains: query,
          },
        },
        {
          Fname: {
            contains: query,
          },
        },
        {
          Lname: {
            contains: query,
          },
        },
        {
          FullName: {
            contains: query,
          },
        },
      ],
    };

    // Conditionally add the userLevel and subscriptionPlan filters
    if (userLevel) {
      whereClause.Plan = {
        equals: userLevel.toUpperCase(),
      };
    }

    if (subscriptionPlan) {
      whereClause.Subscription = {
        equals: subscriptionPlan.toUpperCase(),
      };
    }

    filteredUsers = await prisma.user.findMany({
      where: whereClause,
      select: {
        Id: true,
        Fname: true,
        Lname: true,
        Email: true,
        Plan: true,
        Subscription: true,
        Semester1: true,
        Semester2: true,
      },
      orderBy:[
        {
          Plan:'asc'
        },
        {
          Subscription:"asc"
        },
        {
          Fname:'asc'
        },
        {
          Lname:'asc'
        },

      ]
    });

    res.json(filteredUsers);
  } catch (error) {
    console.error("Error retrieving questions:", error);
    // res.status(500).json({ error: "An error occurred" });
    res.status(500).json({ error: `an error occured`, error: error.message });
  } finally {
    prisma.$disconnect();
  }
};

// i think i already made that should i only make course stats ?
const getUserStats = async (req, res) => {
  const {userId} = req.body
  //get the stats in cours exam and total
  // cours exam total
  // get all questions in cours 
  // get all questions in exams
  // get total  
  try {



  } catch (error) {
    
  }
  finally{
    prisma.$disconnect()
  }
};


const editUserPassword = async (req, res) => {
  const { userId, password } = req.body;
  bcrypt.hash(String(password), 10, async (err, hash) => {
    if (err) return res.json({ Error: "Error hashing password" });
    const hashed = hash;
    try {
      await prisma.user.update({
        where: {
          Id: Number(userId),
        },
        data: {
          Password: hashed,
          RefreshToken:null
        },
      });
      res.json({
        message: "User password updated successfully",
        status: "success",
      });
    } catch (error) {
      res.status(500).json({ error: "Error  user", message: error.message });
    } finally {
      prisma.$disconnect();
    }
  });
};

// ? works 
const createUser = async (req, res) => {
  const { Fname, Lname, Email, Password, Plan,Subscription,Semester1,Semester2 } = req.body;
  bcrypt.hash(String(Password), 10, async (err, hash) => {
    if (err) return res.json({ Error: "Error hashing password" });
    const hashed = hash;
    try {
      const userExists = await prisma.user.findUnique({
        where:{
          Email:Email.trim()
        }
      })
      if(userExists){
        res.json({ message: "User already exists",status:"exists"})
      }
      else{
        let userModules = await getUserModules(Semester1,Semester2,Plan.toUpperCase(),Subscription.toUpperCase())
        const user = await prisma.user.create({
          data: {
            Fname:Fname.trim(),
            Lname:Lname.trim(),
            Email:Email.trim(),
            Password: hashed,
            Plan:Plan.toUpperCase(),
            Subscription: Subscription.toUpperCase(),
            FullName: Fname.trim() + " " + Lname.trim(),
            Semester1:Semester1,
            Semester2:Semester2,
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
          select:{
            Id:true,
            Fname:true,
            Lname:true,
            Email:true,
            Plan:true,
            Subscription:true,
            FullName:true,
            Semester1:true,
            Semester2:true 
          }
        });
        res.json({ message: "User created successfully",status:"success",infos:user});
      }
    } catch (error) {
      res.status(500).json({ error: "Error  user", message: error.message });
    } finally {
      prisma.$disconnect();
    }
  });
};

//todo force user to logout when delete user
//? handled roles
const DeleteUser = async (req, res) => {
  //delete the userExamAnswers the userExamProgress
  //delete the userCourseAnswers the userCourseProgress
  //delete also the points
  //delete also the user module colors
  //then delete the user
  const userId = Number(req.params.id)
  try{
    const user = await prisma.user.findUnique({
      where:{
        Id:userId
      }
    })
    if(user){
      if (user.Role === "ADMIN"){
        res.json({
          message: "User cannot be deleted (user is Admin)",
          status: 401,
        }); 
      }
      else{
        const result = await prisma.user.delete({
          where:{
            Id:userId,
          }
        })
        res.json({
          message: "User deleted successfully",
          status: "success",
        });
      }
    }
    else{
    res.json({
      message: "User doesn't exist",
      status: 404,
    });
    }
  }
  catch (error){
    console.error("Error deleting user:", error);
    // res.status(500).json({ error: "An error occurred" });
    res.status(500).json({ error: `an error occured`, error: error.message });
  }
  finally{
    prisma.$disconnect()
  }
};

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

// restrict a user from commenting pendant une durée there is issues here when i update 
//todo logout user
const UpdateUser = async (req, res) => {
  //get user plan if i change the plan or the semestre all the data will be deleted
  const userId = Number(req.params.id)
  const {Plan,Semester1,Semester2,Subscription} = req.body
  try{
    const user = await prisma.user.findUnique({
      where:{
        Id:userId
      }
    })
    if (Plan !== user.Plan || Subscription != user.Subscription  || Semester1 !== user.Semester1 
      || Semester2 !== user.Semester2 ) {
      await prisma.userCourseAnswer.deleteMany({
        where:{
          userId:userId
        }
      })
      await prisma.userCourseProgress.deleteMany({
        where:{
          userId:userId
        }
      })
      await prisma.userExamAnswer.deleteMany({
        where:{
          userId:userId
        }
      })
      await prisma.userExamProgress.deleteMany({
        where:{
          userId:userId
        }
      })
      // deleting points
      await prisma.points.deleteMany({
        where:{
          userId:userId
        }
      })
      let userModules = await getUserModules(Semester1,Semester2,Plan.toUpperCase(),Subscription.toUpperCase())
      const newUser = await prisma.user.update({
        where:{
          Id:userId
        },
        data:{
          Plan:Plan,
          Semester1:Semester1,
          Semester2:Semester2,
          Subscription:Subscription,
          RefreshToken:null,
          Points:{
            create:userModules.map((mod)=>{
              return{
                moduleId:mod.Id,
                totalPoints:0,
                currentTime:new Date()
              }
            })
          }
        }
      })
      res.json({
        message: "User updated successfully",
        status: "success",
      });
    } else {
      res.json({
        message: "Nothing to change about User",
        status: "Info",
      });
    }
  }
  catch (error){
    console.log("could not update user " + error.message)
    res.status(500).json({error:"could not update user", message:error.message})
  }
  finally{
    prisma.$disconnect()
  }
};

const getUser = async (req,res) => {
  const userId = Number(req.params.id)
  try{
    const result = await prisma.user.findUnique({
      where:{
        Id:userId
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
    res.json(result)
  }
  catch (error){
    console.error(error)
    res.status(500).json({error:error,message:error.message})
  }
  finally{
    prisma.$disconnect()
  }
}




// update the user dates based on userId and semester (1 or 2)
//PATCH /users/date/:id/:sem
const updateUserDates = async (req, res) => {
  const userId = Number(req.params.id);
  const semester = Number(req.params.sem);
  const date = req.body.date;

  if (!userId || !semester || !date) {
    return res.status(400).json({ message: "missing parameters" });
  }

  // Check if semester is valid (1 or 2)
  if (semester !== 1 && semester !== 2) {
    return res
      .status(400)
      .json({ message: "Invalid semester value. Must be either 1 or 2" });
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        Id: userId,
      },
    });
    if (!foundUser) {
      return res.status(404).json({ message: "no user with this id in database" });
    }

    let updatedDate;
    if (semester === 1) {
      updatedDate = await prisma.user.update({
        where: {
          Id: userId,
        },
        data: {
          Date1: new Date(date),
        },
        select: {
          Date1: true,
          Date2: true,
        },
      });
    } else {
      updatedDate = await prisma.user.update({
        where: {
          Id: userId,
        },
        data: {
          Date2: new Date(date),
        },
        select: {
          Date1: true,
          Date2: true,
        },
      });
    }

    return res.json(updatedDate); // Send response after database update
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error, message: error.message });
  } finally {
    prisma.$disconnect();
  }
};

//POST /users/date/reset
const resetDate = async (req,res) => {
  const userId = Number(req.body.id)
  const semester = Number(req.body.sem)
  if(!userId || !semester) return res.status(400).json({message:"missing parameters"})
    // Check if semester is valid (1 or 2)
  if (semester !== 1 && semester !== 2) {
      return res.status(400).json({ message: "Invalid semester value. Must be either 1 or 2" });
  }
  try{
    if(semester === 1){
      const date1 = await prisma.user.update({
        where:{
          Id:userId
        },
        data:{
          Date1: null
        },
        select:{
          Date1:true,
          Date2:true,
        }
      })
      res.json(date1)
    }
    else{
      const date2 = await prisma.user.update({
        where:{
          Id:userId
        },
        data:{
          Date2: null
        },
        select:{
          Date1:true,
          Date2:true,
        }
      })
      res.json(date2)
    }
  }
  catch (error){
    console.error(error)
    res.status(500).json({error:error,message:error.message})
  }
  finally{
    prisma.$disconnect()
  }
}
module.exports = {
  getUsers,
  editUserPassword,
  DeleteUser,
  createUser,
  UpdateUser,
  getUser,
  updateUserDates,
  resetDate,
  resetDate
};
