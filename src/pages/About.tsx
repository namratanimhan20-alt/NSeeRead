
import { Link } from "react-router-dom";
import "./About.css";

const principles = [
  {
    number: "01",
    title: "Clarity over clutter",
    description:
      "We believe useful information should be easier to approach, with clear explanations and a structure that helps readers focus on what matters.",
    symbol: "✳",
  },
  {
    number: "02",
    title: "Curiosity without limits",
    description:
      "Every question can lead somewhere interesting. Explore different subjects, discover new perspectives, and follow the topics that spark your curiosity.",
    symbol: "⌕",
  },
  {
    number: "03",
    title: "Understanding over memorising",
    description:
      "Reading is only the beginning. The real goal is to connect ideas, understand the bigger picture, and take meaningful knowledge forward.",
    symbol: "↗",
  },
];

const steps = [
  {
    number: "01",
    title: "Search",
    description:
      "Start with a question, a keyword, or a subject you want to understand better.",
    symbol: "⌕",
  },
  {
    number: "02",
    title: "Discover",
    description:
      "Explore topics and useful resources that introduce you to new ideas.",
    symbol: "✳",
  },
  {
    number: "03",
    title: "Understand",
    description:
      "Read structured explanations, connect the key points, and build your understanding.",
    symbol: "↗",
  },
];

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-eyebrow">
            GET TO KNOW NSeeRead
          </span>

          <h1>
            Knowledge should feel
            <br />
            <span>closer, not complicated.</span>
          </h1>

          <p>
            NSeeRead is an informative learning platform designed to make
            discovering ideas and understanding new subjects feel simpler.
            Less unnecessary reading. More meaningful learning.
          </p>

          <div className="about-hero-actions">
            <Link to="/explore" className="about-button about-button-primary">
              Explore Topics <span aria-hidden="true">↗</span>
            </Link>

            <Link to="/resources" className="about-button about-button-secondary">
              Discover Resources
            </Link>
          </div>
        </div>

        <div className="about-hero-visual" aria-label="NSeeRead reading concept">
          <div className="about-orbit about-orbit-one" />
          <div className="about-orbit about-orbit-two" />

          <div className="about-book-card">
            <span className="about-book-label">THE NSeeRead IDEA</span>

            <div className="about-book-rule" />

            <p className="about-book-small">A little less scrolling.</p>
            <h2>
              A little more
              <br />
              <span>understanding.</span>
            </h2>

            <div className="about-book-bottom">
              <span>READ WITH PURPOSE</span>
              <span aria-hidden="true">✳</span>
            </div>
          </div>

          <span className="about-floating-note about-floating-note-top">
            Stay curious.
          </span>

          <span className="about-floating-note about-floating-note-bottom">
            Keep discovering.
          </span>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="about-mission-label">
          <span className="about-eyebrow">OUR PURPOSE</span>
          <span className="about-section-number">01 / THE WHY</span>
        </div>

        <div className="about-mission-content">
          <h2>
            Learn More.
            <br />
            <span>Read Less.</span>
          </h2>

          <div className="about-mission-copy">
            <p>
              There is a lot of information available online, but finding
              something useful and understanding it are two different things.
              Long explanations, scattered information, and unnecessary
              complexity can make learning feel harder than it needs to be.
            </p>

            <p>
              NSeeRead is built around a simple idea: help people approach
              information in a clearer, more approachable way. The aim is to
              preserve the main ideas while making a subject easier to follow.
            </p>

            <p className="about-mission-highlight">
              We are here to make learning easier to begin, easier to follow,
              and more rewarding to finish.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="about-principles">
        <div className="about-section-heading">
          <span className="about-eyebrow">WHAT GUIDES US</span>
          <h2>
            Built around <span>better learning.</span>
          </h2>
          <p>
            The ideas behind the way NSeeRead presents information.
          </p>
        </div>

        <div className="about-principles-grid">
          {principles.map((principle) => (
            <article className="about-principle-card" key={principle.number}>
              <div className="about-principle-top">
                <span className="about-principle-number">
                  {principle.number}
                </span>
                <span className="about-principle-symbol" aria-hidden="true">
                  {principle.symbol}
                </span>
              </div>

              <h3>{principle.title}</h3>

              <p>{principle.description}</p>

              <div className="about-principle-line" />
            </article>
          ))}
        </div>
      </section>

      {/* User journey */}
      <section className="about-journey">
        <div className="about-journey-heading">
          <span className="about-eyebrow">YOUR LEARNING JOURNEY</span>
          <h2>
            From a question
            <br />
            <span>to understanding.</span>
          </h2>
          <p>
            Every discovery starts somewhere. NSeeRead brings the process
            together in three simple stages.
          </p>
        </div>

        <div className="about-journey-steps">
          {steps.map((step, index) => (
            <article className="about-journey-step" key={step.number}>
              <div className="about-step-top">
                <span className="about-step-number">{step.number}</span>
                <span className="about-step-symbol" aria-hidden="true">
                  {step.symbol}
                </span>
              </div>

              <h3>{step.title}</h3>
              <p>{step.description}</p>

              {index < steps.length - 1 && (
                <span className="about-step-connector" aria-hidden="true">
                  →
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Closing call to action */}
      <section className="about-cta">
        <div className="about-cta-decoration" aria-hidden="true">
          N.
        </div>

        <div className="about-cta-content">
          <span className="about-eyebrow">YOUR NEXT DISCOVERY STARTS HERE</span>

          <h2>
            There is always
            <br />
            <span>more to understand.</span>
          </h2>

          <p>
            Follow your curiosity. Explore a new subject. Find a better way
            to understand something you have always wondered about.
          </p>

          <Link to="/explore" className="about-button about-button-primary">
            Start Exploring <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="about-cta-signature">
          <span>Learn More.</span>
          <span>Read Less.</span>
        </div>
      </section>
    </div>
  );
}
