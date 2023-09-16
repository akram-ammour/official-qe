const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


//gets all courses according to modules order
const getAllCourses = async (req,res) =>{
    try{
        const module = await prisma.cours.findMany({
            orderBy:[
                { module: { Year: 'asc' } },
                { module: { Semester: 'asc' } },
            ]
        })
        res.json(module)
    }
    catch (e){
        console.error("Error retrieving Courses:", e);
        // res.status(500).json({ error: "An error occurred" });
        res.status(500).json({ error: `an error occured`,error:e });

    }
    finally{
        prisma.$disconnect();
    }
}
// make it not accessible if role is user
const createCourse = async (req,res) =>{
    const {title,moduleId} = req.body
    try{
        const courseExist = await prisma.cours.findFirst({
            where:{
                title:title
            }
        })
        if (courseExist) {
            res.json({status:"exists",message:"course already exists"})
        } else {
        const course = await prisma.cours.create({
            data:{
                title,
                moduleId:Number(moduleId)
            }
        })
        res.json({status:"success",message:"Course added successfully"})
        }
        
    }
    catch (e){
        res.json({msg:"unable to create course",error:e})
    }
    finally{
        prisma.$disconnect()
    }
}

// means changing it's title 
//? make it not accessible if the role is user send unauthorized or 401
const updateCourse = async (req,res) =>{
    const id = Number(req.params.id)
    const {title} = req.body
    try{
        const courseExist = await prisma.cours.findFirst({
            where:{
                title:title
            }
        })
        if (courseExist) {
            res.json({status:"exists",message:"course already exists"})
        } else {
        const course = await prisma.cours.update({
            where:{
                Id:id
            },
            data:{
                title,
            }
        })
        res.json({
            status:"success",
            message:"Course updated successfully"
        })
    }
    }
    catch (e){
        res.json({msg:"unable to update course",error:e})
    }
    finally{
        prisma.$disconnect()
    }
}


// means deleting the course
//? make it not accessible if the role is user send unauthorized or 401
const deleteCourse = async (req,res) =>{
    const id = Number(req.params.id)
    try{
        const doesCourseExists = await prisma.cours.findUnique({
            where:{
                Id:id
            }
        })
        if(doesCourseExists){
            const course = await prisma.cours.delete({
                where:{
                    Id:id
                },
            })
            res.json({
                status:"success",
                message:"Course deleted successfully"
            })
        }
        else{
            res.json({
                message: "Course doesn't exist",
                status: 404,
              });
        }
    }
    catch (e){
        console.log(e.message)
        res.json({msg:"unable to delete course",error:e.message})
    }
    finally{
        prisma.$disconnect()
    }
}


// gets a specific course from Id
const getCourse = async (req,res) =>{
    const id = Number(req.params.id)
    try{
        const course = await prisma.cours.findUnique({
            where:{
                Id:id
            },
        })
        if(course){
            res.json(course)
        }
        else{
            res.json({
                status:404,
                message:"User doesn\'t exist"
            })
        }
    }
    catch(e){
        res.json({msg:"unable to find course", error:e})
    }
    finally{
        prisma.$disconnect()
    }
}

// gets all the courses in a module
const getModuleCourses = async (req,res) =>{
    const moduleId = Number(req.query.moduleId)
    try{
        const courses = await prisma.cours.findMany({
            where:{
                moduleId:moduleId
            }
        })
        res.json(courses)
    }
    catch(e){
        res.json({msg:"unable to find moduleCourses", e})
    }
    finally{
        prisma.$disconnect()
    }
}


//! to delete
const test = async (req,res) =>{
    res.json("hello world")
}

module.exports = {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourse,
    getModuleCourses,
    test
}