import { NavLink, Link } from "react-router-dom";
import type { AuthUser } from "../lib/api";

type HeaderProps = {
  currentUser: AuthUser | null;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onProfileClick: () => void;
  onLogoutClick: () => void;
};

function BookLogo() {
  return (
    <svg
      className="logo-book-svg"
      viewBox="0 0 56 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M28 12C21 6 12 6 4 9V37C13 34 21 35 28 41V12Z"
        fill="#DCE4D6"
        stroke="#457B90"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M28 12C35 6 44 6 52 9V37C43 34 35 35 28 41V12Z"
        fill="#FAF9F4"
        stroke="#457B90"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M28 12V41"
        stroke="#457B90"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 15C14 14 19 15 23 18"
        stroke="#A8BDA4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M33 18C37 15 42 14 47 15"
        stroke="#A8BDA4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5 41C14 38 22 39 28 45C34 39 42 38 51 41"
        stroke="#35432F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header({
  currentUser,
  onLoginClick,
  onSignUpClick,
  onProfileClick,
  onLogoutClick,
}: HeaderProps) {
  return (
    <header className="header">
      <Link to="/" className="logo" aria-label="NSeeRead Home">
        <BookLogo />

        <div className="logo-text">
          <span className="brand-name">NSeeRead</span>
          <span className="tagline">Learn More. Read Less.</span>
        </div>
      </Link>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/explore">
          Explore
        </NavLink>
        <NavLink to="/resources">
          Resources
        </NavLink>
        <NavLink to="/about">
          About
        </NavLink>
        <NavLink to="/contact">
          Contact
        </NavLink>
      </nav>

      <div className="header-actions">
        <button
          type="button"
          className="btn btn-outline"
          onClick={onProfileClick}
          aria-label="Open your profile"
        >
          <span aria-hidden="true" style={{ marginRight: 6 }}>
            👤
          </span>
          Profile
        </button>

        {currentUser ? (
          <button
            type="button"
            className="btn btn-light"
            onClick={onLogoutClick}
          >
            Log Out
          </button>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-outline"
              onClick={onLoginClick}
            >
              Log In
            </button>

            <button
              type="button"
              className="btn btn-light"
              onClick={onSignUpClick}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}