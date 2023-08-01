import multer from 'multer';
import { extname, join } from 'path';
import db from "../../../lib/database";

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


export default function handler(req, res) {

  upload.single('image')(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log('Multer error:', err);
      return res.status(500).json({ success: false, message: 'Failed to upload file.' });
    } else if (err) {
      console.log('Unknown error:', err);
      return res.status(500).json({ success: false, message: 'Unknown error occurred.' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image Required' });
    }

    const fileName = req.file.filename;
    console.log(req.file.destination + '/' + fileName);
    console.log('Uploaded file:', fileName);

    let formData = req.body;
    let Stock = JSON.parse(JSON.stringify(formData));
    console.log("stock", Stock);
    if (Stock.stockName === undefined) {
      return res.status(400).json({ success: false, message: 'Title Required' });
    } else if (Stock.stockPrice === undefined) {
      return res.status(400).json({ success: false, message: 'Price Required' });
    } else if (Stock.stockType === undefined) {
      return res.status(400).json({ success: false, message: 'StockType Required' });
    }

    if (Stock.stockType == 1) {
      if (Stock.coffeeProcess === undefined) {
        return res.status(400).json({ success: false, message: 'Process Required' });
      } else if (Stock.coffeeRoast === undefined) {
        return res.status(400).json({ success: false, message: 'Roast Required' });
      } else if (Stock.coffeeFlavor === undefined) {
        return res.status(400).json({ success: false, message: 'Flavor Required' });
      }
    } else if (Stock.stockType == 2) {
      if (Stock.category === undefined) {
        return res.status(400).json({ success: false, message: 'Category Required' });
      } else if (Stock.subCategory === undefined) {
        return res.status(400).json({ success: false, message: 'Subcategory Required' });
      }
    }
    
    const pool = await db.getConnection();
    try {
      await pool.query(
        'INSERT INTO stock (Title, Detail, Amount, Price, IsAdvise, StockType, Process, Roast, Flavor, CategoryId, SubCategoryId, Image) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          Stock.stockName,
          Stock.stockDetail,
          Stock.stockAmount,
          Stock.stockPrice,
          Stock.IsAdviseItem,
          Stock.stockType,
          Stock.coffeeProcess,
          Stock.coffeeRoast,
          Stock.coffeeFlavor,
          Stock.category,
          Stock.subCategory,
          fileName
        ]
      );
      pool.destroy();;
      return res.status(200).json({ success: true, message: 'Add Stock Complete' });
    } catch (err) {
      console.error('Database Error:', err);
      pool.destroy();
      return res.status(500).json({ error: 'Database Error' });
    }
  });
}

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '50mb',
  },
};

// import multer from 'multer';
// import { extname, join } from 'path';
// import pool from "../../../lib/database";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, join(process.cwd(), 'uploads'));
//   },
//   filename: function (req, file, cb) {
//     let name = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + extname(file.originalname)
//     cb(null, name);
//   }
// });

// const upload = multer({ storage: storage });

// export default function handler(req, res) {
//   upload.single('image')(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       // A Multer error occurred during file upload
//       console.log('Multer error:', err);
//       return res.status(500).json({ error: 'Failed to upload file.' });
//     } else if (err) {
//       // An unknown error occurred during file upload
//       console.log('Unknown error:', err);
//       return res.status(500).json({ error: 'Unknown error occurred.' });
//     }

//     // File upload was successful
//     if (!req.file) {
//       return res.status(400).json({ error: 'Image Require' });
//     }

    

//     // Access the file name
//     const fileName = req.file.filename;
//     console.log('Uploaded file:', fileName);

//     let formData = req.body;
//     let Stock = JSON.parse(JSON.stringify(formData))
//     console.log("stock", Stock);
//     if (Stock.stockName === undefined) {
//       return res.status(400).json({ success: false, message: 'Title Require' });
//     } else if (Stock.stockPrice === undefined) {
//       return res.status(400).json({ success: false, message: 'Price Require' });
//     } else if (Stock.stockType === undefined) {
//       return res.status(400).json({ success: false, message: 'StockType Require'});
//     }

//     if(Stock.stockType == 1) {
//       if (Stock.coffeeProcess === undefined) {
//         return res.status(400).json({ success: false, message: 'Process Require'});
//       } else if (Stock.coffeeRoast === undefined) {
//         return res.status(400).json({ success: false, message: 'Roast Require'});
//       } else if (Stock.coffeeFlavor === undefined) {
//         return res.status(400).json({ success: false, message: 'Flaor Reqire'})
//       }
//     } 
//     else if (Stock.stockType == 2) {
//       if(Stock.category === undefined) {
//         return res.status(400).json({ success: false, message: 'Category Require'});
//       } else if (Stock.subCategory === undefined) {
//         return res.status(400).json({ success: false, message: 'Subcategory Require'});
//       }
//     }
    
//     await pool.query('INSERT INTO stock (Title, Detail, Amount, Price, IsAdvise, StockType, Process, Roast, Flavor, CategoryId, SubCategoryId, Image) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
//     ,[Stock.stockName, Stock.stockDetail, Stock.stockAmount, Stock.stockPrice, Stock.IsAdviseItem, Stock.stockType, Stock.coffeeProcess, Stock.coffeeRoast, 
//     Stock.coffeeFlavor, Stock.category, Stock.subCategory, fileName]).catch((err) => {
//       res.status(500).json({ "Status": "Database Error" });
//       return null;
//     });

//     return res.status(200).json({ success: true, message: 'Add Stock Complete' });
//   });
// }

// export const config = {
//   api: {
//     bodyParser: false,
//     sizeLimit: '50mb',
//   },
// };

// import multer  from 'multer';
// import { extname, join } from 'path';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, join(process.cwd() , 'uploads'))
//   },
//   filename: function (req, file, cb) {
//     let name = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + extname(file.originalname)
//     // While true {
//     //   if (เจอ) {
//     //     name = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + extname(file.originalname)
//     //   }
//     //   else {
//     //     break
//     //   }
//     // }
//     cb(null, name)
//   }
// })

// const upload = multer({ storage: storage })

// async function handler(req, res) {
//   try {
//     upload.single("image")(req, res, function(e) {
//       console.log("check 2");

//       if(e) {
//         console.log("error " + e);
//       } else {
//         console.log("no error");
//       }

//       return res.redirect(301, '/stockpage'); //res.status(301).json(storage.filename)

//     });
//   } catch (e) {
//     console.log(e);
//    /* handle error */
//   }
// }

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export default handler