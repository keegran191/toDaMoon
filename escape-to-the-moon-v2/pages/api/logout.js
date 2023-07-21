
export default function handler(req, res) {

    res.setHeader('Set-Cookie', [
      'loggedin=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/',
      'fname=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/',
      'userId=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    ]);

    console.log("Logout successful")
    res.redirect(307, "/")
  }
  