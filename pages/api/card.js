import nc from "next-connect"
import multer from "multer"
import path from "path"


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {cb(null, true);}
  else {cb(null, false);}
}
const upload = multer({  storage: storage, fileFilter: fileFilter })
const handler = nc()
let card = {};

handler.get(async (req, res) => {
  res.status(200).json(card);
});

handler.post(upload.single("imageFile"), async (req, res) => {
  card = {
    title: req.body.title,
    desc: req.body.desc,
    imageFile: req.file,
    imageUrl: req.body.imageUrl
  }
  res.status(200)
})

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler