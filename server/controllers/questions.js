const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { queryQuestions } = require("../utils/dbFunc/questionArea");



//! question routes
const getQuestionsFromCourse = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await queryQuestions(id, "COURS");
    // const module = await prisma.question.findMany({
    //     where:{
    //         CoursId:id
    //     },
    //     select:{
    //         Number:true,
    //         CasClinique:true,
    //         Text:true,
    //         Image:true,
    //         Options:true
    //     },
    //     include:{
    //       Cours:true,
    //     },
    //     orderBy:[
    //       {Exam:{Year:"desc"}},
    //       {Exam:{Session:"asc"}}
    //     ]
    // })
    res.json(result);
  } catch (error) {
    console.error("Error retrieving questions:", error);
    // res.status(500).json({ error: "An error occurred" });
    res.status(500).json({ error: `an error occured`, error: error.message });
  } finally {
    prisma.$disconnect();
  }
};
const getQuestionsFromExam = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await queryQuestions(id, "EXAM");
    res.json(result);
  } catch (error) {
    console.error("Error retrieving questions:", error);
    // res.status(500).json({ error: "An error occurred" });
    res.status(500).json({ error: `an error occured`, error: error });
  } finally {
    prisma.$disconnect();
  }
};

// //const createQuestion = async (req, res) => {
//  // const { number, Text, CasClinique, CoursId, ExamId, ParentId, Image } =
//    // req.body;
//  // try {
//    // const question = await prisma.question.create({
//      // data: {
//        // Number: Number(number),
//        // Text,
//        // CasClinique,
//        // CoursId: Number(CoursId),
//        // ExamId: Number(ExamId),
//        // ParentId: Number(ParentId),
//        // Image,
//      // },
//    // });
//  // } catch (error) {
//    // res.json(error);
//  // } finally {
//    // prisma.$disconnect();
//  // }
// //};




//! answer routes
// i map through all the options and record them in userAnswers
const postUserAnswers = async (req, res) => {
  const { mode, userId, questionId, Options, modeId } = req.body;
  try {
    if (mode === "COURS") {
      const result = await prisma.userCourseAnswer.create({
        data: {
          questionId: questionId,
          userId: userId,
          coursId: modeId,
          Choices: {
            connect: Options.map((option) => ({ Id: option.Id })),
          },
        },
      });
      res.json(result);
    } else if (mode === "EXAM") {
      const result = await prisma.userExamAnswer.create({
        data: {
          questionId: questionId,
          userId: userId,
          examId: modeId,
          Choices: {
            connect: Options.map((option) => ({ Id: option.Id })),
          },
        },
      });
      res.json(result);
    } else {
      res.json("provide a mode");
    }
  } catch (error) {
    console.error("Error creating userAnswers:", error);
    // res.status(500).json({ error: "An error occurred" });
    res.status(500).json({ error: `an error occured`, error: error.message });
  } finally {
    prisma.$disconnect();
  }
};

// retrieving the userAnswers when user returns to a course or exam he did
const getUserAnswers = async (req, res) => {
  const { mode, userId, modeId } = req.query;
  try {
    if (mode === "COURS") {
      const result = await prisma.userCourseAnswer.findMany({
        where: {
          userId: Number(userId),
          coursId: Number(modeId),
        },
        include: {
          Choices: {
            select: {
              Id: true,
            },
          },
        },
      });
      res.json(result);
    } else if (mode === "EXAM") {
      const result = await prisma.userExamAnswer.findMany({
        where: {
          userId: Number(userId),
          examId: Number(modeId),
        },
        include: {
          Choices: {
            select: {
              Id: true,
            },
          },
        },
      });
      res.json(result);
    } else {
      res.json("provide a mode");
    }
  } catch (error) {
    console.error("Error retrieving userAnswers:", error);
    // res.status(500).json({ error: "An error occurred" });
    res.status(500).json({ error: `an error occured`, error: error.message });
  } finally {
    prisma.$disconnect();
  }
};
// resets the userAnswers
const resetUserAnswers = async (req, res) => {
  const { mode, userId, modeId } = req.body;
  try {
    if (mode === "COURS") {
      const result = await prisma.userCourseAnswer.deleteMany({
        where: {
          userId: Number(userId),
          coursId: Number(modeId),
        },
      });
      res.json(result);
    } else if (mode === "EXAM") {
      const result = await prisma.userExamAnswer.deleteMany({
        where: {
          userId: Number(userId),
          examId: Number(modeId),
        },
      });
      res.json(result);
    } else {
      res.json("provide a mode");
    }
  } catch (error) {
    console.error("Error resetting userAnswers:", error);
    // res.status(500).json({ error: "An error occurred" });
    res.status(500).json({ error: `an error occured`, error: error.message });
  } finally {
    prisma.$disconnect();
  }
};



