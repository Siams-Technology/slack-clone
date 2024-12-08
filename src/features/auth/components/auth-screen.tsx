'use client'

import { useState } from 'react'

import type { SignInFlow } from '../types'
import { SignInCard } from './sign-in-card'
import { SignUpCard } from './sign-up-card'

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>('signIn')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-700 via-violet-800 to-purple-900 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 shadow-2xl backdrop-blur-md">
        {state === 'signIn' ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
      </div>
    </div>
  )
}

