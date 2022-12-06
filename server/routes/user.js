const express = require('express')
const UserController = require('../controllers/userController')
const multer = require('multer')
const router = express()
const authentication = require('../middlewares/authentication')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    } 
})

const upload = multer({storage: storage})

router.post('/register', upload.single('profilePicture'),  UserController.register)
router.post ('/login', UserController.login)
router.post('/googlelogin', UserController.googleLogin)

router.use(authentication)
router.patch('/status', UserController.updateStatus)

module.exports = router