//! progress routes
const postUserProgress = async (req, res) => {
  const { modeId, mode, userId, questionId } = req.body;
  try {
    if (mode === "COURS") {
      const result = await prisma.userCourseProgress.create({
        data: {
          isCorrect: true,
          userId: Number(userId),
          coursId: Number(modeId),
          questionId: Number(questionId),
        },
      });
      res.json(result);
    } else if (mode === "EXAM") {
      const result = await prisma.userExamProgress.create({
        data: {
          isCorrect: true,
          userId: Number(userId),
          examId: Number(modeId),
          questionId: Number(questionId),
        },
      });
      res.json(result);
    } else {
      res.json("provide a mode");
    }
  } catch (error) {
    console.error("Error creating userProgress:", error);
    // res.status(500).json({ error: "An error occurred" });
    res.status(500).json({ error: `an error occured`, error: error.message });
  } finally {
    prisma.$disconnect();
  }
};
const getUserProgress = async (req, res) => {
  const { modeId, mode, userId } = req.query;
  try {
    if (mode === "COURS") {
      const result = await prisma.userCourseProgress.findMany({
        where: {
          userId: Number(userId),
          coursId: Number(modeId),
        },
        select: {
          id: true,
          questionId: true,
        },
      });
      res.json(result);
    } else if (mode === "EXAM") {
      const result = await prisma.userExamProgress.findMany({
        where: {
          userId: Number(userId),
          examId: Number(modeId),
        },
        select: {
          id: true,
          questionId: true,
        },
      });
      res.json(result);
    } else {
      res.json("provide a mode");
    }
  } catch (error) {
    console.error("Error creating userProgress:", error);
    // res.status(500).json({ error: "An error occurred" });
    res.status(500).json({ error: `an error occured`, error: error.message });
  } finally {
    prisma.$disconnect();
  }
};

const resetUserProgress = async (req, res) => {
  const { mode, userId, modeId } = req.body;
  try {
    if (mode === "COURS") {
      const result = await prisma.userCourseProgress.deleteMany({
        where: {
          userId: Number(userId),
          coursId: Number(modeId),
        },
      });
      res.json(result);
    } else if (mode === "EXAM") {
      const result = await prisma.userExamProgress.deleteMany({
        where: {
          userId: Number(userId),
          examId: Number(modeId),
        },
      });
      res.json(result);
    } else {
      res.json("provide a mode");
    }
  } catch (error) {
    console.error("Error resetting userAnswers:", error);
    // res.status(500).json({ error: "An error occurred" });
    res.status(500).json({ error: `an error occured`, error: error.message });
  } finally {
    prisma.$disconnect();
  }
};

//! stats routes
// get user stats get user details + semester 1 and semester 2

// if i specify a moduleId it gets me the stats of the module like exam/course percentage 
//    promo percentage but also the courses of the user of that module with their percentage
//    and stats

// if i don't
// get all modules and for each of them i gotta get the global course percentage  
//? useCases home screen

