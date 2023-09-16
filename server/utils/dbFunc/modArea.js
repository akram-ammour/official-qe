const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* 
! module area
    ?query the exams of that course 
    ?query the lessons of that course
    ?query the progress in both exam and courses
*/

const queryCourses = async (UserId, ModuleId) => {
  try {
    const courses = await prisma.cours.findMany({
      where: {
        moduleId: ModuleId,
      },
      include: {
        UserCourseProgress: {
          where: {
            userId: UserId,
          },
        },
        Questions: true,
      },
    });
    const returned = courses.filter((course) => course.Questions.length !== 0).map((course) => {
      const correctQuestions = course.UserCourseProgress.filter(
        (question) => question.isCorrect
      ).length;
      const totalQuestions = course.Questions.length;

      return {
        courseId: course.Id,
        Title: course.title,
        totalQuestions: totalQuestions,
        correctQuestions: correctQuestions,
        percentage: Number((correctQuestions * 100) / totalQuestions),
      };
    });
    return returned;
  } catch (error) {
    console.error("Failed to query courses:", error);
    throw new Error("Failed to query courses");
  }
};
const queryExams = async (UserId, ModuleId) => {
  try {
    const exams = await prisma.exam.findMany({
      where: {
        ModuleId: ModuleId,
      },
      include: {
        UserExamProgress: {
          where: {
            userId: UserId,
          },
        },
        Questions: true,
      },
    });
    const returned = exams.map((exam) => {
      const correctQuestions = exam.UserExamProgress.filter(
        (question) => question.isCorrect
      ).length;
      const totalQuestions = exam.Questions.length;

      return {
        examId: exam.Id,
        Year: exam.Year,
        Session: exam.Session,
        totalQuestions: totalQuestions,
        correctQuestions: correctQuestions,
        percentage: Number((correctQuestions * 100) / totalQuestions),
      };
    });
    return returned;
  } catch (error) {
    console.error("Failed to query Exams:", error);
    throw new Error("Failed to query Exams");
  }
};

const queryCourseProgress = async (UserId, ModuleId) => {
  try {
    const totalQuestions = await prisma.question.count({
      where: {
        Cours: {
          moduleId: ModuleId,
        },
      },
    });
    //  all the users including my user in here
    let UsersTotalQuestions = await prisma.userCourseProgress.findMany({
      where: {
        cours: {
          moduleId: ModuleId,
        },
        //   userId: {
        //     not: UserId
        //   },
        isCorrect: true,
      },
      select:{
        question:{
          select:{
            _count:true
          }
        }
      }
    });

    const UserQuestions = UsersTotalQuestions.filter((user) => {
      return user.userId === UserId;
    });

    const userPercentage = Number((UserQuestions * 100) / totalQuestions);

    UsersTotalQuestions = UsersTotalQuestions.filter((user) => {
      // excluding that user
      return user.userId !== UserId;
    });
    const totalUsers = UsersTotalQuestions.length;

    const promoPercentage = Number(
      ((UsersTotalQuestions.reduce(
        (total, user) => total + user._sum["question"],
        0
      ) /
        totalQuestions) *
        100) /
        totalUsers
    );

    const returned = {
      user: userPercentage,
      promo: promoPercentage,
    };
    return returned;
  } catch (error) {
    console.error("Failed to query Course Progress:", error);
    throw new Error("Failed to query Course Progress");
  }
};

const queryExamProgress = async (UserId, ModuleId) => {
  try {
    const totalQuestions = await prisma.question.count({
      where: {
        Exam: {
          moduleId: ModuleId,
        },
      },
    });
    //  all the users including my user in here
    let UsersTotalQuestions = await prisma.userExamProgress.count({
      by: ["userId"],
      where: {
        Exam: {
          moduleId: ModuleId,
        },
        isCorrect: true,
      },

    });

    const UserQuestions = UsersTotalQuestions.filter((user) => {
      return user.userId === UserId;
    })[0]._sum["question"];

    const userPercentage = Number((UserQuestions * 100) / totalQuestions);

    UsersTotalQuestions = UsersTotalQuestions.filter((user) => {
      // excluding that user
      return user.userId !== UserId;
    });
    const totalUsers = UsersTotalQuestions.length;

    const promoPercentage = Number(
      ((UsersTotalQuestions.reduce(
        (total, user) => total + user._sum["question"],
        0
      ) /
        totalQuestions) *
        100) /
        totalUsers
    );

    const returned = {
      user: userPercentage,
      promo: promoPercentage,
    };
    return returned;
  } catch (error) {
    console.error("Failed to query Exam Progress:", error);
    throw new Error("Failed to query Exam Progress");
  }
};


const resetCourse = async (UserId,CourseId) =>{
    try{
        await prisma.userCourseAnswer.deleteMany({
            where: {
                userId:UserId,
                Question: {
                    CoursId:CourseId
                  },
              },
        })
        await prisma.userCourseProgress.deleteMany({
            where:{
                userId:UserId,
                coursId:CourseId
            }
        })
    }
    catch (error){
        console.error("Failed to reset CourseProgress:", error);
        throw new Error("Failed to reset CourseProgress");
    
    }
}

const resetExam = async (UserId,ExamId) =>{
    try{
        await prisma.userExamAnswer.deleteMany({
            where: {
                userId:UserId,
                Question: {
                    ExamId:ExamId
                  },
              },
        })
        await prisma.userExamProgress.deleteMany({
            where:{
                userId:UserId,
                examId:ExamId
            }
        })
    }
    catch (error){
        console.error("Failed to reset ExamProgress:", error);
        throw new Error("Failed to reset ExamProgress");
    
    }
}
//  i reset the progress but the points can't be reset 
// so i m gonna make a whole other table for each exam and Cours and that's gonna tell me koula user f koula exam ch7al mn point 3ndou w haka i can make ranks

module.exports = {
  queryCourses,
  queryExams,
  queryExamProgress,
  queryCourseProgress,
  resetCourse,
  resetExam
};
