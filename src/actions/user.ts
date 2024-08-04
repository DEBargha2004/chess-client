'use server'

import { db } from '@/lib/db'
import { users } from '@/schema/drizzle/schema'
import { ServerActionResponse } from '@/types/server-action'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

export type UserInfo = {
  id: string
  name: string | null
  email: string
}

export async function getUser (): Promise<
  ServerActionResponse<UserInfo | null>
> {
  try {
    const session = auth()
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId!))

    return {
      status: 'success',
      message: user.length ? user[0] : null
    }
  } catch (error) {
    throw new Error('Something went wrong. Please try again.')
  }
}

export async function createUser (): Promise<ServerActionResponse<UserInfo>> {
  const session = auth()

  const userInfo = await clerkClient().users.getUser(session.userId!)
  try {
    await db.insert(users).values({
      id: userInfo.id!,
      email: userInfo.emailAddresses[0].emailAddress,
      name: userInfo.fullName!
    })
    await clerkClient().users.updateUser(userInfo.id, {
      publicMetadata: {
        onboardingComplete: true
      }
    })
    return {
      status: 'success',
      message: {
        id: userInfo.id!,
        name: userInfo.fullName!,
        email: userInfo.emailAddresses[0].emailAddress
      }
    }
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong. Please try again.')
  }
}
