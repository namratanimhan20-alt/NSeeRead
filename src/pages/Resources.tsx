
import { useMemo, useState } from "react";
import "./Resources.css";

type Resource = {
  id: string;
  name: string;
  category: string;
  description: string;
  bestFor: string;
  website: string;
  link: string;
  icon: string;
  style: string;
  label: string;
};

const resources: Resource[] = [
  {
    id: "google-scholar",
    name: "Google Scholar",
    category: "Research",
    description:
      "Find scholarly articles, academic papers, theses, books, and citations across many subject areas.",
    bestFor: "Academic research and literature reviews",
    website: "scholar.google.com",
    link: "https://scholar.google.com/",
    icon: "⌕",
    style: "mint",
    label: "Research search engine",
  },
  {
    id: "arxiv",
    name: "arXiv",
    category: "Research",
    description:
      "Explore research papers in fields such as computer science, mathematics, physics, and statistics.",
    bestFor: "Reading emerging research",
    website: "arxiv.org",
    link: "https://arxiv.org/",
    icon: "∑",
    style: "sand",
    label: "Research repository",
  },
  {
    id: "pubmed",
    name: "PubMed",
    category: "Research",
    description:
      "Search biomedical and life sciences literature, including citations and links to available full text.",
    bestFor: "Medical and life sciences research",
    website: "pubmed.ncbi.nlm.nih.gov",
    link: "https://pubmed.ncbi.nlm.nih.gov/",
    icon: "⊕",
    style: "blue",
    label: "Biomedical literature",
  },
  {
    id: "britannica",
    name: "Encyclopaedia Britannica",
    category: "Learning",
    description:
      "Read reference articles that introduce important people, places, events, and concepts.",
    bestFor: "Building background knowledge",
    website: "britannica.com",
    link: "https://www.britannica.com/",
    icon: "B",
    style: "sand",
    label: "Reference library",
  },
  {
    id: "khan-academy",
    name: "Khan Academy",
    category: "Learning",
    description:
      "Study subjects through lessons, practice exercises, and explanations across a range of school and college topics.",
    bestFor: "Learning concepts step by step",
    website: "khanacademy.org",
    link: "https://www.khanacademy.org/",
    icon: "K",
    style: "mint",
    label: "Lessons and practice",
  },
  {
    id: "mit-ocw",
    name: "MIT OpenCourseWare",
    category: "Learning",
    description:
      "Access course materials from MIT, including lecture notes, assignments, and selected course resources.",
    bestFor: "Independent university-level study",
    website: "ocw.mit.edu",
    link: "https://ocw.mit.edu/",
    icon: "M",
    style: "rose",
    label: "University course materials",
  },
  {
    id: "nptel",
    name: "NPTEL",
    category: "Learning",
    description:
      "Explore online courses and educational content developed through India's engineering, science, and higher-education network.",
    bestFor: "Engineering and technical subjects",
    website: "nptel.ac.in",
    link: "https://nptel.ac.in/",
    icon: "N",
    style: "blue",
    label: "Indian education platform",
  },
  {
    id: "mdn",
    name: "MDN Web Docs",
    category: "Technology",
    description:
      "Learn about HTML, CSS, JavaScript, web APIs, and browser technologies through guides and technical references.",
    bestFor: "Web development",
    website: "developer.mozilla.org",
    link: "https://developer.mozilla.org/",
    icon: "</>",
    style: "blue",
    label: "Developer documentation",
  },
  {
    id: "github-docs",
    name: "GitHub Docs",
    category: "Technology",
    description:
      "Understand GitHub workflows, repositories, branches, collaboration, and tools for software development.",
    bestFor: "Version control and collaboration",
    website: "docs.github.com",
    link: "https://docs.github.com/",
    icon: "⌘",
    style: "sand",
    label: "Technical documentation",
  },
  {
    id: "google-search-central",
    name: "Google Search Central",
    category: "Digital Marketing",
    description:
      "Learn how Google Search works and explore official guidance on SEO, indexing, structured data, and website visibility.",
    bestFor: "SEO fundamentals and best practices",
    website: "developers.google.com/search",
    link: "https://developers.google.com/search/docs",
    icon: "G",
    style: "mint",
    label: "Official SEO documentation",
  },
  {
    id: "google-trends",
    name: "Google Trends",
    category: "Digital Marketing",
    description:
      "Explore search-interest patterns over time and compare interest in topics across regions.",
    bestFor: "Trend discovery and topic research",
    website: "trends.google.com",
    link: "https://trends.google.com/trends/",
    icon: "↗",
    style: "rose",
    label: "Search trend analysis",
  },
  {
    id: "semrush-academy",
    name: "Semrush Academy",
    category: "Digital Marketing",
    description:
      "Explore digital marketing courses and learning materials covering SEO, content, and online visibility.",
    bestFor: "Digital marketing skill development",
    website: "semrush.com/academy",
    link: "https://www.semrush.com/academy/",
    icon: "S",
    style: "sand",
    label: "Marketing education",
  },
];

const categories = [
  "All Resources",
  "Research",
  "Learning",
  "Technology",
  "Digital Marketing",
];

