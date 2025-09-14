'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Zap } from 'lucide-react';

const demoAccounts = [
  {
    email: 'landlord@solarflow.demo',
    name: 'Landlord',
    role: 'LANDLORD',
    description: 'Manage buildings and tenant energy billing'
  },
  {
    email: 'tenant1@solarflow.demo',
    name: 'Tenant 1',
    role: 'TENANT',
    description: 'View personal energy consumption and bills'
  },
  {
    email: 'tenant2@solarflow.demo',
    name: 'Tenant 2',
    role: 'TENANT',
    description: 'View personal energy consumption and bills'
  }
];

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegularSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    if (!selectedAccount) return;

    setIsLoading(true);

    try {
      const result = await signIn('demo', {
        email: selectedAccount,
        redirect: false,
      });

      if (result?.ok) {
        const session = await getSession();
        const userRole = session?.user?.role;

        if (userRole === 'LANDLORD') {
          router.push('/dashboard');
        } else {
          router.push('/tenant/portal');
        }
      } else {
        console.error('Sign in failed:', result?.error);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6">
        <Button variant="ghost" size="sm" asChild className="flex items-center gap-2 hover:bg-white/10">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-8">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 via-sky-500 to-cyan-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              SolarFlow
            </span>
          </Link>

          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
            Sign in to your account
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Enter your email and password to access your dashboard
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Regular Login Form */}
          <form onSubmit={handleRegularSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <Button
            variant="outline"
            onClick={() => signIn('google')}
            className="w-full py-3 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Demo Login Section */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Continue with Demo
                </Label>
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger id="demo-select">
                    <SelectValue placeholder="Choose a demo account..." />
                  </SelectTrigger>
                  <SelectContent>
                    {demoAccounts.map((account) => (
                      <SelectItem key={account.email} value={account.email}>
                        <div className="flex flex-col text-left">
                          <span className="font-medium">{account.name}</span>
                          <span className="text-xs text-gray-500">{account.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleDemoSignIn}
                disabled={!selectedAccount || isLoading}
                variant="outline"
                className="w-full py-3 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                {isLoading ? 'Signing in...' : 'Continue with Demo'}
              </Button>
            </div>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
              Demo environment for Solar4All Hackathon
            </p>
          </div>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}