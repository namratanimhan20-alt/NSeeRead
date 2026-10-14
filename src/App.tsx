import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Article from "./pages/Article";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import {
  getCurrentUser,
  logOutAccount,
  type AuthUser,
} from "./lib/api";

import "./App.css";

export type AuthMode = "login" | "signup";

type ProfilePromptProps = {
  onLoginClick: () => void;
  onSignUpClick: () => void;
};

function ProfilePrompt({ onLoginClick, onSignUpClick }: ProfilePromptProps) {
  return (
    <div className="profile-page">
      <section
        className="profile-hero"
        style={{
          gridTemplateColumns: "minmax(0, 1fr)",
          minHeight: 360,
        }}
      >
        <div className="profile-hero-content" style={{ maxWidth: 720 }}>
          <span className="profile-eyebrow">YOUR NSEEREAD SPACE</span>
          <h1>
            Your learning space.
            <br />
            <span>Starts here.</span>
          </h1>
          <p>
            Sign in or create your free NSeeRead account to open your profile
            and keep your learning details together.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
            <button type="button" className="btn btn-light" onClick={onLoginClick}>
              Log In
            </button>
            <button type="button" className="btn btn-outline" onClick={onSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((user) => {
        if (active) setCurrentUser(user);
      })
      .catch(() => {
        if (active) setCurrentUser(null);
      })
      .finally(() => {
        if (active) setAuthLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const openLogin = () => setAuthMode("login");
  const openSignup = () => setAuthMode("signup");
  const closeAuth = () => setAuthMode(null);

  const openProfile = () => {
    if (currentUser) {
      navigate("/profile");
    } else {
      openLogin();
    }
  };

  const handleAuthenticated = (user: AuthUser) => {
    // Keep the existing profile page prefilled while its API integration is added.
    try {
      const stored = localStorage.getItem("nseeread-profile");
      let previous: Record<string, unknown> = {};

      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
          previous = parsed as Record<string, unknown>;
        }
      }

      localStorage.setItem(
        "nseeread-profile",
        JSON.stringify({ ...previous, name: user.name, email: user.email })
      );
    } catch {
      // Authentication still succeeds if browser storage is unavailable.
    }

    setCurrentUser(user);
    closeAuth();
    navigate("/profile");
  };

  const handleLogout = async () => {
    try {
      await logOutAccount();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setCurrentUser(null);
      closeAuth();
      navigate("/");
    }
  };

  return (
    <div className="app">
      <Header
        currentUser={currentUser}
        onLoginClick={openLogin}
        onSignUpClick={openSignup}
        onProfileClick={openProfile}
        onLogoutClick={handleLogout}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/profile"
            element={
              authLoading ? (
                <div style={{
                  minHeight: "45vh",
                  display: "grid",
                  placeItems: "center",
                  padding: 40,
                  color: "#47553e",
                  background: "#f7f4ef",
                }}>
                  Loading your profile...
                </div>
              ) : currentUser ? (
                <Profile />
              ) : (
                <ProfilePrompt
                  onLoginClick={openLogin}
                  onSignUpClick={openSignup}
                />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <AuthModal
        isOpen={authMode !== null}
        mode={authMode ?? "login"}
        onClose={closeAuth}
        onSwitchMode={setAuthMode}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
}

export default App;
