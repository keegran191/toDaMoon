import { NextRequest, NextResponse } from "next/server";

export default function middleware(req:NextRequest){

    let verify = req.cookies.get("loggedin")
    let url = req.url
    
    if(!verify && url.includes('/adminpage')){
      return NextResponse.redirect("https://escapetothemoon.lol/login");
    }

    if (verify != "1"  && url.includes('/adminpage')){
        return NextResponse.redirect("https://escapetothemoon.lol/");
    }

    if (verify != "0"  && url.includes('/home')){
      return NextResponse.redirect("https://escapetothemoon.lol/");
    }

    if (verify && url.includes("/login")) {
      return NextResponse.redirect("https://escapetothemoon.lol/");
    }

}
