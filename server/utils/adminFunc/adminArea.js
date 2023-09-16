const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



const createExam = async (ModuleId,Year,Session,questions)=>{
    exam = await prisma.exam.create({
        data:{
            Year,
            Session,
            ModuleId
        }
    })
    questions.forEach(ques => {
        prisma.question.create({
            data:{
                Number:ques.Number,
                Text:ques.Text,
                CasClinique:ques.CasClinique,
                CoursId:ques.Cours,
                ExamId:exam.Id,
            },

        })
        
    });
    return {exam}
}

const queryExam = async () =>{

}










module.exports = {
    createExam,
}