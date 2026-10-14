
import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

type Category = {
  name: string;
  symbol: string;
  description: string;
};

type ArticleData = {
  id: string;
  title: string;
  category: string;
  description: string;
  readTime: string;
  level: string;
  image: string;
};

const categories: Category[] = [
  {
    name: "Technology",
    symbol: "⌘",
    description: "Understand the technology shaping our world.",
  },
  {
    name: "Business",
    symbol: "↗",
    description: "Explore business, marketing, and money.",
  },
  {
    name: "Science",
    symbol: "✳",
    description: "Discover the science behind everyday life.",
  },
  {
    name: "Psychology",
    symbol: "◎",
    description: "Understand how people think and behave.",
  },
  {
    name: "Lifestyle",
    symbol: "✦",
    description: "Build better habits and a balanced life.",
  },
  {
    name: "Education",
    symbol: "▤",
    description: "Learn smarter and make knowledge useful.",
  },
];

const articles: ArticleData[] = [
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence, Explained Simply",
    category: "Technology",
    description:
      "Understand how AI works, where we use it, and why it matters in everyday life.",
    readTime: "5 min read",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Without the Jargon",
    category: "Business",
    description:
      "Learn how brands reach people online through search, content, social media, and more.",
    readTime: "6 min read",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "human-brain",
    title: "How Your Brain Learns New Things",
    category: "Psychology",
    description:
      "Explore memory, attention, and the simple techniques that can improve learning.",
    readTime: "4 min read",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "climate-change",
    title: "Climate Change: The Essential Guide",
    category: "Science",
    description:
      "Understand the causes, effects, and practical meaning of a changing climate.",
    readTime: "7 min read",
    level: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "learning-better",
    title: "Learn Better, Not Just Longer",
    category: "Education",
    description:
      "Discover practical study methods that make learning more focused and effective.",
    readTime: "4 min read",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "mindful-living",
    title: "Small Habits for a More Balanced Life",
    category: "Lifestyle",
    description:
      "Explore realistic ways to create healthier routines without changing everything at once.",
    readTime: "5 min read",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85",
  },
];

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;

      const matchesSearch =
        query.length === 0 ||
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      navigate(`/explore?search=${encodeURIComponent(query)}`);
    } else {
      document.getElementById("featured-articles")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    setSearchQuery("");

    document.getElementById("featured-articles")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="home-hero">
        {/* Decorative background shapes */}
        <div className="hero-organic-shape hero-organic-left" aria-hidden="true" />
        <div className="hero-organic-shape hero-organic-back" aria-hidden="true" />
        <div className="hero-organic-shape hero-organic-bottom" aria-hidden="true" />
   
        <div className="home-hero-content">
          <span className="home-eyebrow">
            A SIMPLER WAY TO UNDERSTAND THE WORLD
          </span>

          <h1 className="home-hero-title">
            Big ideas.
            <br />
            <span>Made simple.</span>
          </h1>

          <p className="home-hero-description">
            Explore the topics you are curious about. Get clear explanations,
            useful insights, and meaningful knowledge without the information
            overload.
          </p>

          <form className="home-search" onSubmit={handleSearch}>
            <span className="home-search-icon" aria-hidden="true">
              ⌕
            </span>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="What would you like to understand?"
              aria-label="Search topics and articles"
            />

            <button type="submit">Explore</button>
          </form>

          <div className="home-hero-note">
            <span aria-hidden="true">✦</span>
            Clear ideas. Concise reading. Better understanding.
          </div>

          <div className="home-hero-links">
            <Link to="/explore" className="home-primary-link">
              Explore all topics <span aria-hidden="true">↗</span>
            </Link>
            <a href="#how-it-works" className="home-secondary-link">
              How it works
            </a>
          </div>
        </div>

        <div className="home-hero-visual">
          <div className="home-hero-image-frame">
            <img
                 src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=85"
                 alt="A peaceful reading space with books and natural light"
                className="home-hero-image"
             />

            <div className="home-image-label">
              <span className="home-label-dot" />
              MAKE SPACE FOR CURIOSITY
            </div>
          </div>

          <div className="home-floating-card home-floating-top">
            <span className="home-floating-icon">✳</span>
            <div>
              <strong>Curiosity starts here</strong>
              <span>One topic at a time</span>
            </div>
          </div>

          <div className="home-floating-card home-floating-bottom">
            <span className="home-floating-number">01</span>
            <div>
              <strong>Read with purpose</strong>
              <span>Keep what matters</span>
            </div>
          </div>

         
          {/* Decorative starburst */}
          <div className="home-hero-decoration" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <path
                d="M24 3V45 M3 24H45 M9 9L39 39 M39 9L9 39"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="24" cy="24" r="3" fill="currentColor" />
            </svg>
          </div>

          {/* Botanical branch illustration */}
          <svg
            className="hero-botanical-branch"
            viewBox="0 0 150 250"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M15 230C48 184 75 130 125 20"
              stroke="#457B90"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M35 198C8 180 5 157 12 139C32 153 43 172 35 198Z"
              stroke="#457B90"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M48 176C73 164 91 143 94 119C70 129 53 150 48 176Z"
              stroke="#457B90"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M65 143C39 127 33 104 40 84C60 99 70 119 65 143Z"
              stroke="#457B90"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M79 111C105 99 120 79 121 57C99 69 84 89 79 111Z"
              stroke="#457B90"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M95 77C77 59 76 39 86 21C101 39 104 58 95 77Z"
              stroke="#457B90"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* INTRODUCTION STRIP */}
      <section className="home-intro-strip">
        <div className="home-intro-item">
          <span className="home-intro-symbol">01</span>
          <span>Find what interests you</span>
        </div>

        <span className="home-intro-divider" />

        <div className="home-intro-item">
          <span className="home-intro-symbol">02</span>
          <span>Understand the essentials</span>
        </div>

        <span className="home-intro-divider" />

        <div className="home-intro-item">
          <span className="home-intro-symbol">03</span>
          <span>Use what you learn</span>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="home-section home-categories-section">
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow">START WITH CURIOSITY</span>
            <h2 className="home-section-title">
              What are you <span>curious about?</span>
            </h2>
            <p className="home-section-description">
              Choose a subject and start exploring ideas that matter to you.
            </p>
          </div>

          <Link to="/explore" className="home-text-link">
            View all topics <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="home-category-grid">
          {categories.map((category, index) => (
            <button
              type="button"
              className={`home-category-card home-category-${index + 1}`}
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
            >
              <span className="home-category-symbol" aria-hidden="true">
                {category.symbol}
              </span>

              <span className="home-category-name">{category.name}</span>

              <span className="home-category-description">
                {category.description}
              </span>

              <span className="home-category-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section
        className="home-section home-articles-section"
        id="featured-articles"
      >
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow">KNOWLEDGE, MADE ACCESSIBLE</span>
            <h2 className="home-section-title">
              Ideas worth <span>understanding.</span>
            </h2>
            <p className="home-section-description">
              Thoughtfully organised reads to help you learn something useful.
            </p>
          </div>

          <Link to="/explore" className="home-text-link">
            Explore library <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="home-article-toolbar">
          <div className="home-filter-tabs" aria-label="Filter articles">
            {["All", ...categories.map((category) => category.name)].map(
              (category) => (
                <button
                  type="button"
                  key={category}
                  className={
                    activeCategory === category
                      ? "home-filter-tab active"
                      : "home-filter-tab"
                  }
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              )
            )}
          </div>

          <span className="home-article-count">
            {filteredArticles.length}{" "}
            {filteredArticles.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="home-article-grid">
            {filteredArticles.map((article, index) => (
              <article
                className="home-article-card"
                key={article.id}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <Link
                  to={`/article/${article.id}`}
                  className="home-article-image-link"
                  aria-label={`Read ${article.title}`}
                >
                  <img
                    src={article.image}
                    alt=""
                    className="home-article-image"
                    loading="lazy"
                  />

                  <span className="home-article-category">
                    {article.category}
                  </span>
                </Link>

                <div className="home-article-content">
                  <div className="home-article-meta">
                    <span>{article.readTime}</span>
                    <span className="home-meta-dot">·</span>
                    <span>{article.level}</span>
                  </div>

                  <h3 className="home-article-title">
                    <Link to={`/article/${article.id}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="home-article-description">
                    {article.description}
                  </p>

                  <Link
                    to={`/article/${article.id}`}
                    className="home-read-link"
                  >
                    Read the essentials <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="home-empty-state">
            <span className="home-empty-symbol">⌕</span>
            <h3>No matching articles yet</h3>
            <p>Try another search term or choose a different subject.</p>
            <button
              type="button"
              className="home-reset-button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
            >
              Show all articles
            </button>
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section
        className="home-approach-section"
        id="how-it-works"
      >
        <div className="home-approach-inner">
          <div className="home-approach-heading">
            <span className="home-eyebrow">A BETTER WAY TO LEARN</span>
            <h2 className="home-section-title">
              Less overwhelm.
              <br />
              <span>More understanding.</span>
            </h2>
            <p className="home-section-description">
              Learning should feel clear, useful, and achievable. NSeeRead
              turns unfamiliar topics into manageable ideas.
            </p>
          </div>

          <div className="home-steps">
            <div className="home-step">
              <span className="home-step-number">01</span>
              <div className="home-step-content">
                <h3>Discover</h3>
                <p>
                  Find subjects, questions, and ideas that match your curiosity.
                </p>
              </div>
              <span className="home-step-symbol" aria-hidden="true">
                ⌕
              </span>
            </div>

            <div className="home-step">
              <span className="home-step-number">02</span>
              <div className="home-step-content">
                <h3>Understand</h3>
                <p>
                  Explore structured explanations without unnecessary
                  information overload.
                </p>
              </div>
              <span className="home-step-symbol" aria-hidden="true">
                ≋
              </span>
            </div>

            <div className="home-step">
              <span className="home-step-number">03</span>
              <div className="home-step-content">
                <h3>Remember</h3>
                <p>
                  Focus on the essential concepts and connect ideas to everyday
                  life.
                </p>
              </div>
              <span className="home-step-symbol" aria-hidden="true">
                ✳
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="home-section home-benefits-section">
        <div className="home-benefits-heading">
          <span className="home-eyebrow">WHY NSEEREAD</span>
          <h2 className="home-section-title">
            Knowledge that respects <span>your time.</span>
          </h2>
          <p className="home-section-description">
            Useful information, presented with clarity and purpose.
          </p>
        </div>

        <div className="home-benefits-grid">
          <div className="home-benefit">
            <span className="home-benefit-icon">◷</span>
            <h3>Concise by design</h3>
            <p>
              Get to the important ideas without working through pages of
              unnecessary detail.
            </p>
          </div>

          <div className="home-benefit">
            <span className="home-benefit-icon">◇</span>
            <h3>Easy to understand</h3>
            <p>
              Clear language and structured explanations make complex topics
              more approachable.
            </p>
          </div>

          <div className="home-benefit">
            <span className="home-benefit-icon">⌕</span>
            <h3>Simple to explore</h3>
            <p>
              Browse different subjects and discover ideas beyond your usual
              interests.
            </p>
          </div>

          <div className="home-benefit">
            <span className="home-benefit-icon">✳</span>
            <h3>Built for curiosity</h3>
            <p>
              Follow your questions, explore new perspectives, and keep
              learning at your own pace.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="home-cta-section">
        <div className="home-cta-decoration home-cta-decoration-one">
          ✳
        </div>
        <div className="home-cta-decoration home-cta-decoration-two">
          ◇
        </div>

        <div className="home-cta-content">
          <span className="home-eyebrow">YOUR NEXT IDEA STARTS HERE</span>
          <h2>
            Stay curious.
            <br />
            <span>Keep discovering.</span>
          </h2>

          <p>
            There is always something new to understand. Find your next topic
            and make the most of every read.
          </p>

          <Link to="/explore" className="home-cta-button">
            Start exploring <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
