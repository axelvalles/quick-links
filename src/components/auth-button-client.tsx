'use client'

import {
  type Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import { type FC } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react'

const AuthButtonClient: FC<{ session: Session | null }> = ({ session }) => {
  // vars
  const supabase = createClientComponentClient()
  const router = useRouter()

  // methods
  const handleSignInGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/api/auth/callback'
      }
    })
  }
  const handleSignInGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/api/auth/callback'
      }
    })
  }
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div>
      {session === null
        ? (
        <div className="min-h-screen h-full flex flex-col items-center justify-center">
          <button
            onClick={handleSignInGitHub}
            type="button"
            className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2 space-x-1"
          >
            <IconBrandGithub />
            <span>Sign in with Github</span>
          </button>

          <button
            onClick={handleSignInGoogle}
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 space-x-1"
          >
            <IconBrandGoogle />
            <span>Sign in with Google</span>
          </button>
        </div>
          )
        : (
        <div className="flex flex-col items-center justify-center">
          <Button onClick={handleSignOut} type="button" color="default">
            Sign out
          </Button>
        </div>
          )}
    </div>
  )
}

export default AuthButtonClient
