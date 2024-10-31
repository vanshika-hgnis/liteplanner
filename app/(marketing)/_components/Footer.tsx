import React from 'react'
import Logo from "./logo";
import { Button } from '@/components/ui/button';

const Footer = () =>  {
  return (
    <div className='flex items-center p-6 w-full bg-background z-50 dark:bg-[#1F1F1F]'>
        <Logo/>
        <div className='md:ml-auto w-full justify-center
        md:justify-end flex items-center gap-x-2 text-muted-foreground'>
            <Button variant={"ghost"} size="sm">
                Privacy Policy
            </Button>
            <Button variant={"ghost"} size="sm">
                Terms & Conditions
            </Button>
        </div>
    </div>
  )
}

export default Footer