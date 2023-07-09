import { NextRequest, NextResponse } from "next/server";

export default function middleware(req:NextRequest){

    let verify = req.cookies.get("loggedin")
    let url = req.url
    
    if(!verify && url.includes('/adminpage')){
      return NextResponse.redirect("http://localhost:3000/login");
    }

    if(!verify && url.includes('/home')){
      return NextResponse.redirect("http://localhost:3000/login");
    }

    if (verify != "1"  && url.includes('/adminpage')){
        return NextResponse.redirect("http://localhost:3000/");
    }

    if (verify != "0"  && url.includes('/home')){
      return NextResponse.redirect("http://localhost:3000/");
    }

    if (verify && url === "http://localhost:3000/login") {
      return NextResponse.redirect("http://localhost:3000/");
    }

}
