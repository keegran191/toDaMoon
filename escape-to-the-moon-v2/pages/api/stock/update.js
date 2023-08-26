import multer from 'multer';
import { extname, join } from 'path';
import db from "../../../lib/database";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(process.cwd(), '/public/uploads'));
  },
  filename: function (req, file, cb) {
    let name = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + extname(file.originalname);
    cb(null, name);
  }
});

const upload = multer({ storage: storage });

export default async function handler(req, res) {
  upload.single('images')(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log('Multer error:', err);
      return res.status(500).json({ error: 'Failed to upload file.' });
    } else if (err) {
      console.log('Unknown error:', err);
      return res.status(500).json({ error: 'Unknown error occurred.' });
    }
    const stockId = req.body.stockId;

    const updatedStock = {
      Title: req.body.stockName,
      Detail: req.body.stockDetail,
      Amount: req.body.stockAmount,
      Price: req.body.stockPrice,
      IsAdvise: req.body.IsAdviseItem,
      StockType: req.body.stockType,
      Process: req.body.coffeeProcess,
      Roast: req.body.coffeeRoast,
      Flavor: req.body.coffeeFlavor,
      CategoryId: req.body.category,
      SubCategoryId: req.body.subCategory,
      Image: req.body.existingImages 
    };

    if (req.file && req.file.filename !== req.body.existingImages) {
      const fileName = req.file.filename;
      console.log('Uploaded file:', fileName);
      updatedStock.Image = fileName;
    }

    try {
      if (!req.file && !updatedStock.Image) {
        // No new image selected and no existing image provided
        const existingStock = await getStockById(stockId);
        if (existingStock) {
          updatedStock.Image = existingStock.Image;
        }
      }

      await updateStock(stockId, updatedStock);
      return res.status(200).json({ success: true, message: 'Update Stock Complete' });
    } catch (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database Error' });
    }
  });
}

async function getStockById(stockId) {
  const pool = await db.getConnection();
  try {
    const [results] = await pool.query('SELECT * FROM stock WHERE id = ?', [stockId]);
    if (results.length > 0) {
      pool.destroy();
      return results[0];
    }
    return null;
  } catch (err) {
    throw err;
  }
}

async function updateStock(stockId, updatedStock) {

  const pool = await db.getConnection();
  try {
    await pool.query(
      'UPDATE stock SET Title = ?, Detail = ?, Amount = ?, Price = ?, IsAdvise = ?, StockType = ?, Process = ?, Roast = ?, Flavor = ?, CategoryId = ?, SubCategoryId = ?, Image = ? WHERE id = ?',
      [
        updatedStock.Title,
        updatedStock.Detail,
        updatedStock.Amount,
        updatedStock.Price,
        updatedStock.IsAdvise,
        updatedStock.StockType,
        updatedStock.Process,
        updatedStock.Roast,
        updatedStock.Flavor,
        updatedStock.CategoryId,
        updatedStock.SubCategoryId,
        updatedStock.Image,
        stockId
      ]
    );
    pool.destroy();
  } catch (err) {
    throw err;
  }
}

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '50mb',
  },
};
