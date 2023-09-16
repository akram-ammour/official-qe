const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {queryAllModules} = require("../utils/dbFunc/homeArea")
const {queryCourses,queryExams,queryCourseProgress,queryExamProgress} = require("../utils/dbFunc/modArea")

//? only be able to create module if user is Admin
// create a module
const createModule = async (req, res) => {
    const {Year,Semester,Title,Icon,isFree} = req.body
 try {
    const module = await prisma.module.create({
        data:{
            Title:Title.trim(),
            Icon:Icon.trim(),
            Year,
            Semester,
            isFree
        },
    })
    res.json({msg:"created successfuly",status:"success",result:module})
  } catch (error) {

    console.error("Error posting module:", error);
    // res.status(500).json({ error: "An error occurred" });
    res.status(500).json({ error: `an error occured`,error:error });
  } finally {
    prisma.$disconnect();
  }
}


// retrieve all modules
// [
//   {
//       "Id": 1,
//       "Year": "FIRST",
//       "Semester": "SEMESTER1",
//       "Title": "Anatomie 1",
//       "Icon": "tibia",
//       "color": "RED",
//       "Cours": [],
//       "Exam": []
//   },
//   {
//       "Id": 4,
//       "Year": "FIRST",
//       "Semester": "SEMESTER1",
//       "Title": "Biochimie Fondamentale",
//       "Icon": "science",
//       "color": "RED",
//       "Cours": [],
//       "Exam": []
//   },
//   {
//       "Id": 5,
//       "Year": "FIRST",
//       "Semester": "SEMESTER1",
//       "Title": "Santé publique",
//       "Icon": "bar_chart_4_bars",
//       "color": "RED",
//       "Cours": [],
//       "Exam": []
//   },
//   {
//       "Id": 11,
//       "Year": "FIRST",
//       "Semester": "SEMESTER1",
//       "Title": "Tice & communication",
//       "Icon": "computer",
//       "color": "RED",
//       "Cours": [],
//       "Exam": []
//   },
//   {
//       "Id": 3,
//       "Year": "FIRST",
//       "Semester": "SEMESTER2",
//       "Title": "Anatomie 2",
//       "Icon": "gastroenterology",
//       "color": "RED",
//       "Cours": [],
//       "Exam": []
//   },
//   {
//       "Id": 2,
//       "Year": "SECOND",
//       "Semester": "SEMESTER1",
//       "Title": "Physiologie 1",
//       "Icon": "pulmonology",
//       "color": "GREEN",
//       "Cours": [
//           {
//               "Id": 1,
//               "title": "Cours introductif",
//               "moduleId": 2
//           },
//           {
//               "Id": 2,
//               "title": "Physiologie digestive",
//               "moduleId": 2
//           },
//           {
//               "Id": 3,
//               "title": "Phase buccale et oesophagienne",
//               "moduleId": 2
//           },
//           {
//               "Id": 4,
//               "title": "Étape gastrique",
//               "moduleId": 2
//           },
//           {
//               "Id": 5,
//               "title": "L’étape intestinale",
//               "moduleId": 2
//           },
//           {
//               "Id": 6,
//               "title": "Physiologie de la sécrétion biliaire",
//               "moduleId": 2
//           },
//           {
//               "Id": 7,
//               "title": "Physiologie de la motricité intestinale",
//               "moduleId": 2
//           },
//           {
//               "Id": 8,
//               "title": "L'absorption intestinale",
//               "moduleId": 2
//           },
//           {
//               "Id": 9,
//               "title": "Physiologie colique avec p",
//               "moduleId": 2
//           },
//           {
//               "Id": 10,
//               "title": "Physiologie hépatique",
//               "moduleId": 2
//           },
//           {
//               "Id": 11,
//               "title": "Introduction sur la Physiologie respiratoire",
//               "moduleId": 2
//           },
//           {
//               "Id": 12,
//               "title": "La mécanique ventilatoire",
//               "moduleId": 2
//           },
//           {
//               "Id": 13,
//               "title": "Les échanges gazeux respiratoires",
//               "moduleId": 2
//           },
//           {
//               "Id": 14,
//               "title": "Transport du gaz dans le sang",
//               "moduleId": 2
//           },
//           {
//               "Id": 15,
//               "title": "La bronchomotricité",
//               "moduleId": 2
//           },
//           {
//               "Id": 16,
//               "title": "La régulation de la ventilation",
//               "moduleId": 2
//           },
//           {
//               "Id": 17,
//               "title": "Cycle cardiaque",
//               "moduleId": 2
//           },
//           {
//               "Id": 18,
//               "title": "Débit cardiaque",
//               "moduleId": 2
//           },
//           {
//               "Id": 19,
//               "title": "Activité électrique cardiaque",
//               "moduleId": 2
//           },
//           {
//               "Id": 20,
//               "title": "Mécanismes moléculaires de la contraction et du couplage excitation-contraction cardiaque",
//               "moduleId": 2
//           },
//           {
//               "Id": 21,
//               "title": "Vitesse circulatoire et volume sanguin",
//               "moduleId": 2
//           }
//       ],
//       "Exam": [
//           {
//               "Id": 2,
//               "Year": 2021,
//               "Session": "N",
//               "ModuleId": 2
//           }
//       ]
//   },
//   {
//       "Id": 7,
//       "Year": "SECOND",
//       "Semester": "SEMESTER1",
//       "Title": "Anatomie 3",
//       "Icon": "neurology",
//       "color": "YELLOW",
//       "Cours": [],
//       "Exam": []
//   },
//   {
//       "Id": 10,
//       "Year": "SECOND",
//       "Semester": "SEMESTER1",
//       "Title": "Microbiologie",
//       "Icon": "microbiology",
//       "color": "RED",
//       "Cours": [],
//       "Exam": []
//   },
//   {
//       "Id": 8,
//       "Year": "SECOND",
//       "Semester": "SEMESTER2",
//       "Title": "anatomie 4",
//       "Icon": "ophthalmology",
//       "color": "RED",
//       "Cours": [],
//       "Exam": []
//   },
//   {
//       "Id": 9,
//       "Year": "SECOND",
//       "Semester": "SEMESTER2",
//       "Title": "Biochimie Clinique",
//       "Icon": "science",
//       "color": "RED",
//       "Cours": [],
//       "Exam": []
//   },
//   {
//       "Id": 12,
//       "Year": "SECOND",
//       "Semester": "SEMESTER2",
//       "Title": "Hématologie Fondamentale",
//       "Icon": "hematology",
//       "color": "RED",
//       "Cours": [],
//       "Exam": []
//   },
//   {
//       "Id": 13,
//       "Year": "THIRD",
//       "Semester": "SEMESTER1",
//       "Title": "Maladie Infectieuse - Parasitologie - mycologie",
//       "Icon": "medical_mask",
//       "color": "RED",
//       "Cours": [],
//       "Exam": []
//   },
//   {
//       "Id": 14,
//       "Year": "THIRD",
//       "Semester": "SEMESTER1",
//       "Title": "Pharmacologie",
//       "Icon": "pill",
//       "color": "RED",
//       "Cours": [],
//       "Exam": []
//   },
//   {
//       "Id": 15,
//       "Year": "THIRD",
//       "Semester": "SEMESTER1",
//       "Title": "Anatomie Pathologique",
//       "Icon": "biotech",
//       "color": "RED",
//       "Cours": [],
//       "Exam": []
//   },
//   {
//       "Id": 16,
//       "Year": "THIRD",
//       "Semester": "SEMESTER1",
//       "Title": "Radiologie Imagerie",
//       "Icon": "radiology",
//       "color": "RED",
//       "Cours": [],
//       "Exam": []
//   }
// ]
const getallModules = async (req,res) =>{
    try {
        const modules = await prisma.module.findMany({include:{
          Cours: true,
          Exam: true,
        },
      orderBy:[
        {
          Year:"asc"
        },
        {
          Semester:"asc"
        }
      ]
    })
        res.json(modules)
      } catch (error) {

        console.error("Error retrieving modules:", error);
        // res.status(500).json({ error: "An error occurred" });
        res.status(500).json({ error: `an error occured`,error:error });
      } finally {
        prisma.$disconnect();
      }
}

