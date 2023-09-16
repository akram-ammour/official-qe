const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs')
const path = require('path')

const uploadImage = async (req,res) =>{
    const questionId = Number(req.params.id)
    try{
        const question = await prisma.question.findUnique({
            where:{
                Id:questionId
            }
        })
        if(!question) return res.status(404).json({message:"question doesn't exist"})
        if(!question?.Image) {
            await prisma.question.update({
                where:{
                    Id:questionId
                },
                data:{
                    Image:req.file.filename
                }
            })
            return res.json({ message: 'Image created successfully',status:"success",fileInfos:req.file});
        }
        else{
            const imagePath = path.join(__dirname, "..", 'public', question.Image)
            fs.unlink(imagePath, async (err) => {
                if(err){
                    return res.status(500).json({ message: 'Error deleting the image',status:"failed",message:err.message });
                } else {
                    await prisma.question.update({
                        where:{
                            Id:questionId
                        },
                        data:{
                            Image:req.file.filename
                        }
                    })
                    return res.json({ message: 'Image updated successfully',status:"success",fileInfos:req.file});
                }
            })
        }

  

    }
    catch (error){
        console.log("Error uploading image :", error);
        return res.status(500).json({ error: `an error occured`, error: error.message });
    }
    finally{
        prisma.$disconnect()
    }
}

const getImage = async (req,res) =>{
    const questionId = Number(req.params.id)
    try{
        const question = await prisma.question.findUnique({
            where:{
                Id:questionId
            }
        })
        if(!question) return res.status(404).json({message:"question doesn't exist"})
        if(!question.Image) return res.status(404).json({message:"this question doesn't have an image"})
        return res.json({Image:question.Image})
    }
    catch (error){
        console.log("Error getting image :", error);
        return res.status(500).json({ error: `an error occured`, error: error.message });
    }
    finally{
        prisma.$disconnect()
    }
}

const deleteImage = async (req,res) => {
    const questionId = Number(req.params.id)
    try{
        const question = await prisma.question.findUnique({
            where:{
                Id:questionId
            }
        })
        if(!question) return res.status(404).json({message:"question doesn't exist"})
        if(!question?.Image) return res.status(404).json({message:"this question doesn't have an image therefore nothing can be deleted"})
        const imagePath = path.join(__dirname, "..", 'public', question.Image)
        
        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).json({ message: 'Image doesn\'t exist',status:"failed",message:err.message });
            } else {
                fs.unlink(imagePath, async (err) => {
                    if(err){
                        // console.log("here error")
                        return res.status(500).json({ message: 'Error deleting the image',status:"failed",message:err.message });
                    } else {
                        await prisma.question.update({
                            where:{
                                Id:questionId
                            },
                            data:{
                                Image:null
                            }
                        })
                        return res.json({ message: 'Image deleted successfully',status:"success" });
                    }
                })
            }
          });
        
      
        
    }
    catch (error){
        console.log("Error deleting image :", error.message);
        console.error(error);
        return res.status(500).json({ error: `an error occured`, error: error.message });
    }
    finally{
        prisma.$disconnect()
    }
}

const createImage = async (req,res) =>{
    res.json({ message: 'Image created successfully',status:"success",fileInfos:req.file})
}
module.exports = {
    uploadImage,
    deleteImage,
    getImage,
    createImage
}