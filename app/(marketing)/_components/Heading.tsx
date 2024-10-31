"use client";

import { Button } from '@/components/ui/button';
import React from 'react'
import {ArrowRight} from "lucide-react"
import { useConvex, useConvexAuth } from 'convex/react';
import { Spinner } from '@/components/spinner';
import Link from 'next/link';
import { SignInButton } from '@clerk/clerk-react';
const Heading = () => {
  const {isAuthenticated,isLoading} =  useConvexAuth();
  return (
    <div className='max-w-3xl space-y-4'>
        <h1 className='text-3xl mt-20 sm:text-5xl md:text-6xl font-bold'>
            Your Ideas,Documents,Unified.
            Welcome to <span className='underline'>LitePlanner</span>
        </h1>
        <h3 className='text-base sm:text-xl m:text-2xl font-medium'>
            Liteplanner is the connected workspace where better , faster work happen.
        </h3>
        {isLoading && (
          <div className='w-full flex items-center justify-center'>
          <Spinner
          size= "lg"
          />
            </div>

        )}
        {isAuthenticated && !isLoading && (
        <Button asChild>
        <Link href="/documents">
        Enter Liteplanner
        <ArrowRight className='h-4 w-4 ml-2'></ArrowRight>
        </Link>
    </Button>
        )}
        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <Button>
              Get LitePlanner
              <ArrowRight className='h-4 w-4'></ArrowRight>
            </Button>
          </SignInButton>
        )}

    </div>
  )
}

export default Heading