// get specific année and semester modules 
// [
//   {
//       "Id": 1,
//       "Year": "FIRST",
//       "Semester": "SEMESTER1",
//       "Title": "Anatomie 1",
//       "Icon": "tibia",
//       "color": "RED"
//   },
//   {
//       "Id": 4,
//       "Year": "FIRST",
//       "Semester": "SEMESTER1",
//       "Title": "Biochimie Fondamentale",
//       "Icon": "science",
//       "color": "RED"
//   },
//   {
//       "Id": 5,
//       "Year": "FIRST",
//       "Semester": "SEMESTER1",
//       "Title": "Santé publique",
//       "Icon": "bar_chart_4_bars",
//       "color": "RED"
//   },
//   {
//       "Id": 11,
//       "Year": "FIRST",
//       "Semester": "SEMESTER1",
//       "Title": "Tice & communication",
//       "Icon": "computer",
//       "color": "RED"
//   }
// ]
const getSpecific = async (req,res) =>{
    const {Year,Semester} = req.query
    try {
        const modules = await prisma.module.findMany({
            where:{
                Year,
                Semester
          }
        })
        res.json(modules)
      } catch (error) {

        console.error("Error retrieving modules:", error);
        // res.status(500).json({ error: "An error occurred" });
        res.status(500).json({ error: `an error occured`,error:error });
      } finally {
        prisma.$disconnect();
      }
}

