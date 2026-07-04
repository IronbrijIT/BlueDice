import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { auth, googleProvider } from "../services/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Dice3D } from "../components/Dice3D";
import { PageShell } from "../components/PageShell";
import { Chrome, Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Blue Dice" },
      { name: "description", content: "Sign in to sync your reflections and stats." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only used in signup
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      if (profile && profile.name) {
        navigate({ to: "/" });
      } else {
        navigate({ to: "/onboarding" });
      }
    }
  }, [user, profile, loading, navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (isSignUp && !name) {
      toast.error("Please tell us your name");
      return;
    }

    setAuthLoading(true);
    try {
      if (isSignUp) {
        // Create user
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        // After signup, we'll save name & email in the database via the saveProfile call
        // We'll call saveProfile manually here to populate the name immediately
        const { doc, setDoc } = await import("firebase/firestore");
        const { db } = await import("../services/firebase");
        const userDocRef = doc(db, "users", credential.user.uid);
        await setDoc(userDocRef, {
          uid: credential.user.uid,
          name,
          email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        toast.success(`Welcome, ${name}!`);
      } else {
        // Login user
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back!");
      }
    } catch (err: any) {
      console.error(err);
      let msg = "Authentication failed.";
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        msg = "Invalid email or password.";
      } else if (err.code === "auth/email-already-in-use") {
        msg = "This email is already registered.";
      } else if (err.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters.";
      } else if (err.message) {
        msg = err.message;
      }
      toast.error(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setAuthLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { doc, getDoc, setDoc } = await import("firebase/firestore");
      const { db } = await import("../services/firebase");
      
      // Check if user exists in firestore
      const docRef = doc(db, "users", result.user.uid);
      const snap = await getDoc(docRef);
      
      if (!snap.exists()) {
        // If not, prefill with Google displayName and email
        await setDoc(docRef, {
          uid: result.user.uid,
          name: result.user.displayName || "",
          email: result.user.email || "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      toast.success("Signed in with Google!");
    } catch (err: any) {
      console.error(err);
      toast.error("Google sign-in failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-2">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block relative mb-4"
            >
              <div className="absolute inset-0 bg-primary/25 rounded-full blur-2xl" />
              <div className="relative bg-card border border-border p-5 rounded-[2rem] shadow-xl flex items-center justify-center">
                <svg className="h-14 w-14 text-primary filter drop-shadow-[0_0_12px_rgba(59,130,246,0.35)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Isometric Cube */}
                  {/* Top Face */}
                  <path d="M50 15L85 32.5L50 50L15 32.5L50 15Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  {/* Left Face */}
                  <path d="M15 32.5L50 50V85L15 67.5V32.5Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  {/* Right Face */}
                  <path d="M50 50L85 32.5V67.5L50 85V50Z" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  
                  {/* Pip - Top face (Center) */}
                  <circle cx="50" cy="32.5" r="3.5" fill="currentColor" />
                  
                  {/* Left face pips */}
                  <circle cx="32.5" cy="50" r="3.2" fill="currentColor" />
                  <circle cx="32.5" cy="67.5" r="3.2" fill="currentColor" />
                  
                  {/* Right face pips */}
                  <circle cx="67.5" cy="50" r="3.2" fill="currentColor" />
                  <circle cx="67.5" cy="67.5" r="3.2" fill="currentColor" />
                </svg>
              </div>
            </motion.div>
            
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isSignUp
                ? "Start syncing your dice rolls and daily history."
                : "Sign in to access your reflections, stats, and settings."}
            </p>
          </div>

          {/* Form */}
          <motion.div
            layout
            className="rounded-3xl border border-border bg-card p-6 shadow-xl backdrop-blur-md relative overflow-hidden"
          >
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <AnimatePresence mode="popLayout">
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1.5"
                  >
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl bg-secondary px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-transparent focus:ring-primary focus:bg-background transition"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-secondary px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-transparent focus:ring-primary focus:bg-background transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl bg-secondary px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-transparent focus:ring-primary focus:bg-background transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 active:scale-[0.98] transition disabled:opacity-50 cursor-pointer"
              >
                {authLoading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <>
                    {isSignUp ? "Sign Up" : "Sign In"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-x-0 h-px bg-border" />
              <span className="relative bg-card px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Or continue with
              </span>
            </div>

            <button
              onClick={handleGoogleAuth}
              disabled={authLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background py-3 text-sm font-semibold text-foreground hover:bg-secondary active:scale-[0.98] transition disabled:opacity-50 cursor-pointer"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google Account
            </button>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              {isSignUp ? "Already have an account? " : "New to Blue Dice? "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-semibold text-primary hover:underline outline-none"
              >
                {isSignUp ? "Sign In" : "Create one now"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
