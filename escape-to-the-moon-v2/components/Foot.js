import React from 'react';
import Link from 'next/link';

function Foot() {
    return (
        <div className="hidden xl:block mt-60 h-36 w-full relative bottom-0 bg-[#252525] text-[#ECEBE8] py-5 px-96 select-none">
            <div className='flex h-full pt-2 px-40'>
                <div className='basis-1/4 h-full py-3.5 flex flex-col justify-between px-10'>
                    <div className="whitespace-nowrap text-xs w-full mb-1">
                        คำถามที่พบบ่อย
                    </div>
                    <div className="whitespace-nowrap text-xs w-full mb-1">
                        นโยบายความเป็นส่วนตัว
                    </div>
                    <div className="whitespace-nowrap text-xs w-full mb-1">
                        ข้อตกลงและเงื่อนไข
                    </div>
                </div>
                <div className='basis-1/2 h-full border-l border-r flex justify-between px-5'>
                    <div>
                        <div className="whitespace-nowrap text-xs w-full mb-1">
                            <span>9/1 หมู่ที่ 5 ถ. พหลโยธิน<br />ตำบล คลองหนึ่ง อำเภอคลองหลวง<br />ปทุมธานี 12120</span>
                        </div>
                        <div className='flex items-center mb-1'>
                            <img src="/call.png" className='w-3 h-3'></img>
                            <span className="text-xs ml-1">0812780800</span>
                        </div>
                        <div className='flex items-center'>
                            <img src="/mail.png" className='w-3 h-3'></img>
                            <span className="text-xs ml-1">rapeepat.sant@gmail.com</span>
                        </div>
                    </div>
                    <div className='py-3.5'>
                        <div className='flex items-center mb-1'>
                            <img src="/fb.png" className='w-3 h-3'></img>
                            <span className="text-xs ml-1">Rapeepat Santiworapong</span>
                        </div>
                        <div className='flex items-center mb-1'>
                            <img src="/ig.png" className='w-3 h-3'></img>
                            <span className="text-xs ml-1">m1zterp</span>
                        </div>
                        <div className='flex items-center mb-1'>
                            <img src="/line.png" className='w-3 h-3'></img>
                            <span className="text-xs ml-1">M1zTerP</span>
                        </div>
                    </div>
                </div>
                <div className='basis-1/4 h-full px-5'>
                    <Link href="/">
                        <h1 className="text-xs hover:cursor-pointer mb-1">หน้าหลัก</h1>
                    </Link>
                    <Link href="/store">
                        <h1 className="text-xs hover:cursor-pointer mb-1">ร้านค้า</h1>
                    </Link>
                    <Link href="/">
                        <h1 className="text-xs hover:cursor-pointer mb-1">เกี่ยวกับเรา</h1>
                    </Link>
                    <Link href="/">
                        <h1 className="text-xs hover:cursor-pointer mb-1">ติดต่อเรา</h1>
                    </Link>
                    <Link href="/">
                        <h1 className="text-xs hover:cursor-pointer mb-1">วิธีการชำระเงิน</h1>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Foot;
