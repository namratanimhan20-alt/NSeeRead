import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { changePassword, getCurrentUser, saveProfile } from "../lib/api";
import "./Profile.css";

type ProfileData = {
  name: string;
  email: string;
  learningGoal: string;
  about: string;
  interests: string[];
};

const defaultProfile: ProfileData = {
  name: "",
  email: "",
  learningGoal: "",
  about: "",
  interests: [],
};

const interestOptions = [
  "Technology",
  "Artificial Intelligence",
  "Science",
  "Digital Marketing",
  "Business",
  "Personal Development",
];

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [formData, setFormData] = useState<ProfileData>(defaultProfile);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordMessageType, setPasswordMessageType] =
    useState<"success" | "error">("success");
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((user) => {
        if (!active) return;

        const saved: ProfileData = {
          name: user.name || "",
          email: user.email || "",
          learningGoal: user.learningGoal || "",
          about: user.about || "",
          interests: Array.isArray(user.interests) ? user.interests : [],
        };

        setProfile(saved);
        setFormData(saved);
      })
      .catch((error: unknown) => {
        if (!active) return;

        setMessage(
          error instanceof Error
            ? error.message
            : "Could not load your profile."
        );
        setMessageType("error");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const completedFields = [
    profile.name.trim(),
    profile.email.trim(),
  ].filter(Boolean).length;

  const completionPercent = (completedFields / 2) * 100;

  const updateField = (
    field: keyof Omit<ProfileData, "interests">,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
    setMessage("");
  };

  const toggleInterest = (interest: string) => {
    setFormData((current) => {
      const selected = current.interests.includes(interest);

      return {
        ...current,
        interests: selected
          ? current.interests.filter((item) => item !== interest)
          : [...current.interests, interest],
      };
    });

    setMessage("");
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving || isLoading) return;

    const cleanedProfile: ProfileData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      about: formData.about.trim(),
    };

    setIsSaving(true);
    setMessage("");

    try {
      const saved = await saveProfile(cleanedProfile);

      const updatedProfile: ProfileData = {
        name: saved.name,
        email: saved.email,
        learningGoal: saved.learningGoal || "",
        about: saved.about || "",
        interests: saved.interests || [],
      };

      setProfile(updatedProfile);
      setFormData(updatedProfile);
      setMessage("Your profile has been saved to your NSeeRead account.");
      setMessageType("success");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not save your profile. Please try again."
      );
      setMessageType("error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(profile);
    setMessage("");
  };

  const handleChangePassword = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isPasswordSaving) return;

    if (newPassword.length < 8 || newPassword.length > 128) {
      setPasswordMessage(
        "Your new password must contain 8 to 128 characters."
      );
      setPasswordMessageType("error");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordMessage("The new passwords do not match.");
      setPasswordMessageType("error");
      return;
    }

    if (newPassword === currentPassword) {
      setPasswordMessage(
        "Choose a new password different from your current password."
      );
      setPasswordMessageType("error");
      return;
    }

    setIsPasswordSaving(true);
    setPasswordMessage("");

    try {
      const result = await changePassword({
        currentPassword,
        newPassword,
      });

      setPasswordMessage(result.message);
      setPasswordMessageType("success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      setPasswordMessage(
        error instanceof Error
          ? error.message
          : "Could not change your password. Please try again."
      );
      setPasswordMessageType("error");
    } finally {
      setIsPasswordSaving(false);
    }
  };
  if (isLoading) {
    return (
      <div className="profile-page">
        <main className="profile-content" role="status">
          Loading your saved profile...
        </main>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <div className="profile-hero-content">
          <span className="profile-eyebrow">YOUR NSEEREAD SPACE</span>

          <h1>
            Your learning space.
            <br />
            <span>Your way.</span>
          </h1>

          <p>
            Make NSeeRead your own. Add your details, choose the subjects
            you're curious about, and keep your learning interests together
            in one place.
          </p>
        </div>

        <div className="profile-overview">
          <span className="profile-overview-label">PROFILE OVERVIEW</span>

          <div className="profile-avatar-placeholder" aria-hidden="true">
            {profile.name.trim()
              ? profile.name.trim().charAt(0).toUpperCase()
              : "N"}
          </div>

          <h2>{profile.name.trim() || "Reader"}</h2>

          <p className="profile-overview-email">
            {profile.email.trim() || "Add your email address"}
          </p>

          <div className="profile-completion">
            <div className="profile-completion-heading">
              <span>Basic information</span>
              <strong>{completionPercent}%</strong>
            </div>

            <div
              className="profile-progress-track"
              role="progressbar"
              aria-label="Basic profile completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={completionPercent}
            >
              <span
                className="profile-progress-fill"
                style={{ width: `${completionPercent}%` }}
              />
            </div>

            <p>
              {completedFields === 2
                ? "Your basic details are complete."
                : "Add your name and email to complete your basic details."}
            </p>
          </div>
        </div>
      </section>

      <main className="profile-content">
        <div className="profile-heading">
          <div>
            <span className="profile-eyebrow">ACCOUNT DETAILS</span>
            <h2>
              Get to know <span>you.</span>
            </h2>
            <p>
              Update the information and interests saved to your NSeeRead account.
            </p>
          </div>
        </div>

        <div className="profile-layout">
          <section className="profile-form-card">
            <div className="profile-card-heading">
              <div>
                <span className="profile-card-kicker">YOUR INFORMATION</span>
                <h3>Personal details</h3>
                <p>Keep your information up to date.</p>
              </div>

              <span className="profile-heading-symbol" aria-hidden="true">
                ✳
              </span>
            </div>

            <form className="profile-form" onSubmit={handleSave}>
              <div className="profile-field-row">
                <div className="profile-field">
                  <label htmlFor="profile-name">Full name</label>
                  <input
                    id="profile-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    minLength={2}
                    maxLength={80}
                    required
                  />
                </div>

                <div className="profile-field">
                  <label htmlFor="profile-email">Email address</label>
                  <input
                    id="profile-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    maxLength={254}
                    required
                  />
                </div>
              </div>

              <div className="profile-field">
                <label htmlFor="profile-goal">
                  What would you like to learn?
                </label>

                <select
                  id="profile-goal"
                  name="learningGoal"
                  value={formData.learningGoal}
                  onChange={(event) =>
                    updateField("learningGoal", event.target.value)
                  }
                >
                  <option value="">Choose your learning goal</option>
                  <option value="academic">Understand academic subjects</option>
                  <option value="career">Develop career skills</option>
                  <option value="research">Explore research and ideas</option>
                  <option value="technology">Learn about technology</option>
                  <option value="personal">Learn for personal growth</option>
                  <option value="general">Explore a variety of subjects</option>
                </select>
              </div>

              <div className="profile-field">
                <label htmlFor="profile-about">About you</label>
                <textarea
                  id="profile-about"
                  name="about"
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us what you enjoy learning about..."
                  value={formData.about}
                  onChange={(event) =>
                    updateField("about", event.target.value)
                  }
                />
                <span className="profile-field-hint">
                  {formData.about.length}/500 characters
                </span>
              </div>

              <fieldset className="profile-interests">
                <legend>Choose your interests</legend>
                <p>Select the subjects you'd like to explore on NSeeRead.</p>

                <div className="profile-interest-options">
                  {interestOptions.map((interest) => {
                    const selected = formData.interests.includes(interest);

                    return (
                      <label
                        key={interest}
                        className={
                          selected
                            ? "profile-interest selected"
                            : "profile-interest"
                        }
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleInterest(interest)}
                        />
                        <span aria-hidden="true">{selected ? "✓" : "+"}</span>
                        {interest}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="profile-form-actions">
                <button
                  type="button"
                  className="profile-reset-button"
                  onClick={handleReset}
                  disabled={isSaving}
                >
                  Discard changes
                </button>

                <button
                  type="submit"
                  className="profile-save-button"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save profile"}
                  {!isSaving && <span aria-hidden="true">↗</span>}
                </button>
              </div>

              {message && (
                <p
                  className={
                    messageType === "success"
                      ? "profile-message profile-message-success"
                      : "profile-message profile-message-error"
                  }
                  role="status"
                  aria-live="polite"
                >
                  {message}
                </p>
              )}
            </form>
          </section>

          <aside className="profile-sidebar">
            <section className="profile-sidebar-card profile-learning-card">
              <span className="profile-card-kicker">KEEP EXPLORING</span>

              <h3>
                Curiosity looks
                <br />
                good on you.
              </h3>

              <p>
                Your next discovery might be a subject you've never explored
                before. Start with a question and follow where it leads.
              </p>

              <Link to="/explore" className="profile-sidebar-link">
                Explore topics <span aria-hidden="true">↗</span>
              </Link>
            </section>

            <section className="profile-sidebar-card">
              <div className="profile-sidebar-title">
                <span className="profile-sidebar-icon" aria-hidden="true">⌕</span>
                <h3>Useful resources</h3>
              </div>

              <p>
                Find research databases, educational platforms, and tools to
                support your learning.
              </p>

              <Link to="/resources" className="profile-text-link">
                Browse resources <span aria-hidden="true">→</span>
              </Link>
            </section>

            <section className="profile-privacy-note">
              <span aria-hidden="true">✳</span>

              <div>
                <h3>A note about your data</h3>
                <p>
                  Your name, email, learning goal, About information, and
                  selected interests are saved to your NSeeRead account.
                </p>
              </div>
            </section>
          </aside>
        </div>

        <section className="profile-form-card profile-password-card">
          <div className="profile-card-heading">
            <div>
              <span className="profile-card-kicker">ACCOUNT SECURITY</span>
              <h3>Change password</h3>
              <p>Update your password to keep your account secure.</p>
            </div>

            <span className="profile-heading-symbol" aria-hidden="true">
              ✳
            </span>
          </div>

          <form className="profile-form" onSubmit={handleChangePassword}>
            <div className="profile-field">
              <label htmlFor="profile-current-password">
                Current password
              </label>
              <input
                id="profile-current-password"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(event) => {
                  setCurrentPassword(event.target.value);
                  setPasswordMessage("");
                }}
                maxLength={128}
                required
              />
            </div>

            <div className="profile-field-row">
              <div className="profile-field">
                <label htmlFor="profile-new-password">
                  New password
                </label>
                <input
                  id="profile-new-password"
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                    setPasswordMessage("");
                  }}
                  minLength={8}
                  maxLength={128}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-confirm-new-password">
                  Confirm new password
                </label>
                <input
                  id="profile-confirm-new-password"
                  type="password"
                  autoComplete="new-password"
                  value={confirmNewPassword}
                  onChange={(event) => {
                    setConfirmNewPassword(event.target.value);
                    setPasswordMessage("");
                  }}
                  minLength={8}
                  maxLength={128}
                  required
                />
              </div>
            </div>

            {passwordMessage && (
              <p
                className={
                  passwordMessageType === "success"
                    ? "profile-message profile-message-success"
                    : "profile-message profile-message-error"
                }
                role="status"
                aria-live="polite"
              >
                {passwordMessage}
              </p>
            )}

            <div className="profile-form-actions">
              <button
                type="submit"
                className="profile-save-button"
                disabled={isPasswordSaving}
              >
                {isPasswordSaving ? "Updating..." : "Update password"}
                {!isPasswordSaving && (
                  <span aria-hidden="true">↗</span>
                )}
              </button>
            </div>
          </form>
        </section>
        <div className="profile-bottom-note">
          <span aria-hidden="true">✳</span>
          <p>
            Learn at your pace. Explore what interests you.
            <strong> Keep growing.</strong>
          </p>
        </div>
      </main>
    </div>
  );
}

