const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const username = req.body.username; 
        const userFolderPath = `./resources/${username}`; 
        cb(null, userFolderPath);
    },
    filename: (req, file, cb) => {
        const username = req.body.username; 
        const typeFile = file.originalname.split('.').pop();
        const fileName = `${username}_${Date.now()}.${typeFile}`;
        req.fileName = fileName;
        cb(null, fileName);
    }
  });
const upload = multer({ storage });
const uploadFile = (req, res, next) => {
    console.log(req.body);
    upload.single('file')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({success: false, message: "Lỗi upload file."});
      } else if (err) {
        console.log(err);
        return res.status(500).json({success: false, message: "Interval Server Error!"});
      }
      if (!req.file) {
        return res.status(400).json({ success: false, message: "File upload không tồn tại" });
      }
  
      res.status(200).json({ success: true, message: "File upload thành công", fileName: req.fileName});
    });
  };
module.exports = uploadFile;