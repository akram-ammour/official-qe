
const Questions = [
      // 16 869 870 871 872 873
      {
        Id: 196,
        Text: 'L\'hypotension est due à priori à une baisse du débit cardiaque par (une seule\nréponse):',
        CasClinique: 'Un jeune patient de 20 ans a été victime d\'un accident de la voie publique avec hémorragie abondante. Sa pression artérielle aux urgences a été de 70/40 mmHg.',
        Number: 17,
        CoursId: 18,
        ExamId: 19,
        Image: null,
        ParentId: null,
        Options: [
          {
            Id: 869,
            questionId: 196,
            Choice: 'chute des résistances systémiques',
            Value: false
          },
          {
            Id: 870,
            questionId: 196,
            Choice: 'hypovolémie relative',
            Value: false
          },
          {
            Id: 871,
            questionId: 196,
            Choice: 'hypo contractilité cardiaque',
            Value: false
          },
          {
            Id: 872,
            questionId: 196,
            Choice: 'hypovolémie vraie',
            Value: true
          },
          {
            Id: 873,
            questionId: 196,
            Choice: 'bradycardie extrême',
            Value: false
          }
        ],
        Parent: null,
        Children: [
          {
            Id: 197,
            Text: 'Chez ce même patient, La correction de l\'état de choc impose de corriger (une\nseule réponse):',
            CasClinique: '',
            Number: 18,
            CoursId: 18,
            ExamId: 19,
            Image: null,
            ParentId: 196,
            Options: [
              {
                Id: 874,
                questionId: 197,
                Choice: 'La précharge par remplissage intraveineux',
                Value: true
              },
              {
                Id: 875,
                questionId: 197,
                Choice: 'La postcharge par vasodilatateurs',
                Value: false
              },
              {
                Id: 876,
                questionId: 197,
                Choice: 'L\'inotropie par des vasopresseurs',
                Value: false
              },
              {
                Id: 877,
                questionId: 197,
                Choice: 'La chronotropie par des bradycardisants',
                Value: false
              },
              {
                Id: 878,
                questionId: 197,
                Choice: 'Le retour veineux par des diurétiques',
                Value: false
              }
            ]
          },
          {
            Id: 198,
            Text: 'Chez ce même patient, La correction de l\'état de choc impose de corriger (une\nseule réponse):',
            CasClinique: '',
            Number: 18,
            CoursId: 18,
            ExamId: 19,
            Image: null,
            ParentId: 196,
            Options: [
              {
                Id: 874,
                questionId: 197,
                Choice: 'La précharge par remplissage intraveineux',
                Value: true
              },
              {
                Id: 875,
                questionId: 197,
                Choice: 'La postcharge par vasodilatateurs',
                Value: false
              },
              {
                Id: 876,
                questionId: 197,
                Choice: 'L\'inotropie par des vasopresseurs',
                Value: false
              },
              {
                Id: 877,
                questionId: 197,
                Choice: 'La chronotropie par des bradycardisants',
                Value: false
              },
              {
                Id: 878,
                questionId: 197,
                Choice: 'Le retour veineux par des diurétiques',
                Value: false
              }
            ]
          }
        ],
        Exam: {
          Session: 'N',
          Year: 2019
        }
      },
      {
        Id: 197,
        Text: 'Chez ce même patient, La correction de l\'état de choc impose de corriger (une\nseule réponse):',
        CasClinique: '',
        Number: 18,
        CoursId: 18,
        ExamId: 19,
        Image: null,
        ParentId: 196,
        Options: [
          {
            Id: 874,
            questionId: 197,
            Choice: 'La précharge par remplissage intraveineux',
            Value: true
          },
          {
            Id: 875,
            questionId: 197,
            Choice: 'La postcharge par vasodilatateurs',
            Value: false
          },
          {
            Id: 876,
            questionId: 197,
            Choice: 'L\'inotropie par des vasopresseurs',
            Value: false
          },
          {
            Id: 877,
            questionId: 197,
            Choice: 'La chronotropie par des bradycardisants',
            Value: false
          },
          {
            Id: 878,
            questionId: 197,
            Choice: 'Le retour veineux par des diurétiques',
            Value: false
          }
        ],
        Parent: {
          Id: 196,
          Text: 'L\'hypotension est due à priori à une baisse du débit cardiaque par (une seule\nréponse):',
          CasClinique: 'Un jeune patient de 20 ans a été victime d\'un accident de la voie publique avec hémorragie abondante. Sa pression artérielle aux urgences a été de 70/40 mmHg.',
          Number: 17,
          CoursId: 18,
          ExamId: 19,
          Image: null,
          ParentId: null
        },
        Children: [],
        Exam: {
          Session: 'N',
          Year: 2019
        }
      },
      {
        Id: 198,
        Text: 'On retrouve à l\'auscultation d\'un patient de 43 ans, un souffle cardiaque systolique. Il s\'agit de :',
        CasClinique: '',
        Number: 19,
        CoursId: 17,
        ExamId: 19,
        Image: null,
        ParentId: null,
        Options: [
          {
            Id: 879,
            questionId: 198,
            Choice: 'insuffisance de fermeture de la valve aortique',
            Value: false
          },
          {
            Id: 880,
            questionId: 198,
            Choice: 'limitation d\'ouverture de la valve mitrale',
            Value: false
          },
          {
            Id: 881,
            questionId: 198,
            Choice: 'insuffisance de fermeture de la valve mitrale',
            Value: true
          },
          {
            Id: 882,
            questionId: 198,
            Choice: 'limitation d\'ouverture de la valve aortique',
            Value: false
          },
          {
            Id: 883,
            questionId: 198,
            Choice: 'limitation d\'ouverture de la valve tricuspide',
            Value: false
          }
        ],
        Parent: null,
        Children: [
          {
            Id: 199,
            Text: 'Si le souffle de ce patient de 43 ans a été en rapport avec une régurgitation. Ce sera une (une seule réponse) :',
            CasClinique: '',
            Number: 20,
            CoursId: 17,
            ExamId: 19,
            Image: null,
            ParentId: 198,
            Options: [
              {
                Id: 884,
                questionId: 199,
                Choice: 'Insuffisance de fermeture de la valve aortique',
                Value: false
              },
              {
                Id: 885,
                questionId: 199,
                Choice: 'Limitation d\'ouverture de la valve mitrale',
                Value: false
              },
              {
                Id: 886,
                questionId: 199,
                Choice: 'Insuffisance de fermeture de la valve mitrale',
                Value: true
              },
              {
                Id: 887,
                questionId: 199,
                Choice: 'Limitation d\'ouverture de la valve aortique',
                Value: false
              },
              {
                Id: 888,
                questionId: 199,
                Choice: 'Limitation d\'ouverture de la valve tricuspide',
                Value: false
              }
            ]
          }
        ],
        Exam: {
          Session: 'N',
          Year: 2019
        }
      },
      {
        Id: 199,
        Text: 'Si le souffle de ce patient de 43 ans a été en rapport avec une régurgitation. Ce sera une (une seule réponse) :',
        CasClinique: '',
        Number: 20,
        CoursId: 17,
        ExamId: 19,
        Image: null,
        ParentId: 198,
        Options: [
          {
            Id: 884,
            questionId: 199,
            Choice: 'Insuffisance de fermeture de la valve aortique',
            Value: false
          },
          {
            Id: 885,
            questionId: 199,
            Choice: 'Limitation d\'ouverture de la valve mitrale',
            Value: false
          },
          {
            Id: 886,
            questionId: 199,
            Choice: 'Insuffisance de fermeture de la valve mitrale',
            Value: true
          },
          {
            Id: 887,
            questionId: 199,
            Choice: 'Limitation d\'ouverture de la valve aortique',
            Value: false
          },
          {
            Id: 888,
            questionId: 199,
            Choice: 'Limitation d\'ouverture de la valve tricuspide',
            Value: false
          }
        ],
        Parent: {
          Id: 198,
          Text: 'On retrouve à l\'auscultation d\'un patient de 43 ans, un souffle cardiaque systolique. Il s\'agit de :',
          CasClinique: '',
          Number: 19,
          CoursId: 17,
          ExamId: 19,
          Image: null,
          ParentId: null
        },
        Children: [],
        Exam: {
          Session: 'N',
          Year: 2019
        }
      },

    ]