//* ig it's here that i need to check for plans 
const getUserStats = async (req, res) => {
  const userId = Number(req.params.userId);
  const moduleId = req.query.moduleId;
  try {
    if (!userId) return res.status(400).json({message:"you need to give userId"})
    // if i specify a moduleId it gets me the stats of the module like exam/course percentage 
  //    promo percentage but also the courses of the user of that module with their percentage
  //    and stats
    if (moduleId) {
        // determine the user courses that do not have 0 questions
        const courses = (
          await prisma.cours.findMany({
            where: {
              moduleId: Number(moduleId),
            },
            include: {
              _count: {
                select: {
                  Questions: true,
                  UserCourseProgress: {
                    where: {
                      userId: userId,
                    },
                  },
                },
              },
              // UserCourseProgress:{
              //   where:{
              //     userId:userId
              //   },
              //   select:{
              //     id:true,
              //     questionId:true
              //   }
              // }
            },
          })
        ).filter((course) => {
          if (course?._count?.Questions !== 0) {
            return course;
          }
        });
        // determine the promo course stats
        const totalCoursesQuestions = await prisma.question.count({
          where: {
            Cours: {
              moduleId: Number(moduleId),
            },
          },
        });
        // determine the user course stats
        let courseStats = courses.reduce((total, course) => {
          if (course._count.Questions !== 0) {
            const userProgress = course._count.UserCourseProgress;
            return total + Number(userProgress / totalCoursesQuestions);
          } else {
            return total;
          }
        }, 0);
        courseStats = Math.trunc(courseStats * 100);



        // determinining all the users questionProgress in the course db
        let userCorrectCoursesQuestions = await prisma.user.findMany({
          where: {
            Id: {
              not: Number(userId),
            },
          },
          select: {
            Id: true,
            UserCourseProgress: {
              where: {
                AND: [
                  {
                    userId: {
                      not: Number(userId),
                    },
                  },
                  {
                    cours: {
                      moduleId: Number(moduleId),
                    },
                  },
                ],
              },

              select: {
                id: true,
              },
            },
          },
        });
        userCorrectCoursesQuestions = userCorrectCoursesQuestions.map((user) => ({
          Id: user.Id,
          UserCourseProgress: user?.UserCourseProgress?.length,
        }));

        // determining the course Promo percentage
        let promoCoursePercentage = 
          Math.trunc((userCorrectCoursesQuestions.reduce((total, user) => {
            return total + user.UserCourseProgress;
          }, 0) *
            100) /
          (totalCoursesQuestions * userCorrectCoursesQuestions.length)) ;
        
          //! exams part
        const exams = (
          await prisma.exam.findMany({
            where: {
              ModuleId: Number(moduleId),
            },
            include: {
              _count: {
                select: {
                  Questions: true,
                  UserExamProgress: {
                    where: {
                      userId: userId,
                    },
                  },
                },
              },

              // UserCourseProgress:{
              //   where:{
              //     userId:userId
              //   },
              //   select:{
              //     id:true,
              //     questionId:true
              //   }
              // }
            },
            orderBy:[//todo in case of an error remove this orderby that i ve added
              {
                Year:"desc"
              },
              {
                Session:"asc"
              }
            ]
          })
        ).filter((exam) => {
          if (exam?._count?.Questions !== 0) {
            return exam;
          }
        });

        // determine the promo course stats
        const totalExamsQuestions = await prisma.question.count({
          where: {
            Exam: {
              ModuleId: Number(moduleId),
            },
          },
        });
        // determine the user promo stats
        let examStats = exams.reduce((total, exam) => {
          if (exam._count.Questions !== 0) {
            const userProgress = exam._count.UserExamProgress;
            return total + Number(userProgress / totalExamsQuestions);
          } else {
            return total;
          }
        }, 0);
        examStats = Math.trunc(examStats  * 100);


        // // determinining all the users questionProgress in the course db
        let userCorrectExamsQuestions = await prisma.user.findMany({
          where: {
            Id: {
              not: Number(userId),
            },
          },
          select: {
            Id: true,
            UserExamProgress: {
              where: {
                AND: [
                  {
                    userId: {
                      not: Number(userId),
                    },
                  },
                  {
                    Exam: {
                      ModuleId: Number(moduleId),
                    },
                  },
                ],
              },

              select: {
                id: true,
              },
            },
          },
        });

        userCorrectExamsQuestions = userCorrectExamsQuestions.map((user) => ({
          Id: user.Id,
          UserExamProgress: user?.UserExamProgress?.length,
        }));

        // // determining the course Promo percentage
        const promoExamsPercentage =
          Math.trunc((userCorrectExamsQuestions.reduce((total, user) => {
            return total + user.UserExamProgress;
          }, 0) *
            100) /
          (totalExamsQuestions * userCorrectExamsQuestions.length));

        return res.json({
          courses: {
            data: courses,
            stats: {
              user: courseStats,
              promo: promoCoursePercentage ? promoCoursePercentage : 0,
            },
          },
          exams: {
            data: exams,
            stats: {
              user: examStats ,
              promo: promoExamsPercentage ? promoExamsPercentage : 0,
            },
          },
          totalStats:{
            user:Math.trunc((courseStats + examStats)/2),
            promo: Math.trunc((promoCoursePercentage + promoExamsPercentage)/2) ?  Math.trunc((promoCoursePercentage + promoExamsPercentage)/2) : 0
          }
        });
      } 
    
    // get all modules and for each of them i gotta get the global course percentage  
    //! useCases home screen
    else {
      const user = await prisma.user.findUnique({
        where:{
          Id:Number(userId)
        },
        select:{
          Plan:true,
          Semester1:true,
          Semester2:true,
          Id:true,
          Subscription:true
        }
      })
      let semester1 = []
      let semester2 = []

      if (user.Semester1){
        if(user.Subscription === "FREE"){
          semester1 = (await prisma.module.findMany({
            where:{
              Year:user.Plan,
              Semester:"SEMESTER1",
              isFree:true
            },
            select:{
              Id:true,
              Title:true,
              Icon:true,
              color:true,
              Cours:{
                select:{
                  _count:{
                    select:{
                      Questions:true,
                      UserCourseProgress:{
                        where:{
                          userId:user.Id 
                        }
                      }
                    }
                  },
                }
              },
    
  
            }
          }))
          .map((mod)=>{
            let totalQuestions = mod.Cours.reduce((total,questions) =>{
                return questions._count.Questions + total
              },0)
              let totalUserAnswers = mod.Cours.reduce((total,questions) =>{
                return questions._count.UserCourseProgress + total
              },0)
  
            return {
              Id:mod.Id,
              Title: mod.Title,
              Icon: mod.Icon,
              color: mod.color,
              percentage:Math.trunc((totalUserAnswers/totalQuestions)* 100) ? Math.trunc((totalUserAnswers/totalQuestions)* 100) : 0
            }
          })

        }
        else{
          semester1 = (await prisma.module.findMany({
            where:{
              Year:user.Plan,
              Semester:"SEMESTER1",
            },
            select:{
              Id:true,
              Title:true,
              Icon:true,
              color:true,
              Cours:{
                select:{
                  _count:{
                    select:{
                      Questions:true,
                      UserCourseProgress:{
                        where:{
                          userId:user.Id 
                        }
                      }
                    }
                  },
                }
              },
    
  
            }
          }))
          .map((mod)=>{
            let totalQuestions = mod.Cours.reduce((total,questions) =>{
                return questions._count.Questions + total
              },0)
              let totalUserAnswers = mod.Cours.reduce((total,questions) =>{
                return questions._count.UserCourseProgress + total
              },0)
  
            return {
              Id:mod.Id,
              Title: mod.Title,
              Icon: mod.Icon,
              color: mod.color,
              percentage:Math.trunc((totalUserAnswers/totalQuestions)* 100) ? Math.trunc((totalUserAnswers/totalQuestions)* 100) : 0
            }
          })
        }
      }
      if (user.Semester2){
        if(user.Subscription === "FREE"){
          semester2 = (await prisma.module.findMany({
            where:{
              Year:user.Plan,
              Semester:"SEMESTER2",
              isFree:true
            },
            select:{
              Id:true,
              Title:true,
              Icon:true,
              color:true,
              Cours:{
                select:{
                  _count:{
                    select:{
                      Questions:true,
                      UserCourseProgress:{
                        where:{
                          userId:user.Id 
                        }
                      }
                    }
                  },
                }
              },
    
  
            }
          }))
          .map((mod)=>{
            let totalQuestions = mod.Cours.reduce((total,questions) =>{
                return questions._count.Questions + total
              },0)
              let totalUserAnswers = mod.Cours.reduce((total,questions) =>{
                return questions._count.UserCourseProgress + total
              },0)
  
            return {
              Id:mod.Id,
              Title: mod.Title,
              Icon: mod.Icon,
              color: mod.color,
              percentage:Math.trunc((totalUserAnswers/totalQuestions)* 100) ? Math.trunc((totalUserAnswers/totalQuestions)* 100) : 0
            }
          })
        }
        else{
          semester2 = (await prisma.module.findMany({
            where:{
              Year:user.Plan,
              Semester:"SEMESTER2"
            },
            select:{
              Id:true,
              Title:true,
              Icon:true,
              color:true,
              Cours:{
                select:{
                  _count:{
                    select:{
                      Questions:true,
                      UserCourseProgress:{
                        where:{
                          userId:user.Id 
                        }
                      }
                    }
                  },
                }
              },
    
  
            }
          }))
          .map((mod)=>{
            let totalQuestions = mod.Cours.reduce((total,questions) =>{
                return questions._count.Questions + total
              },0)
              let totalUserAnswers = mod.Cours.reduce((total,questions) =>{
                return questions._count.UserCourseProgress + total
              },0)
  
            return {
              Id:mod.Id,
              Title: mod.Title,
              Icon: mod.Icon,
              color: mod.color,
              percentage:Math.trunc((totalUserAnswers/totalQuestions)* 100) ? Math.trunc((totalUserAnswers/totalQuestions)* 100) : 0
            }
          })
        }
      }

      return res.json({user,semester1,semester2});
    }
  } catch (error) {
    console.log("Error grabbing stats :", error);

    // res.status(500).json({ error: "An error occurred" });
    return res.status(500).json({ error: `an error occured`, error: error.message });
  } finally {
    prisma.$disconnect();
  }
};

