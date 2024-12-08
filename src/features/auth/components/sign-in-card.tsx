'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { TriangleAlert, AtSign, KeyRound, LogIn } from 'lucide-react'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

interface SignInCardProps {
  setState: (state: SignInFlow) => void
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const handleOAuthSignIn = (value: 'github' | 'google') => {
    setPending(true)
    signIn(value).finally(() => setPending(false))
  }

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    setError('')

    signIn('password', { email, password, flow: 'signIn' })
      .catch(() => {
        setError('Invalid email or password!')
      })
      .finally(() => setPending(false))
  }

  return (
    <div className="grid min-h-[600px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 lg:grid-cols-2">
      {/* Left Section */}
      <div className="relative hidden flex-col items-center justify-center bg-emerald-400 p-12 text-center lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/90 to-teal-400/90 backdrop-blur-sm" />
        <div className="relative z-10 space-y-8">
          <div className="inline-block rounded-lg bg-white/10 p-2 backdrop-blur-md">
            <svg
              className="size-6 text-white"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-medium text-white">Plan your activities and control your progress online</h1>
          <div className="relative mt-8">
            <svg
              className="mx-auto size-48 text-white/90"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 15s1-1 4-1 4 1 8 1 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" x2="4" y1="22" y2="15" />
            </svg>
          </div>
        </div>
        <div className="relative z-10 mt-auto flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`size-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`}
              role="presentation"
            />
          ))}
        </div>
      </div>

      {/* Right Section */}
      <Card className="border-0 bg-transparent shadow-none">
        <CardContent className="flex h-full flex-col justify-center p-8">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white">Sign In</h2>
              <p className="text-muted-foreground">Enter your email to continue to your account</p>
            </div>

            {!!error && (
              <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive backdrop-blur-sm">
                <TriangleAlert className="size-4" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    disabled={pending}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                    className="h-12 pl-10 border-white/10 bg-white/5 backdrop-blur-sm placeholder:text-white/50 focus:border-emerald-400/50 focus:ring-emerald-400/50"
                  />
                  <AtSign className="absolute left-3 top-3 h-6 w-6 text-white/50" />
                </div>
                <div className="relative">
                  <Input
                    disabled={pending}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    required
                    className="h-12 pl-10 border-white/10 bg-white/5 backdrop-blur-sm placeholder:text-white/50 focus:border-emerald-400/50 focus:ring-emerald-400/50"
                  />
                  <KeyRound className="absolute left-3 top-3 h-6 w-6 text-white/50" />
                </div>
              </div>
              <Button
                type="submit"
                className="h-12 w-full bg-gradient-to-r from-emerald-400 to-teal-400 font-medium hover:from-emerald-500 hover:to-teal-500"
                disabled={pending}
              >
                <LogIn className="mr-2 h-5 w-5" />
                Continue
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="flex flex-col gap-y-2.5">
              <Button
                disabled={pending}
                onClick={() => handleOAuthSignIn('google')}
                variant="outline"
                className="relative h-12 w-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10"
              >
                <FcGoogle className="absolute left-4 size-5" />
                Continue with Google
              </Button>

              <Button
                disabled={pending}
                onClick={() => handleOAuthSignIn('github')}
                variant="outline"
                className="relative h-12 w-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10"
              >
                <FaGithub className="absolute left-4 size-5" />
                Continue with GitHub
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <button
                disabled={pending}
                onClick={() => setState('signUp')}
                className="font-medium text-emerald-400 hover:text-emerald-300 hover:underline disabled:pointer-events-none disabled:opacity-50"
              >
                Sign up
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