const userSelects = {0:[869,870,],1:[451,5654],2:[546,46,4654,465]}
const getGroupOfQuestionSelects = (rootQuestionIndex) =>{
    const Selects = {}
    const length = (Questions[rootQuestionIndex]?.Children?.length || -1) + 1
    if(length === 0){
      return {}
    }
    else{
      for (let index = 0; index < length; index++) {
        Selects[rootQuestionIndex + index] = userSelects[rootQuestionIndex + index]
      }
      return Selects
    }
  }

console.log(getGroupOfQuestionSelects(0))
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// // const getUserTitle = async  (userId,moduleId) => {
// //   let userPoints
// //   userPoints = await prisma.points.findUnique({
// //       where:{
// //           userId_moduleId:{
// //               moduleId:moduleId,
// //               userId:userId
// //           }
// //       }
// //   })
  
// //   userPoints = userPoints.totalPoints
  
// //   let totalPointsInModule
// //   totalPointsInModule = await prisma.question.count({
// //       where:{
// //           Cours:{
// //               moduleId:moduleId
// //           }
// //       }
// //   })
// //   // totalpoints = coursePoints + examPoints
// //   totalPointsInModule = totalPointsInModule * 2 * 100
// //   if (totalPointsInModule === 0){
// //     return {title:"Rookie",percentage:0}
// //   }
// //   let percentage = Math.trunc((userPoints* 100)/totalPointsInModule) 

