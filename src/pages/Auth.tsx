import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Github, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { signInWithGoogle, signInWithGithub, signInWithDiscord, user } = useAuth();

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleOAuthSignIn = async (provider: 'google' | 'github' | 'discord') => {
    setIsLoading(true);
    setError('');

    let result;
    switch (provider) {
      case 'google':
        result = await signInWithGoogle();
        break;
      case 'github':
        result = await signInWithGithub();
        break;
      case 'discord':
        result = await signInWithDiscord();
        break;
    }

    if (result.error) {
      setError(result.error.message);
      toast.error(`Failed to sign in with ${provider}`);
    }

    setIsLoading(false);
  };

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-[var(--gradient-secondary)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-10 h-10 bg-[var(--gradient-primary)] rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-foreground">CodePath</span>
          </div>
          <p className="text-muted-foreground">Your journey to coding mastery starts here</p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome to CodePath</CardTitle>
            <CardDescription className="text-center">
              Sign in with your preferred platform to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-destructive/50 bg-destructive/10">
                <AlertDescription className="text-destructive">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Button
                onClick={() => handleOAuthSignIn('google')}
                disabled={isLoading}
                variant="outline"
                className="w-full h-12 text-base"
              >
                <GoogleIcon />
                Continue with Google
              </Button>

              <Button
                onClick={() => handleOAuthSignIn('github')}
                disabled={isLoading}
                variant="outline"
                className="w-full h-12 text-base"
              >
                <Github className="w-5 h-5" />
                Continue with GitHub
              </Button>

              <Button
                onClick={() => handleOAuthSignIn('discord')}
                disabled={isLoading}
                variant="outline"
                className="w-full h-12 text-base"
              >
                <MessageSquare className="w-5 h-5" />
                Continue with Discord
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                By signing in, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;