export default function Resources() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Resources");
  const [sortBy, setSortBy] = useState("recommended");

  const filteredResources = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = resources.filter((resource) => {
      const matchesCategory =
        activeCategory === "All Resources" ||
        resource.category === activeCategory;

      const searchableText = [
        resource.name,
        resource.category,
        resource.description,
        resource.bestFor,
        resource.label,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });

    if (sortBy === "az") {
      return [...filtered].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortBy === "category") {
      return [...filtered].sort((a, b) =>
        a.category.localeCompare(b.category) ||
        a.name.localeCompare(b.name)
      );
    }

    return filtered;
  }, [search, activeCategory, sortBy]);

  const categoryCounts = useMemo(() => {
    return resources.reduce<Record<string, number>>(
      (counts, resource) => {
        counts[resource.category] = (counts[resource.category] ?? 0) + 1;
        return counts;
      },
      {}
    );
  }, []);

  return (
    <div className="resources-page">
      <section className="resources-hero">
        <div className="resources-hero-inner">
          <span className="resources-eyebrow">
            YOUR KNOWLEDGE TOOLKIT
          </span>

          <h1>
            Better resources.
            <br />
            <span>Deeper understanding.</span>
          </h1>

          <p>
            Discover trusted places to research, learn new skills, and
            explore ideas beyond the page.
          </p>

          <div className="resources-search">
            <span aria-hidden="true" className="resources-search-icon">
              ⌕
            </span>

            <input
              type="search"
              aria-label="Search learning resources"
              placeholder="Search resources, subjects, or skills..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                className="resources-clear-search"
                aria-label="Clear search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}
          </div>

          <div className="resources-hero-note">
            <span aria-hidden="true">✳</span>
            <span>
              Curated starting points for your next discovery.
            </span>
          </div>
        </div>

        <div className="resources-hero-art" aria-hidden="true">
          <span className="resources-art-ring resources-art-ring-one" />
          <span className="resources-art-ring resources-art-ring-two" />
          <span className="resources-art-symbol">R.</span>
          <span className="resources-art-caption">READ · RESEARCH · GROW</span>
        </div>
      </section>

      <section className="resources-content">
        <div className="resources-heading">
          <div>
            <span className="resources-eyebrow">
              EXPLORE YOUR OPTIONS
            </span>
            <h2>
              Your learning <span>library.</span>
            </h2>
            <p>
              Find the right starting point for what you want to understand.
            </p>
          </div>

          <div className="resources-total">
            <strong>{filteredResources.length}</strong>
            <span>
              {filteredResources.length === 1 ? "resource" : "resources"}
            </span>
          </div>
        </div>

        <div
          className="resources-category-list"
          aria-label="Filter resources by category"
        >
          {categories.map((category) => {
            const count =
              category === "All Resources"
                ? resources.length
                : categoryCounts[category] ?? 0;

            return (
              <button
                type="button"
                key={category}
                className={
                  activeCategory === category
                    ? "resources-category active"
                    : "resources-category"
                }
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
                <span>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="resources-toolbar">
          <div className="resources-results-label">
            <span className="resources-results-dot" />
            <span>
              {search.trim()
                ? `Results for "${search.trim()}"`
                : activeCategory === "All Resources"
                  ? "All learning resources"
                  : activeCategory}
            </span>
          </div>

          <label className="resources-sort">
            <span>Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="az">Name: A–Z</option>
              <option value="category">Category</option>
            </select>
          </label>
        </div>

        {filteredResources.length > 0 ? (
          <div className="resources-grid">
            {filteredResources.map((resource) => (
              <article
                className="resources-card"
                key={resource.id}
              >
                <div className={`resources-card-top ${resource.style}`}>
                  <span
                    className="resources-card-icon"
                    aria-hidden="true"
                  >
                    {resource.icon}
                  </span>

                  <span className="resources-card-category">
                    {resource.category}
                  </span>
                </div>

                <div className="resources-card-body">
                  <span className="resources-card-label">
                    {resource.label}
                  </span>

                  <h3>{resource.name}</h3>

                  <p className="resources-card-description">
                    {resource.description}
                  </p>

                  <div className="resources-best-for">
                    <span aria-hidden="true">↗</span>
                    <p>
                      <strong>Useful for</strong>
                      {resource.bestFor}
                    </p>
                  </div>

                  <div className="resources-card-footer">
                    <span className="resources-website">
                      {resource.website}
                    </span>

                    <a
                      className="resources-visit-link"
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${resource.name} website, opens in a new tab`}
                    >
                      Visit site <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="resources-empty">
            <span className="resources-empty-icon" aria-hidden="true">
              ⌕
            </span>
            <h3>No resources found</h3>
            <p>
              Try a different search term or choose another category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All Resources");
                setSortBy("recommended");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        <section className="resources-research-tip">
          <div className="resources-tip-symbol" aria-hidden="true">
            ✳
          </div>
          <div>
            <span className="resources-eyebrow">A SMALL RESEARCH TIP</span>
            <h3>Explore widely. Verify carefully.</h3>
            <p>
              Check the author, publication date, supporting evidence, and
              original source before relying on information. Some resources
              link to abstracts or previews; full access may require a
              subscription or institutional account.
            </p>
          </div>
        </section>

        <div className="resources-bottom-note">
          <span aria-hidden="true">✳</span>
          <p>
            Keep asking questions.
            <strong> Keep discovering.</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