// //   let title;
// //   if (percentage > 100){
// //     percentage = 100
// //     title = 'Grandmaster';

// //   }
// //   if (percentage >= 92) {
// //       title = 'Grandmaster';
// //   } else if (percentage >= 80) {
// //       title = 'Master';
// //   } else if (percentage >= 60) {
// //       title = 'Genius';
// //   } else if (percentage >= 30) {
// //       title = 'Learner';
// //   } else if (percentage >= 10) {
// //       title = 'Rookie';
// //   } else {
// //       title = 'Noob';
// //   }
  
// //   return {title,percentage};
// //   }

// // const getOverAllSemesterTitle = async (user,semester) =>{
// //   const plan = user.Plan
// //   const subscription = user.Subscription
// //   let modules
// //   if(subscription === "FREE"){
// //     modules = await prisma.module.findMany({
// //         where:{
// //             isFree: true,
// //             Semester:semester,
// //             Year:plan
// //         }
// //     })
// //   }
// //   else{
// //     modules = await prisma.module.findMany({
// //       where:{
// //           Semester:semester,
// //           Year:plan
// //       }
// //   })
// //   }
// //   // let globalPercentage
// //   let globalPercentagePromises = modules.map(async (value, index) => {
// //     const title =(await getUserTitle(user.Id, value.Id));
// //     return title.percentage
// //   });

// //   let globalPercentage
// //   let globalPercentageResults = await Promise.all(globalPercentagePromises);

// //   let totalPercentage = globalPercentageResults.reduce((prev, curr) => {
// //     return prev + curr;
// //   }, 0);
// //   globalPercentage = Math.trunc(totalPercentage / modules.length);

// //   let title;
// //   if (globalPercentage > 100){
// //     globalPercentage = 100
// //     title = 'Grandmaster';

// //   }
// //   else if (globalPercentage >= 92) {
// //     title = 'Grandmaster';
// //   } else if (globalPercentage >= 80) {
// //     title = 'Master';
// //   } else if (globalPercentage >= 60) {
// //     title = 'Genius';
// //   } else if (globalPercentage >= 30) {
// //     title = 'Learner';
// //   } else if (globalPercentage >= 10) {
// //     title = 'Rookie';
// //   } else {
// //     title = 'Noob';
// //   }

// //   return { title, globalPercentage };
// // };
// // const getUserRank = async (userId, moduleId) => {
// //   const userRankResult = await prisma.$queryRaw`
// //   WITH RankedUsers AS (
// //     SELECT
// //       u.Id AS Id,
// //       ROW_NUMBER() OVER (ORDER BY p.totalPoints DESC, p.currentTime ASC) AS userRank,
// //       COUNT(*) OVER () AS totalUsers
// //     FROM \`User\` u
// //     JOIN \`Points\` p ON u.Id = p.userId
// //     WHERE p.moduleId = ${moduleId}
// //   )
// //   SELECT Id, userRank, totalUsers
// //   FROM RankedUsers;
// //   `;
  
