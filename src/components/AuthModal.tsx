import { useEffect, useState, type FormEvent } from "react";
import {
  logInAccount,
  signUpAccount,
  type AuthUser,
} from "../lib/api";
import "./AuthModal.css";

type AuthModalMode = "login" | "signup";

interface AuthModalProps {
  isOpen: boolean;
  mode: AuthModalMode;
  onClose: () => void;
  onSwitchMode: (mode: AuthModalMode) => void;
  onAuthenticated: (user: AuthUser) => void;
}

export default function AuthModal({
  isOpen,
  mode,
  onClose,
  onSwitchMode,
  onAuthenticated,
}: AuthModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignup = mode === "signup";

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, isSubmitting, onClose]);

  useEffect(() => {
    setMessage("");
    setMessageType("error");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsSubmitting(false);
  }, [mode, isOpen]);

  const changeMode = (nextMode: AuthModalMode) => {
    if (isSubmitting) return;
    setMessage("");
    onSwitchMode(nextMode);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setMessage("");

    if (isSignup) {
      if (name.trim().length < 2) {
        setMessage("Please enter your full name.");
        return;
      }

      if (password.length < 8) {
        setMessage("Password must contain at least 8 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setMessage("The passwords do not match.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const user = isSignup
        ? await signUpAccount({
            name: name.trim(),
            email: email.trim(),
            password,
          })
        : await logInAccount({
            email: email.trim(),
            password,
            rememberMe,
          });

      setMessage(
        isSignup
          ? "Your account is ready. Opening your profile..."
          : "Login successful. Opening your profile..."
      );
      setMessageType("success");

      window.setTimeout(() => onAuthenticated(user), 650);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Authentication failed. Please try again."
      );
      setMessageType("error");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="auth-modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <section
        className={`auth-modal-card ${isSignup ? "auth-modal-signup" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button
          type="button"
          className="auth-modal-close"
          onClick={onClose}
          aria-label="Close popup"
          disabled={isSubmitting}
        >
          &times;
        </button>

        <div className="auth-modal-brand">
          <span className="auth-modal-brand-mark" aria-hidden="true">N</span>
          <span>NSeeRead</span>
        </div>

        <p className="auth-modal-eyebrow">SEARCH. DISCOVER. UNDERSTAND.</p>

        <h2 id="auth-modal-title">
          {isSignup ? (
            <>Begin your <span>learning journey.</span></>
          ) : (
            <>Welcome <span>back.</span></>
          )}
        </h2>

        <p className="auth-modal-subtitle">
          {isSignup
            ? "Create an account to save topics and continue learning."
            : "Sign in to continue exploring knowledge that matters."}
        </p>

        <div className="auth-modal-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={!isSignup}
            className={!isSignup ? "active" : ""}
            onClick={() => changeMode("login")}
            disabled={isSubmitting}
          >
            Login
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={isSignup}
            className={isSignup ? "active" : ""}
            onClick={() => changeMode("signup")}
            disabled={isSubmitting}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-modal-form" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="auth-modal-field">
              <label htmlFor="auth-full-name">Full name</label>
              <input
                id="auth-full-name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                minLength={2}
                maxLength={80}
                required
              />
            </div>
          )}

          <div className="auth-modal-field">
            <label htmlFor="auth-email">Email address</label>
            <input
              id="auth-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={254}
              required
            />
          </div>

          <div className="auth-modal-field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              placeholder={isSignup ? "Create a password" : "Enter your password"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={isSignup ? 8 : undefined}
              maxLength={128}
              required
            />
          </div>

          {isSignup ? (
            <>
              <div className="auth-modal-field">
                <label htmlFor="auth-confirm-password">Confirm password</label>
                <input
                  id="auth-confirm-password"
                  type="password"
                  placeholder="Enter your password again"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  minLength={8}
                  maxLength={128}
                  required
                />
              </div>

              <label className="auth-modal-terms">
                <input type="checkbox" required />
                <span>I agree to use NSeeRead responsibly.</span>
              </label>
            </>
          ) : (
            <div className="auth-modal-options">
              <label className="auth-modal-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="auth-modal-text-button"
                onClick={() => {
                  setMessage("Password recovery has not been configured yet.");
                  setMessageType("error");
                }}
              >
                Forgot password?
              </button>
            </div>
          )}

          {message && (
            <div
              className={`auth-modal-message ${
                messageType === "success" ? "is-success" : "is-error"
              }`}
              role="status"
              aria-live="polite"
              style={
                messageType === "success"
                  ? {
                      border: "1px solid #c8ddc8",
                      background: "#edf6eb",
                      color: "#365e3b",
                    }
                  : undefined
              }
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="auth-modal-submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Please wait..."
              : isSignup
                ? "Create Account"
                : "Login"}
            {!isSubmitting && <span aria-hidden="true">→</span>}
          </button>
        </form>
      </section>
    </div>
  );
}