// ta3 module popup contains stats plus modules
const getUserSpecModuleStats = async (req, res) => {
  const { moduleId, userId } = req.query;
  try {
    const mod = await prisma.module.findFirst({
      where:{
        Id:Number(moduleId)
      },
      select:{
        Id:true,
        Title:true,
        Icon:true,
        color:true,
      }
    })
    const courses = (
      await prisma.cours.findMany({
        where: {
          moduleId: Number(moduleId),
        },
        include: {
          _count: {
            select: {
              Questions: true,
              UserCourseProgress: {
                where: {
                  userId: Number(userId),
                },
              },
            },
          },
        },
      })
    ).filter(course => course?._count?.Questions !== 0).map(course =>{
      return {
        Id:course.Id,
        title:course.title,
        userPercentage:Math.trunc((course._count.UserCourseProgress/course._count.Questions)*100)

      }
    })
  // ----------------------------- merging the promo percentage with user Percentage
  const excludingUser = await prisma.cours.findMany({
    where: {
      moduleId:Number(moduleId),
    },
    include: {
      UserCourseProgress: {
        select: {
          questionId: true,
          userId: true,
        },
        where:{
          userId:{
            not:Number(userId)
          }
        }
      },
      _count:{
        select:{
          Questions:true,
        }
      }
    },
  });

  let courseInfosWithPromoPer = excludingUser.map((course) => {

    const userProgress = {};

    course.UserCourseProgress.forEach((userProgressItem) => {
      const { userId } = userProgressItem;
      userProgress[userId] = (userProgress[userId] || 0) + 1;
    });

    return {
      ...course,
      UserCourseProgress: Object.entries(userProgress).map(([userId, totalQuestions]) => ({
        userId,
        totalQuestions,
      })),

    };
  });

  courseInfosWithPromoPer= courseInfosWithPromoPer.filter(course => course._count.Questions !== 0).map((course)=>{
    let totalUsers = course.UserCourseProgress.length;
    let totalCourseQuestions = course._count.Questions;
    let percentage = 0;

    if (totalCourseQuestions !== 0) {
      percentage = (course.UserCourseProgress.reduce((total,progress)=>{
        return total + (progress.totalQuestions)/totalCourseQuestions
      },0))/totalUsers
      percentage = Math.trunc(percentage * 100)

    
      return {
        Id:course.Id,
        title:course.title,
        PromoPercentage:!percentage ? 0 : percentage
      }
    }
    else{
      percentage = 0
      
      return {
        Id:course.Id,
        title:course.title,
        PromoPercentage: !percentage ? 0 : percentage
      }
    }


  }) 
  
  let result = courseInfosWithPromoPer.map((course,index)=>{
    return {
      ...course,
      UserPercentage : courses[index].userPercentage
    }
  })
  let totalUserPercentage = Math.trunc((result.reduce((total,obj)=>{
    return obj.UserPercentage + total
  },0)/result.length))

  let totalPromoPercentage = Math.trunc((result.reduce((total,obj)=>{
    return obj.PromoPercentage + total
  },0)/result.length))
  
    // get each course current Progress
    // ! i should get the id icon and name and then (rank,title) based on points
    res.json({...mod,courses:result,total:{
      totalUserPercentage,
      totalPromoPercentage
    }})
    // ? i neeed to think of a way to get each course userProgress for each user
  } catch (error) {
  } finally {
    prisma.$disconnect();
  }
};

