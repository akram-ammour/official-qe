const express = require('express')
const router = express.Router()

const {
    uploadImage,
    getImage,
    deleteImage,
    createImage
} = require('../controllers/images')

const FindExtension = (mimetype) =>{
    switch (mimetype) {
        case "image/jpeg":
            
            return ".jpeg"
            break;
        case "image/svg+xml":
            
            return ".svg"
            break;
        case "image/png":
            return ".png"
            break;
    
        default:
            return ".png"
            break;
    }
}

const path = require("path")
const multer = require('multer')
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"public")
    },
    filename: (req,file,cb) =>{
        cb(null,Date.now() + FindExtension(file.mimetype))
    }
})

const verifyRole = require('../middlewares/verifyRole')
const upload  = multer({storage:storage})

// router.route('image/:id').get().post().delete().update()
router.route('/:id').patch(verifyRole('ADMIN'),upload.single("image"),uploadImage).get(getImage).delete(verifyRole('ADMIN'),deleteImage)
// router.route('/:id').patch(verifyRole('ADMIN'),upload.single("image"),uploadImage).get(getImage)
// router.route('/:image').delete(verifyRole('ADMIN'),deleteImage)
router.route('/').post(verifyRole('ADMIN'),upload.single("image"),createImage)

// get gets the data

// post creates the data for the first time 

// update => (deletes the image with the questionId from storage) then //! uploads the image and put it's value in the db 

// delete => (deletes the image with the questionId in db and fom storage)

//examid_questionid_randomDate

module.exports = router