// updates a module year semester or title or icon
const updateModule = async (req,res) =>{
    const id = Number(req.params.id)

    const {Year,Semester,Title,Icon,isFree} = req.body
    try {
        const module = await prisma.module.update({
            where:{
                Id:id
            },
            data:{
                Year,
                Semester,
                Title:Title.trim(),
                Icon:Icon.trim(),
                isFree
            }
        })
        res.json({msg:"updated successfuly",status:"success",result:module})

      } catch (error) {

        console.error("Error updating module:", error);
        // res.status(500).json({ error: "An error occurred" });
        res.status(500).json({ error: `an error occured`,error:error });
      } finally {
        prisma.$disconnect();
      }
}

// delete a specific module
const deleteModule = async (req,res) =>{
    const id = Number(req.params.id)

    try {
        const module = await prisma.module.delete({
            where:{
                Id:id
            }
        })
        res.json({msg:"deleted successfuly",result:module})

      } catch (error) {

        console.error("Error retrieving modules:", error);
        // res.status(500).json({ error: "An error occurred" });
        res.status(500).json({ error: `an error occured`,error:error });
      } finally {
        prisma.$disconnect();
      }
}


// get specific module from it's id
const getModule = async (req,res) =>{
  const id = Number(req.params.id)
  try{
    const module = await prisma.module.findUnique({
      where:{
        Id:id
      },
      include:{
        Cours:true,
      }
    })
    res.json(module)
  }
  catch (error){
    res.json({msg:"unable to retreive specific module",error:error})
  }
  finally{
    prisma.$disconnect()
  }


}

//! from here check user Modules and roles
// //get user modules
// const getUserModules = async (req,res)=> {
//   const {Year, Semester, UserId} = req.body
//   try{
//     const modules = await queryAllModules(Year, Semester, UserId)
//     res.json(modules)
//   }
//   catch (error){
//     res.json({msg:"unable to retreive specific module",error:error})
//   }
//   finally{
//     prisma.$disconnect()
//   }
// }

//get courses and exams with soit disant stats
// const getCoursesExams = async (req,res) =>{
//   const {UserId, ModuleId} = req.body
//   try{
//     const courses = await queryCourses(UserId, ModuleId)
//     const exams = await queryExams(UserId, ModuleId)
//     res.json({courses,exams})
//   }
//   catch (error){
//     res.json({msg:"unable to retreive courses",error:error})
//   }
//   finally{
//     prisma.$disconnect()
//   }
// }



module.exports = {
    getallModules,
    createModule,
    getSpecific,
    updateModule,
    deleteModule,
    getModule,
    // getUserModules,
    // getCoursesExams,
}