const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const queryQuestions = async (Id,Where)=>{
    if (Where === "COURS") {
        const questions = await prisma.cours.findMany({
            where:{
                Id:Id
            },
            select:{
                Questions:{
                    orderBy:{
                      		Id:"asc",
                    },
                    include:{
                        Options:true,
                        Parent:true,
                        Children:{
                            include:{
                                Options:true
                            }
                        },
                        Exam:{
                            select:{
                                Session:true,
                                Year:true,
                            }
                        }
                    }
                }
            }
        })
        return questions[0].Questions
    } else if (Where === "EXAM") {
        const questions = await prisma.exam.findMany({
            where:{
                Id:Id
            },
            select:{
                Questions:{
                    orderBy:{
                        Number:"asc"
                    },
                    include:{
                        Options:true,
                        Parent:true,
                        Children:{
                            include:{
                                Options:true
                            }
                        },
                        Exam:{
                            select:{
                                Session:true,
                                Year:true,
                            }
                        }
                    }
                }
            }
        })
        return questions[0].Questions
    }
    else{
        const questions = []
    }
}


module.exports = {
    queryQuestions,
}
