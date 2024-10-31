import React from 'react'
import Image from "next/image"
import {Poppins} from "next/font/google"
import {cn} from "@/lib/utils"

const fonts = Poppins({
    subsets:["latin"],
    weight:["400","600"]
})

const  Logo = () =>  {
  return (
    <div className=' hidden md:flex items-center gap-x-2'>
        <Image
        src="/only-logo.svg"
        height="80"
        width="80"
        alt="Logo"
        className='dark:hidden'
        />
                <Image
        src="/only-logo-dark.svg"
        height="80"
        width="80"
        alt="Logo"
        className='hidden dark:block'
        />
        <p className={cn("font-semibold",fonts.className)}>
            Liteplanner
        </p>
    </div>
  )
}

export default Logo