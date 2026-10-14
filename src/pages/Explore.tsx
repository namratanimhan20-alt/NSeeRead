
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Explore.css";

type Topic = {
  id: string;
  title: string;
  category: string;
  description: string;
  readTime: number;
  level: string;
  icon: string;
  color: string;
  featured?: boolean;
};

const topics: Topic[] = [
  {
    id: "artificial-intelligence",
    title: "Understanding Artificial Intelligence",
    category: "Technology",
    description:
      "Discover how AI works, where we use it, and how it is changing everyday life.",
    readTime: 6,
    level: "Beginner",
    icon: "✳",
    color: "mint",
    featured: true,
  },
  {
    id: "climate-change",
    title: "Climate Change Explained",
    category: "Science",
    description:
      "Understand the causes of climate change, its effects, and practical solutions.",
    readTime: 5,
    level: "Beginner",
    icon: "◉",
    color: "sand",
  },
  {
    id: "financial-literacy",
    title: "The Basics of Financial Literacy",
    category: "Business",
    description:
      "Learn about budgeting, saving, interest, and making informed financial decisions.",
    readTime: 7,
    level: "Beginner",
    icon: "₹",
    color: "blue",
  },
  {
    id: "human-brain",
    title: "How Your Brain Learns",
    category: "Health",
    description:
      "Explore memory, attention, and the science behind learning new skills.",
    readTime: 6,
    level: "Intermediate",
    icon: "◎",
    color: "rose",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Fundamentals",
    category: "Technology",
    description:
      "Explore SEO, social media, content marketing, and the digital customer journey.",
    readTime: 8,
    level: "Beginner",
    icon: "↗",
    color: "blue",
  },
  {
    id: "critical-thinking",
    title: "A Practical Guide to Critical Thinking",
    category: "Education",
    description:
      "Learn to question assumptions, evaluate information, and make better decisions.",
    readTime: 5,
    level: "Intermediate",
    icon: "◇",
    color: "mint",
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy Made Simple",
    category: "Science",
    description:
      "Understand solar, wind, and other cleaner sources of energy.",
    readTime: 6,
    level: "Beginner",
    icon: "☼",
    color: "sand",
  },
  {
    id: "communication-skills",
    title: "The Art of Effective Communication",
    category: "Personal Growth",
    description:
      "Improve listening, express ideas clearly, and build stronger connections.",
    readTime: 4,
    level: "Beginner",
    icon: "⌁",
    color: "rose",
  },
  {
    id: "entrepreneurship",
    title: "How to Turn an Idea into a Business",
    category: "Business",
    description:
      "Learn the fundamentals of identifying opportunities and validating ideas.",
    readTime: 9,
    level: "Intermediate",
    icon: "↗",
    color: "mint",
  },
];

const categories = [
  "All Topics",
  "Technology",
  "Science",
  "Business",
  "Health",
  "Education",
  "Personal Growth",
];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [sortBy, setSortBy] = useState("recommended");

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase();

    const results = topics.filter((topic) => {
      const matchesCategory =
        activeCategory === "All Topics" ||
        topic.category === activeCategory;

      const matchesSearch =
        !query ||
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query) ||
        topic.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "shortest") {
      return [...results].sort((a, b) => a.readTime - b.readTime);
    }

    if (sortBy === "az") {
      return [...results].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return results;
  }, [search, activeCategory, sortBy]);

  return (
    <div className="explore-page">
      <section className="explore-hero">
        <div className="explore-hero-content">
          <span className="explore-eyebrow">
            YOUR NEXT DISCOVERY STARTS HERE
          </span>

          <h1>
            Explore ideas.
            <br />
            <span>Understand more.</span>
          </h1>

          <p>
            Find clear, useful explanations of the topics that matter to you.
            Less searching, less clutter, more understanding.
          </p>

          <div className="explore-search">
            <span className="explore-search-icon" aria-hidden="true">
              ⌕
            </span>

            <input
              type="search"
              aria-label="Search topics"
              placeholder="Search a topic, subject, or idea..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                className="explore-clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="explore-search-hint">
            <span>Try:</span>
            {["Artificial Intelligence", "Science", "Marketing"].map(
              (suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => setSearch(suggestion)}
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        </div>

        <div className="explore-hero-decoration" aria-hidden="true">
          <span className="explore-orbit explore-orbit-one" />
          <span className="explore-orbit explore-orbit-two" />
          <span className="explore-decoration-symbol">N.</span>
          <span className="explore-decoration-caption">
            LEARN SOMETHING NEW
          </span>
        </div>
      </section>

      <section className="explore-content">
        <div className="explore-section-heading">
          <div>
            <span className="explore-eyebrow">
              KNOWLEDGE WITHOUT THE CLUTTER
            </span>
            <h2>
              Find your next <span>read.</span>
            </h2>
            <p>Choose a subject or follow your curiosity.</p>
          </div>

          <span className="explore-topic-total">
            {filteredTopics.length}{" "}
            {filteredTopics.length === 1 ? "topic" : "topics"}
          </span>
        </div>

        <div className="explore-category-list" aria-label="Filter by category">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                activeCategory === category
                  ? "explore-category active"
                  : "explore-category"
              }
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="explore-results-toolbar">
          <p>
            {search
              ? `Results for "${search.trim()}"`
              : activeCategory === "All Topics"
                ? "Explore all topics"
                : `Explore ${activeCategory}`}
          </p>

          <label className="explore-sort">
            <span>Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="shortest">Quickest reads</option>
              <option value="az">Title: A–Z</option>
            </select>
          </label>
        </div>

        {filteredTopics.length > 0 ? (
          <div className="explore-topic-grid">
            {filteredTopics.map((topic) => (
              <article className="explore-topic-card" key={topic.id}>
                <div
                  className={`explore-topic-art ${topic.color}`}
                  aria-hidden="true"
                >
                  <span className="explore-topic-art-symbol">
                    {topic.icon}
                  </span>
                  <span className="explore-topic-art-label">
                    {topic.category}
                  </span>
                  {topic.featured && (
                    <span className="explore-featured-label">
                      EDITOR'S PICK
                    </span>
                  )}
                </div>

                <div className="explore-topic-body">
                  <div className="explore-topic-meta">
                    <span>{topic.category}</span>
                    <span>{topic.readTime} min read</span>
                  </div>

                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>

                  <div className="explore-topic-footer">
                    <span className="explore-level">{topic.level}</span>

                    <Link
                      to={`/article/${topic.id}`}
                      className="explore-read-link"
                      aria-label={`Read ${topic.title}`}
                    >
                      Explore topic <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="explore-empty-state">
            <span aria-hidden="true">⌕</span>
            <h3>No topics found</h3>
            <p>
              Try a different search term or choose another category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All Topics");
                setSortBy("recommended");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="explore-bottom-note">
          <span aria-hidden="true">✳</span>
          <p>
            Curiosity is a good place to start.
            <strong> Keep discovering.</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
