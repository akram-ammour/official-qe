const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* 
! home area
    ?query All Modules 
    ?query their courses 
*/

// enum Year {
//     FIRST
//     SECOND
//     THIRD
//     FOURTH
//     FIFTH
//   }

// enum SEMESTERS {
//     SEMESTER1
//     SEMESTER2
//   }

// what will show f lwl
const queryAllModules = async (Year, Semester, UserId) => {
  try {
    let mods = await prisma.module.findMany({
      where: {
        Year: Year,
        Semester: Semester,
      },
      select: {
        Id: true,
        Icon: true,
        Title: true,
        color:true,
        Cours: {
          select: {
            Questions: {
              select: {
                _count: true,
              },
            },
          },
        },
      },
    });

    mods = await Promise.all(
      mods.map(async (module) => {
        let totalQuestions = module.Cours.reduce((total, course) => {
          return total + course.Questions._count;
        }, 0);
        if (totalQuestions === 0) {
          totalQuestions = 30;
        }
        const totalQuestionsExam = await prisma.userExamProgress.count({
          where: {
            Exam: {
              ModuleId: module.Id,
            },
            userId: UserId,
            isCorrect: true,
          },
        });

        const totalQuestionsCourse = await prisma.userCourseProgress.count({
          where: {
            cours: {
              moduleId: module.Id,
            },
            userId: UserId,
            isCorrect: true,
          },
        });
        const percentage = Number(
          ((totalQuestionsCourse * 100) / totalQuestions +
            (totalQuestionsExam * 100) / totalQuestions) /
            2
        );
        const { Cours, ...rest } = module;
        return {
          ...rest,
          totalQuestions,
          totalQuestionsCourse,
          totalQuestionsExam,
          percentage,
        };
      })
    );

    return mods;
  } catch (error) {
    console.error("Failed to query Courses:", error);
    throw new Error("Failed to query Courses");
  }
};
// on popup
/* query the module infos on popup */
const queryOnPopup = async (ModuleId, UserId) => {
  try {
    const mod = await prisma.module.findUnique({
      where: {
        Id: ModuleId,
      },
      include: {
        Cours: {
          select: {
            title: true,
            Questions: {
              select: {
                _count: true,
              },
            },
            UserCourseProgress: {
              where: {
                userId: UserId,
              },
              select: {
                question: {
                  select: {
                    _count: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return mod;
  } catch (error) {
    console.log(`Not able to query module infos: ${error}`);
    throw new Error("Not able to query module infos");
  }
};

module.exports = {
  queryAllModules,
  queryOnPopup,
};
