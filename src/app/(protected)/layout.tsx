import { createUser, type UserInfo } from '@/actions/user'
import { Navbar } from '@/components/custom'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ServerActionResponse } from '@/types/server-action'
import { auth } from '@clerk/nextjs/server'
import { AlertCircle } from 'lucide-react'
import React from 'react'

export default async function ProtectedLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const session = auth()
  let responseMessage: ServerActionResponse<UserInfo | null> | null = null
  let showContent = false

  if (!session.sessionClaims?.metadata?.onboardingComplete) {
    try {
      const res = await createUser()
      responseMessage = res
    } catch (error) {
      responseMessage = {
        status: 'error',
        message: 'Something went wrong. Please try again.1'
      }
    }
  } else {
    showContent = true
  }

  return (
    <div className='h-full w-full flex flex-col justify-start items-stretch'>
      {/* <Navbar /> */}
      <div className='h-full w-full'>
        {responseMessage?.status === 'success' || showContent ? (
          children
        ) : (
          <div className='w-full h-full grid place-content-center'>
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{responseMessage?.message}</AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  )
}