// const test = async (req, res) => {
//   const { moduleId, mode, userId } = req.query;
//   try {
//     res.json("hello world")
//   } catch (error) {
//   } finally {
//     prisma.$disconnect();
//   }
// };


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

const postQuestionStats = async (req,res) => {
  //stats like this [{questionId:142,Options:[optionId1,optionId2,optionId3]}]
  const { mode, userId, Stats, modeId } = req.body;
  const nbOfQuestions = Stats.length
  const PPQ = 100 
  const totalPoints = nbOfQuestions * PPQ
  try{
    const user = await prisma.user.findUnique({
      where:{
          Id:Number(userId)
      }
  })
  
  if(!user) return res.status(404).json({message:"user doesn't exist"})
  if(nbOfQuestions === 0) return res.status(403).json({message:"please provide stats"})
  
  if (mode === "COURS") {
    if(nbOfQuestions === 1){
      const answers = await prisma.userCourseAnswer.create({
        data: {
          questionId: Number(Stats[0].questionId), // Make sure to replace questionId with the actual question ID
          userId: Number(userId),
          coursId: Number(modeId),
          Choices: {
            connect: Stats[0].Options.map(option => ({ Id: Number(option) })),
          },
        },
      });

      const progress = await prisma.userCourseProgress.create({
        data: {
          isCorrect: true,
          userId: Number(userId),
          coursId: Number(modeId),
          questionId: Number(Stats[0].questionId),
        }
      });
    }
    else{
      for(const questionStats of Stats){
        await prisma.userCourseAnswer.create({
          data:{
            questionId: Number(questionStats.questionId), // Make sure to replace questionId with the actual question ID
            userId: Number(userId),
            coursId: Number(modeId),
            Choices: {
              connect: questionStats.Options.map(option => ({ Id: Number(option) })),
            },
          }
        });
      }
      
      for(const questionStats of Stats){
        await prisma.userCourseProgress.create({
          data:{
            isCorrect: true,
            userId: Number(userId),
            coursId: Number(modeId),
            questionId: Number(questionStats.questionId),
          }
        });
      }
    }
      const userModules = await getUserModules(user)
      // i need module of question
      let mod = await prisma.question.findUnique({
        where:{
          Id:Stats[0].questionId
        },
        select:{
          Id:true,
          Cours:{
            select:{
              moduleId:true
            }
          }
        }
      })

      let moduleId = mod.Cours.moduleId
      const userOwnsModule = userModules.some(item => item.Id === Number(moduleId))
      
      if(!userOwnsModule) return res.status(403).json({message:'user doesn\'t own/have module'})
      
      const userPoints = await prisma.points.findUnique({
        where:{
            userId_moduleId:{
                moduleId:moduleId,
                userId:Number(userId)
            }
        }})
      if(!userPoints){
          await prisma.points.create({
              data:{
                  userId:Number(userId),
                  moduleId:moduleId,
                  totalPoints:totalPoints,
              }
          }) 
      }
      else{
          await prisma.points.update({
            where:{       
                userId_moduleId:{
                    moduleId:moduleId,
                    userId:Number(userId)
                }
            },
            data:{
                totalPoints:{
                    increment:totalPoints,
                },
                currentTime:new Date()
            }
      }) 
    }

      
      return res.json({status:"success",message:"question progress/points created successfully"});
  } else if (mode === "EXAM") {
    if(nbOfQuestions === 1){
      const answers = await prisma.userExamAnswer.create({
        data: {
          questionId: Number(Stats[0].questionId), // Make sure to replace questionId with the actual question ID
          userId: Number(userId),
          examId: Number(modeId),
          Choices: {
            connect: Stats[0].Options.map(option => ({ Id: Number(option) })),
          },
        },
      });

      const progress = await prisma.userExamProgress.create({
        data: {
          isCorrect: true,
          userId: Number(userId),
          examId: Number(modeId),
          questionId: Number(Stats[0].questionId),
        }
      });
    }
    else{
      for(const questionStats of Stats){
        await prisma.userExamAnswer.create({
          data:{
            questionId: Number(questionStats.questionId), // Make sure to replace questionId with the actual question ID
            userId: Number(userId),
            examId: Number(modeId),
            Choices: {
              connect: questionStats.Options.map(option => ({ Id: Number(option) })),
            },
          }
        });
      }
      
      for(const questionStats of Stats){
        await prisma.userExamProgress.create({
          data:{
            isCorrect: true,
            userId: Number(userId),
            examId: Number(modeId),
            questionId: Number(questionStats.questionId),
          }
        });
      }

    }


      const userModules = await getUserModules(user)
      // i need module of question
      let mod = await prisma.question.findUnique({
        where:{
          Id:Stats[0].questionId
        },
        select:{
          Id:true,
          Exam:{
            select:{
              ModuleId:true
            }
          }
        }
      })

      let moduleId = mod.Exam.ModuleId
      const userOwnsModule = userModules.some(item => item.Id === Number(moduleId))
      
      if(!userOwnsModule) return res.status(403).json({message:'user doesn\'t own/have module'})
      
      const userPoints = await prisma.points.findUnique({
        where:{
            userId_moduleId:{
                moduleId:moduleId,
                userId:Number(userId)
            }
        }})
        
      if(!userPoints){
          await prisma.points.create({
              data:{
                  userId:Number(userId),
                  moduleId:moduleId,
                  totalPoints:totalPoints,
              }
          }) 
      }
      else{
          await prisma.points.update({
            where:{       
                userId_moduleId:{
                    moduleId:moduleId,
                    userId:Number(userId)
                }
            },
            data:{
                totalPoints:{
                    increment:totalPoints,
                },
                currentTime:new Date()
            }
      }) 
    }

      
      return res.json({status:"success",message:"question progress/points created successfully"});
    } else {
      res.json("provide a mode");
    }
  }
  catch(error){
    console.error("Error creating userStats:", error);
    // res.status(500).json({ error: "An error occurred" });
    res.status(500).json({ error: `an error occured`, error: error.message })
  }
  finally{
    prisma.$disconnect()
  }

}

module.exports = {
  getQuestionsFromCourse,
  getQuestionsFromExam,
  
  // createQuestion,
  postUserAnswers,
  getUserAnswers,
  resetUserAnswers,

  postUserProgress,
  getUserProgress,
  resetUserProgress,
  
  getUserStats,
  getUserSpecModuleStats,

  postQuestionStats
  // test,
};
