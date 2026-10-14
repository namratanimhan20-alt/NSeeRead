
import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  const handleQuestionSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    event.currentTarget.reset();
    setQuestionSubmitted(true);
  };

  const handleSuggestionSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSuggestionSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-eyebrow">WE'RE HERE TO LISTEN</span>

          <h1>
            Your thoughts
            <br />
            <span>make us better.</span>
          </h1>

          <p>
            Have a question about NSeeRead? Found something we could improve?
            Send your query or share an idea. Every useful suggestion starts
            with a conversation.
          </p>

          <a href="#contact-forms" className="contact-hero-link">
            Get in touch <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="contact-hero-visual" aria-hidden="true">
          <span className="contact-hero-orbit contact-hero-orbit-one" />
          <span className="contact-hero-orbit contact-hero-orbit-two" />

          <div className="contact-note">
            <span className="contact-note-top">A NOTE TO NSeeRead</span>
            <div className="contact-note-rule" />
            <p>
              Every question
              <br />
              opens a door.
            </p>
            <span className="contact-note-star">✳</span>
            <span className="contact-note-bottom">ASK · SHARE · DISCOVER</span>
          </div>

          <span className="contact-floating contact-floating-one">
            Ask away.
          </span>
          <span className="contact-floating contact-floating-two">
            Ideas welcome.
          </span>
        </div>
      </section>

      {/* Contact form introduction */}
      <section className="contact-intro" id="contact-forms">
        <span className="contact-eyebrow">LET'S CONNECT</span>

        <h2>
          What would you like to <span>share?</span>
        </h2>

        <p>
          Choose the form that suits you. Provide the details below so your
          message is clear.
        </p>
      </section>

      {/* Forms */}
      <section className="contact-forms">
        {/* Questions form */}
        <article className="contact-form-card">
          <div className="contact-form-heading">
            <div className="contact-form-icon contact-icon-blue" aria-hidden="true">
              ?
            </div>

            <div>
              <span className="contact-card-eyebrow">NEED SOME HELP?</span>
              <h3>Ask a question</h3>
              <p>For queries, concerns, or help using NSeeRead.</p>
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={handleQuestionSubmit}
          >
            <div className="contact-field-row">
              <div className="contact-field">
                <label htmlFor="question-name">Your name</label>
                <input
                  id="question-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  minLength={2}
                  maxLength={80}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="question-email">Email address</label>
                <input
                  id="question-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="question-topic">What is your question about?</label>
              <select id="question-topic" name="topic" defaultValue="" required>
                <option value="" disabled>
                  Select a topic
                </option>
                <option value="using-nseeread">Using NSeeRead</option>
                <option value="articles">Articles and topics</option>
                <option value="resources">Learning resources</option>
                <option value="account">Account or profile</option>
                <option value="technical">Technical issue</option>
                <option value="other">Something else</option>
              </select>
            </div>

            <div className="contact-field">
              <label htmlFor="question-message">Your message</label>
              <textarea
                id="question-message"
                name="message"
                rows={5}
                placeholder="Tell us how we can help..."
                minLength={10}
                maxLength={2000}
                required
              />
              <span className="contact-field-hint">
                Please include enough detail to explain your question.
              </span>
            </div>

            <button type="submit" className="contact-submit-button">
              Submit question <span aria-hidden="true">↗</span>
            </button>

            {questionSubmitted && (
              <div className="contact-status" role="status" aria-live="polite">
                <strong>Form completed.</strong>
                <p>
                  Your entries passed browser validation, but this demo is not
                  connected to a server. Your message has not been sent or saved.
                </p>
                <button
                  type="button"
                  className="contact-status-dismiss"
                  onClick={() => setQuestionSubmitted(false)}
                >
                  Dismiss
                </button>
              </div>
            )}
          </form>
        </article>

        {/* Suggestions form */}
        <article className="contact-form-card contact-suggestion-card">
          <div className="contact-form-heading">
            <div
              className="contact-form-icon contact-icon-sage"
              aria-hidden="true"
            >
              ✳
            </div>

            <div>
              <span className="contact-card-eyebrow">HELP US IMPROVE</span>
              <h3>Share a suggestion</h3>
              <p>Tell us about a feature or improvement you'd like to see.</p>
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSuggestionSubmit}
          >
            <div className="contact-field-row">
              <div className="contact-field">
                <label htmlFor="suggestion-name">Your name</label>
                <input
                  id="suggestion-name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  minLength={2}
                  maxLength={80}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="suggestion-email">Email address</label>
                <input
                  id="suggestion-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="suggestion-type">Type of suggestion</label>
              <select
                id="suggestion-type"
                name="suggestionType"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Choose a category
                </option>
                <option value="new-feature">A new feature</option>
                <option value="content">Articles or content</option>
                <option value="design">Website design or usability</option>
                <option value="resources">Learning resources</option>
                <option value="accessibility">Accessibility</option>
                <option value="other">Other improvement</option>
              </select>
            </div>

            <div className="contact-field">
              <label htmlFor="suggestion-message">Your idea</label>
              <textarea
                id="suggestion-message"
                name="suggestion"
                rows={5}
                placeholder="What would make NSeeRead more useful for you?"
                minLength={10}
                maxLength={2000}
                required
              />
              <span className="contact-field-hint">
                Describe the change and how it could help readers.
              </span>
            </div>

            <button type="submit" className="contact-submit-button contact-submit-sage">
              Share suggestion <span aria-hidden="true">↗</span>
            </button>

            {suggestionSubmitted && (
              <div className="contact-status" role="status" aria-live="polite">
                <strong>Form completed.</strong>
                <p>
                  Your entries passed browser validation, but this demo is not
                  connected to a server. Your suggestion has not been sent or saved.
                </p>
                <button
                  type="button"
                  className="contact-status-dismiss"
                  onClick={() => setSuggestionSubmitted(false)}
                >
                  Dismiss
                </button>
              </div>
            )}
          </form>
        </article>
      </section>

      {/* Closing note */}
      <section className="contact-bottom">
        <div className="contact-bottom-symbol" aria-hidden="true">
          ✳
        </div>

        <div>
          <span className="contact-eyebrow">KEEP THE CONVERSATION GOING</span>
          <h2>
            Good questions lead to <span>better ideas.</span>
          </h2>
          <p>
            Whether you need help or have a thought to share, your feedback
            can help shape a more useful learning experience.
          </p>
        </div>
      </section>
    </div>
  );
}
