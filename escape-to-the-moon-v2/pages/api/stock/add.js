import multer  from 'multer';
const upload = multer({ dest: 'uploads/', limits: { fileSize: 2000000 } });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  try {
    upload.single("image")(req, res, function(e) {
      console.log("check 2");

      if(e) {
        console.log("error " + e);
      } else {
        console.log("no error");
      }

      return res.json({ message: 'Hello Everyone!' })
    });
  } catch (e) {
    console.log(e);
   /* handle error */
  }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler