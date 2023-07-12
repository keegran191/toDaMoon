import multer from 'multer';
import { extname, join } from 'path';
import pool from "../../../lib/database";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, join(process.cwd(), '/public/uploads'));
    },
    filename: function (req, file, cb) {
      let name = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + extname(file.originalname)
      cb(null, name);
    }
  });
  
const upload = multer({ storage: storage });

export default function handle(req, res) {
    let formData = req.body;
    let Stock = JSON.parse(JSON.stringify(formData));

    return res.status(200).json({ success: true, message: 'Add Stock Complete' });
}

export const config = {
    api: {
        bodyParser: false,
        sizeLimit: '50mb',
    },
};