const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path')
const fs = require('fs')

// const {createExam} = require("../utils/adminFunc/adminArea");
const { queryQuestions } = require('../utils/dbFunc/questionArea');

// create exam works
const createExam = async (req, res) => {
    const { Year, Session, ModuleId, Questions,isUnique=false,Title=null,Description=null } = req.body;
    try {
        if(!Year || !Session || !ModuleId || !Questions || Questions.length === 0 ) return res.status(400).json({message:"missing data"})
        
        const foundExam = await prisma.exam.count({
          where:{
            ModuleId:Number(ModuleId),
            Year:Number(Year),
            Session,
            isDifferent:isUnique
          }
        })
        if(foundExam) return res.status(409).json({message:"this exam already exists"})
        const exam = await prisma.exam.create({
          data:{
            Year:Number(Year),
            Session,
            Description,
            Title: Title || null,
            isDifferent:isUnique,
            ModuleId:Number(ModuleId),
          }
        })

        let currentRootQuestion;
        for (let index = 0; index < Questions.length; index++) {
          const question = Questions[index];
          const data = await prisma.question.create({
            data: {
              Number: index + 1,
              Text: question.Text,
              CasClinique: question.CasClinique,
              ExamId: exam.Id,
              CoursId: question.CoursId,
              ParentId: question.ParentId ? currentRootQuestion?.Id : null,
              // i have an issue with the options they are not created
              Options: {
                create: question.Options.map((option,index)=>{
                  return {
                    Choice:option.Choice,
                    Value:option.Value
                  }
                })
              },
            },
          });
        
          if (question.ParentId === null) {
            currentRootQuestion = data;
          }
        }

      const createdExam = await prisma.exam.findUnique({
        where:{
          Id:exam.Id
        },
        include:{
          Questions:{
            include:{
              Options:{
                select:{
                  Id:true,
                  Choice:true,
                  Value:true,
                }
              },
            },
          },
        },
      })
      res.status(200).json({message:"created successfully",createdExam,status:"success"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong while creating the exam.',mesage:error.message });
    }
}



const getExam = async (req, res) =>{
    const {m:moduleId,y:year,s:session,u:isDifferent} = req.query
    if(!moduleId || !year || !session || !isDifferent) return res.status(400).json({message:"please insert all the infos"})
    try{
        const exam = await prisma.exam.findFirst({
            where:{
                ModuleId:Number(moduleId),
                Session:session,
                Year:Number(year),
                isDifferent:isDifferent === "true" ? true : false,
            }
        })
        if(!exam){
            res.status(404).json({error:"exam Not found",status:404,body:req.query,exam,isDifferent:Boolean(isDifferent)})
        }
        else{
            const result = await queryQuestions(exam.Id, "EXAM");
            res.json({exam,questions:result});    
        }
    }
    catch(error){
        console.log(error)
        res.json({error:"could not get exam",message:error.message})
    }
    finally{
        prisma.$disconnect()
    }
}



// deletes everything on cascade which is actually cool
const deleteExam = async (req,res) =>{
    const examId = Number(req.params.id)
    try{
        const exam = await prisma.exam.findUnique({
            where:{ 
              Id:examId
            }
        })
        if(!exam){
            res.status(404).json({error:"exam Not found",status:404})
        }
        else{
            const result = await prisma.exam.delete({
                where:{
                    Id:exam.Id
                },
                include:{
                  Questions:true
                }
            });
            result.Questions.forEach(async question => {
              if (question?.Image) {
                  const imagePath = path.join(__dirname,'..', 'public', question.Image);
                  try {
                      // Delete the image file
                      await fs.promises.unlink(imagePath);
                  } catch (error) {
                      console.error(`Error deleting image: ${imagePath}`, error);
                  }
              }
          });
            res.json({message:"exam deleted",response:result,status:"success"})
        }   
    }
    catch (error) {
        console.log(error.message)
        res.json({error:'not able to delete the exam', message:error.message })
    }
    finally{
        prisma.$disconnect()
    }
}


  /*
    so my logic is to update an exam is to:
    1st check if the exam exists
      if no sendstatus 404
      if yes continue
    2nd update the exam year session and moduleId 
    3rd check the questions for question in question if question contains an Id update it 
      //! useCase 1 : question got an id => update the question with id if it got a cas clinique then append it to parentQuestion array then moveon to options which updating and handling will be independant i guess i will create a controller to create and add options haka my brain won't go error 500
        //? if i change the option's text or mark it as prev => !prev delete the userProgress the userAnswers and eventually the points of that question 

      //! useCase 2 : the question doesn't have an id well it's easy then create the question with the options using the same logic as the
  */
const updateExam = async (req,res) =>{

  const examId = Number(req.params.id);
  const { Questions,Description } = req.body;
  try {
  // case provided data isn't enough
  if(!Questions || Questions.length === 0 ) return res.status(400).json({message:"missing data"})
  // case exam is not found
  const foundExam = await prisma.exam.count({
    where:{
      Id:examId
    }
  })
  if(!foundExam) return res.status(409).json({message:"this exam doesn't exist"})
  await prisma.exam.update({
    where:{
      Id:examId
    },
    data:{
      Description:Description
    }
  })

  let currentRootQuestion;
  for (let index = 0; index < Questions.length; index++) {
    const question = Questions[index];
    if(question?.Id) { // it already exists it has an id then it can be modified
      const newQuestion = await prisma.question.update({
        where:{
          Id:question.Id
        },
        data:{
          Text:question.Text,
          CasClinique:question.CasClinique,
          CoursId:question.CoursId,
          Number:index+1,
          ExamId:foundExam.Id,
          ParentId: question.ParentId ? currentRootQuestion?.Id : null 
        }
      })
      if(question.ParentId === null){
        currentRootQuestion = question
      }
    }
    else{
      const newQuestion = await prisma.question.create({
        data:{
          Text:question.Text,
          CasClinique:question.CasClinique,
          CoursId:question.CoursId,
          Number:index+1,
          ExamId:examId,
          ParentId: question.ParentId ? currentRootQuestion?.Id : null ,
          Options :{
            create:question.Options.map((option,index) =>{
              return {
                Choice:option.Choice,
                Value:option.Value
              }
            })
          },
        }
      })
      if(question.ParentId === null){
        currentRootQuestion = question
      }
    }
  }
  const updatedExam = await prisma.exam.findUnique({
    where:{
      Id:examId
    },
    include:{
      Questions:{
        include:{
          Options:{
            select:{
              Id:true,
              Choice:true,
              Value:true,
            }
          },
          Children:{
            include:{
              Options:true
            }
          },
          Parent:{
            include:{
              Options:true
            }
          },  
        },  
      },
    },
  })
  return res.status(200).json({message:"updated successfully",updatedExam,status:"success"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while updating the exam.',message:error.message });
  }
}

// if i do one of these make sure to delete userAnswers and userProgress
//


const createOption = async (req,res) => {
  const questionId = Number(req.params.id)
  const {Choice,Value} = req.body
  try{
    const createdOption = await prisma.options.create({
      data:{
        questionId,
        Choice,
        Value
      },
      include:{
        Question:{
          include:{
            Options:true
          }
        }
      }
    })
    if(createdOption){
      await prisma.userCourseAnswer.deleteMany({
        where:{
          questionId:questionId
        }
      })

      await prisma.userExamAnswer.deleteMany({
        where:{
          questionId:questionId
        }
      })

      await prisma.userExamProgress.deleteMany({
        where:{
        questionId:questionId
        }
      })

      // each row represents a user end a question
      await prisma.userCourseProgress.deleteMany({
        where:{
          questionId:questionId
        }
      })
          
      }
    res.status(200).json({message:"option created successfully",createdOption,status:"success"})
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while creating the option.' });
  }
  finally{
    prisma.$disconnect()
  }
}
const deleteOption = async (req,res) => {
  const optionId = Number(req.params.id)
  try{
    const option = await prisma.options.findUnique({
      where:{
        Id:optionId
      }
    })
    if(!option) return res.status(404).json({message:"option doesn't exist "})
    const deleted = await prisma.options.delete({
      where:{
        Id:optionId
      },
    })
    if(deleted){

      await prisma.userCourseAnswer.deleteMany({
        where:{
          questionId:option.questionId
        }
      })

      await prisma.userExamAnswer.deleteMany({
        where:{
          questionId:option.questionId
        }
      })

      await prisma.userExamProgress.deleteMany({
        where:{
        questionId:option.questionId
        }
      })

      await prisma.userCourseProgress.deleteMany({
        where:{
          questionId:option.questionId
        }
      })
    }
    const newOptions = await prisma.question.findUnique({
      where:{
        Id:option.questionId
      },include:{
        Options:true
      }
    })
    return res.status(200).json({message:"option deleted successfully",newOptions,status:"success"})
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while deleting the option.',message:error.message });
  }
  finally{
    prisma.$disconnect()
  }
}
const updateOption = async (req,res) => {
  const optionId = Number(req.params.id)
  const {Choice,Value} = req.body
  try{
    console.log(optionId)
    const option = await prisma.options.findUnique({
      where:{
        Id:optionId
      },
    })

    if(!option) return res.status(404).json({message:"option doesn't exist "})
    const updatedOption = await prisma.options.update({
      where:{
        Id:optionId
      },
      data:{
        Choice,
        Value,
      }
    })
    if (updatedOption) {

        await prisma.userCourseAnswer.deleteMany({
          where:{
            questionId:updatedOption.questionId
          }
        })
  
        await prisma.userExamAnswer.deleteMany({
          where:{
            questionId:updatedOption.questionId
          }
        })
  
        await prisma.userExamProgress.deleteMany({
          where:{
          questionId:updatedOption.questionId
          }
        })
  
        await prisma.userCourseProgress.deleteMany({
          where:{
            questionId:updatedOption.questionId
          }
        })
    }

    return res.status(200).json({message:"option created successfully",updatedOption,status:"success"})
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while updating the option.' });
  }
  finally{
    prisma.$disconnect()
  }
}
const getOption = async (req,res) => {
  const optionId = Number(req.params.id)
  // const {Choice,Value} = req.body
  try{ 
    const option = await prisma.options.findUnique({
      where:{
        Id:optionId
      },
      include:{
        Question:true
      }
    })
    if(!option) return res.status(404).json({message:"not found"})

    return res.status(200).json({option})
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while getting the option.' });
  }
  finally{
    prisma.$disconnect()
  }
}
// create update delete exam
//update + create will be the hardest let's focus on the delete
module.exports = {
    getExam,
    createExam,
    deleteExam,
    updateExam,
    getOption,
    createOption,
    deleteOption,
    updateOption,
}