// //   const userRank = userRankResult.find(user => user.Id == userId)
// //   return {userRank:Number(userRank.userRank),totalUsers:Number(userRank.totalUsers)};
// // };


// // const getOverAllSemesterRank = async (user, semester) => {
// //   let userRankResult;

// //   if (semester === "SEMESTER1") {
// //     userRankResult = await prisma.$queryRaw`
// //       SELECT
// //         u.Id AS userId,
// //         SUM(p.totalPoints) AS totalPoints,
// //         ROW_NUMBER() OVER (ORDER BY SUM(p.totalPoints) DESC, MIN(p.currentTime) ASC) AS userRank,
// //         COUNT(*) OVER () AS totalUsers
// //       FROM \`User\` u
// //       JOIN \`Points\` p ON u.Id = p.userId
// //       JOIN \`Module\` m ON p.moduleId = m.Id
// //       WHERE u.Plan = ${user.Plan} AND u.Semester1 = true
// //         AND m.Year = ${user.Plan} AND m.Semester = "SEMESTER1"
// //       GROUP BY u.Id
// //     `;
// //   } else {
// //     userRankResult = await prisma.$queryRaw`
// //       SELECT
// //         u.Id AS userId,
// //         SUM(p.totalPoints) AS totalPoints,
// //         ROW_NUMBER() OVER (ORDER BY SUM(p.totalPoints) DESC,MIN(p.currentTime) ASC) AS userRank,
// //         COUNT(*) OVER () AS totalUsers
// //       FROM \`User\` u
// //       JOIN \`Points\` p ON u.Id = p.userId
// //       JOIN \`Module\` m ON p.moduleId = m.Id
// //       WHERE u.Plan = ${user.Plan} AND u.Semester2 = true 
// //         AND m.Year = ${user.Plan} AND m.Semester = "SEMESTER2"
// //       GROUP BY u.Id
// //     `;
// //   }

// //   const userRank = userRankResult.find(item => item.userId == user.Id)
// //   return {userRank:Number(userRank.userRank),totalPoints:Number(userRank.totalPoints),totalUsers:Number(userRank.totalUsers)};

// // };
// const getUserModules = async (sem1,sem2,plan,subscription) =>{
//   let userModules;
//   if(sem1 && !sem2){
//       if(subscription === "FREE"){
//           userModules = await prisma.module.findMany({
//               where:{
//                   isFree:true,
//                   Year:plan,
//                   Semester:'SEMESTER1',
//               }
//           })
//       }
//       else{
//           userModules = await prisma.module.findMany({
//               where:{
                  
//                   Year:plan,
//                   Semester:'SEMESTER1',
//               }
//           })
//       }
//   }
//   else if(sem2 && !sem1){
//       if(subscription === "FREE"){
//           userModules = await prisma.module.findMany({
//               where:{
//                   isFree:true,
//                   Year:plan,
//                   Semester:'SEMESTER2',
//               }
//           })

//       }
//       else{
//           userModules = await prisma.module.findMany({
//               where:{
//                   Year:plan,
//                   Semester:'SEMESTER2',
//               }
//           })
//       }

//   }
//   else if (sem1 && sem2){
//       if(subscription === "FREE"){
//           const sem1 = await prisma.module.findMany({
//               where:{
//                   isFree:true,
//                   Year:plan,
//                   Semester:'SEMESTER1',
//               }
//           })
//           const sem2 = await prisma.module.findMany({
//               where:{
//                   isFree:true,
//                   Year:plan,
//                   Semester:'SEMESTER2',
//               }
//           })

//           userModules = sem1.concat(sem2)
//       }
//       else{
//           const sem1 = await prisma.module.findMany({
//               where:{
//                   Year:plan,
//                   Semester:'SEMESTER1',
//               }
//           })
//           const sem2 = await prisma.module.findMany({
//               where:{
//                   Year:plan,
//                   Semester:'SEMESTER2',
//               }
//           })
//           userModules = sem1.concat(sem2)
//       }
//   }
//   return userModules
// }

// const main = async () => {
//   const user = await prisma.user.findUnique({
//     where: {
//       Id: 67,
//     },
//   });
  
//   let result = await getUserModules(true,true,"FIFTH","PAID")
//   console.log(result);
// };

// main();