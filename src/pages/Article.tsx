import { Link, useParams } from "react-router-dom";
import "./Article.css";

type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type ArticleContent = {
  title: string;
  category: string;
  readTime: number;
  level: string;
  icon: string;
  intro: string;
  sections: ArticleSection[];
  takeaways: string[];
  related: string[];
};

const articles: Record<string, ArticleContent> = {
  "artificial-intelligence": {
    title: "Understanding Artificial Intelligence",
    category: "Technology",
    readTime: 6,
    level: "Beginner",
    icon: "✳",
    intro:
      "Artificial Intelligence (AI) is the ability of computer systems to perform tasks that usually require human intelligence. These tasks include understanding language, recognizing patterns, solving problems, and making predictions.",
    sections: [
      {
        heading: "What is Artificial Intelligence?",
        paragraphs: [
          "AI systems process information and use patterns to produce an output. Some follow explicitly written rules, while others learn patterns from examples using machine learning.",
          "Machine learning is a major area of AI. Instead of programming every possible response, developers train models using data so they can recognize patterns and make predictions."
        ]
      },
      {
        heading: "Where do we use AI?",
        paragraphs: [
          "AI is already part of everyday life. It powers recommendation systems, voice assistants, spam filters, translation tools, and navigation applications."
        ],
        bullets: [
          "Education: personalized learning and study assistance.",
          "Healthcare: helping professionals analyze medical information.",
          "Business: customer support and forecasting.",
          "Transportation: route planning and driver-assistance systems."
        ]
      },
      {
        heading: "Benefits and limitations",
        paragraphs: [
          "AI can process large amounts of information quickly and automate repetitive tasks. However, its output depends on the data, design, and instructions it receives.",
          "AI can make mistakes, reproduce biases in its training data, or produce convincing but incorrect answers. Important information should be checked against reliable sources, and sensitive data should be handled carefully."
        ]
      }
    ],
    takeaways: [
      "AI helps machines perform tasks associated with human intelligence.",
      "Machine learning allows systems to learn patterns from data.",
      "AI is useful, but its outputs still require human judgment and verification."
    ],
    related: ["digital-marketing", "critical-thinking", "human-brain"]
  },

  "climate-change": {
    title: "Climate Change Explained",
    category: "Science",
    readTime: 5,
    level: "Beginner",
    icon: "◉",
    intro:
      "Climate change refers to long-term changes in Earth's temperatures and weather patterns. Although natural processes influence climate, human activities have been the main driver of global warming since the industrial era.",
    sections: [
      {
        heading: "What causes climate change?",
        paragraphs: [
          "Burning coal, oil, and natural gas releases greenhouse gases such as carbon dioxide. These gases trap heat in the atmosphere, strengthening the natural greenhouse effect.",
          "Deforestation also contributes because trees absorb carbon dioxide. Agriculture and industrial activities release other greenhouse gases, including methane."
        ]
      },
      {
        heading: "How does it affect the planet?",
        paragraphs: [
          "A warming climate contributes to rising sea levels, shrinking glaciers, changing rainfall patterns, and more frequent or intense heat extremes in many regions.",
          "These changes can affect farming, water supplies, natural ecosystems, infrastructure, and human health. The impacts differ by location and depend on future emissions and adaptation."
        ]
      },
      {
        heading: "What can be done?",
        paragraphs: [
          "Reducing emissions and preparing for climate impacts are both important. Governments, businesses, communities, and individuals can contribute to these efforts."
        ],
        bullets: [
          "Expand cleaner energy sources and improve energy efficiency.",
          "Protect forests and restore damaged ecosystems.",
          "Develop cleaner transport and more sustainable infrastructure.",
          "Prepare communities for heat, flooding, and other climate risks."
        ]
      }
    ],
    takeaways: [
      "Human greenhouse gas emissions are the main driver of recent global warming.",
      "Climate impacts affect ecosystems, communities, and economies.",
      "Reducing emissions and adapting to changes are complementary priorities."
    ],
    related: ["renewable-energy", "critical-thinking", "human-brain"]
  },

  "financial-literacy": {
    title: "The Basics of Financial Literacy",
    category: "Business",
    readTime: 7,
    level: "Beginner",
    icon: "₹",
    intro:
      "Financial literacy means understanding how to manage money, plan expenses, save, borrow responsibly, and make informed financial decisions. These skills help people work toward their goals and prepare for unexpected costs.",
    sections: [
      {
        heading: "Understand your money",
        paragraphs: [
          "Start by identifying your income and expenses. Income is money you receive, while expenses are the costs you pay. Tracking both shows where your money goes.",
          "A budget is a plan for allocating money to needs, savings, and optional spending. A useful budget reflects your actual income and priorities rather than unrealistic targets."
        ]
      },
      {
        heading: "Saving and emergency funds",
        paragraphs: [
          "Saving means setting aside money for future needs. Goals might include education, a major purchase, or an unexpected expense.",
          "An emergency fund can help cover unplanned costs without immediately relying on borrowing. The amount needed depends on personal circumstances, essential expenses, and available support."
        ]
      },
      {
        heading: "Understand interest and borrowing",
        paragraphs: [
          "Interest is the cost of borrowing money or the return earned on savings. Simple interest is calculated on the original principal, while compound interest includes interest accumulated over time.",
          "Before borrowing, compare the total repayment amount, interest rate, fees, repayment schedule, and consequences of missed payments. A low advertised payment does not always mean a loan is inexpensive."
        ],
        bullets: [
          "Review account statements regularly.",
          "Compare financial products before committing.",
          "Protect passwords and one-time verification codes.",
          "Check reliable sources before making major financial decisions."
        ]
      }
    ],
    takeaways: [
      "A budget helps connect your spending to your priorities.",
      "Saving can provide flexibility when unexpected costs arise.",
      "Understand interest, fees, and repayment terms before borrowing."
    ],
    related: ["entrepreneurship", "critical-thinking", "digital-marketing"]
  },

  "human-brain": {
    title: "How Your Brain Learns",
    category: "Health",
    readTime: 6,
    level: "Intermediate",
    icon: "◎",
    intro:
      "Learning involves changes in how the brain processes and stores information. Attention, practice, feedback, sleep, and prior knowledge all influence how well new information is understood and remembered.",
    sections: [
      {
        heading: "Attention comes first",
        paragraphs: [
          "Your brain receives more information than you can consciously focus on at once. Directing attention toward a topic helps you process the information more effectively.",
          "Frequent interruptions make it harder to maintain concentration. A quiet workspace, clear goals, and short focused sessions can make studying more manageable."
        ]
      },
      {
        heading: "How memories develop",
        paragraphs: [
          "Memory involves encoding information, retaining it, and retrieving it when needed. Understanding an idea and connecting it with existing knowledge can make it easier to remember.",
          "Repeatedly retrieving information from memory strengthens learning more effectively than relying only on rereading. This is why self-testing and explaining a concept in your own words are useful study methods."
        ]
      },
      {
        heading: "Practical ways to learn better",
        paragraphs: [
          "Learning is a process rather than a single event. Use a combination of practice, feedback, and review to identify what you understand and what needs more attention."
        ],
        bullets: [
          "Study in focused sessions with clear objectives.",
          "Use practice questions and recall information without notes.",
          "Space revision across several days instead of cramming.",
          "Get adequate sleep and take breaks when concentration falls."
        ]
      }
    ],
    takeaways: [
      "Attention helps information enter the learning process.",
      "Active recall and spaced practice support long-term retention.",
      "Feedback, rest, and consistent practice matter."
    ],
    related: ["critical-thinking", "communication-skills", "artificial-intelligence"]
  },

  "digital-marketing": {
    title: "Digital Marketing Fundamentals",
    category: "Technology",
    readTime: 8,
    level: "Beginner",
    icon: "↗",
    intro:
      "Digital marketing uses online channels and digital technologies to reach audiences, communicate value, and support business goals. It includes search engines, websites, social media, email, and online advertising.",
    sections: [
      {
        heading: "Major types of digital marketing",
        paragraphs: [
          "Different channels support different parts of the customer journey. A business may use several together, depending on its audience, budget, and objectives."
        ],
        bullets: [
          "Search engine optimization (SEO): improving visibility in unpaid search results.",
          "Content marketing: publishing useful articles, videos, and other information.",
          "Social media marketing: engaging audiences on social platforms.",
          "Email marketing: sending relevant messages to subscribers.",
          "Paid advertising: paying to display ads to selected audiences."
        ]
      },
      {
        heading: "Understand the customer journey",
        paragraphs: [
          "People often move from awareness to consideration and then to an action, such as registering, making an enquiry, or buying a product.",
          "Not every customer follows the same path. Useful content and clear navigation help people find information and decide what to do next."
        ]
      },
      {
        heading: "Measure performance",
        paragraphs: [
          "Analytics help marketers understand whether their activities are achieving their goals. The right metric depends on the objective: reach, engagement, leads, and sales measure different outcomes."
        ],
        bullets: [
          "Impressions: how often content is displayed.",
          "Click-through rate: the proportion of impressions that generate clicks.",
          "Conversion rate: the proportion of relevant visitors who complete a desired action.",
          "Organic traffic: visits from unpaid search results."
        ]
      }
    ],
    takeaways: [
      "Digital marketing uses multiple online channels to reach and serve audiences.",
      "SEO, content, social media, email, and advertising have different roles.",
      "Choose performance metrics that match your marketing objective."
    ],
    related: ["artificial-intelligence", "entrepreneurship", "financial-literacy"]
  },

  "critical-thinking": {
    title: "A Practical Guide to Critical Thinking",
    category: "Education",
    readTime: 5,
    level: "Intermediate",
    icon: "◇",
    intro:
      "Critical thinking means examining information carefully before accepting a claim or making a decision. It involves asking questions, checking evidence, identifying assumptions, and considering alternative explanations.",
    sections: [
      {
        heading: "Separate claims from evidence",
        paragraphs: [
          "A claim is something someone says is true. Evidence is the information used to support it. A confident statement or a large number of likes does not automatically make a claim reliable.",
          "Ask where the information came from, whether the source has relevant expertise, and whether independent sources support the same conclusion."
        ]
      },
      {
        heading: "Recognize assumptions and bias",
        paragraphs: [
          "Assumptions are ideas accepted without enough examination. Bias can influence which information people notice, how they interpret it, and which conclusions they prefer.",
          "Consider whether you are looking only for evidence that agrees with what you already believe. Ask what evidence could change your mind."
        ]
      },
      {
        heading: "Make a reasoned decision",
        paragraphs: [
          "Good decisions compare possible options against clear criteria. Consider the quality of available evidence, possible risks, alternatives, and what remains uncertain.",
          "Critical thinking does not mean doubting everything. It means matching your confidence to the strength of the evidence and being willing to revise a conclusion when new information appears."
        ]
      }
    ],
    takeaways: [
      "Distinguish a claim from the evidence offered to support it.",
      "Check sources and consider explanations beyond your first impression.",
      "Stay open to updating your view when stronger evidence appears."
    ],
    related: ["human-brain", "artificial-intelligence", "communication-skills"]
  },

  "renewable-energy": {
    title: "Renewable Energy Made Simple",
    category: "Science",
    readTime: 6,
    level: "Beginner",
    icon: "☼",
    intro:
      "Renewable energy comes from sources that naturally replenish on human timescales, such as sunlight, wind, moving water, and geothermal heat. It can help reduce dependence on fossil fuels when developed and managed appropriately.",
    sections: [
      {
        heading: "Types of renewable energy",
        paragraphs: [
          "Solar panels convert sunlight into electricity, while solar thermal technologies use sunlight as heat. Wind turbines convert the movement of air into electrical power.",
          "Hydropower uses moving water, geothermal systems use heat from within Earth, and some bioenergy systems use organic material as a fuel."
        ]
      },
      {
        heading: "Why does renewable energy matter?",
        paragraphs: [
          "Renewable electricity can reduce greenhouse gas emissions compared with electricity generated from fossil fuels. The full environmental impact depends on manufacturing, construction, operation, and disposal.",
          "Renewable energy can also diversify energy supplies, but projects must consider land, water, habitats, communities, and local needs."
        ]
      },
      {
        heading: "Challenges and solutions",
        paragraphs: [
          "Sunlight and wind vary with weather and time. Power grids therefore need suitable planning, flexible generation, energy storage, and ways to move electricity where it is needed.",
          "Better grid infrastructure, a mix of energy technologies, and more efficient energy use can help make electricity systems more reliable as renewable sources expand."
        ]
      }
    ],
    takeaways: [
      "Solar, wind, hydropower, and geothermal energy are renewable sources.",
      "Renewables can reduce emissions, depending on how energy systems are built and operated.",
      "Storage, grid planning, and energy efficiency help address variability."
    ],
    related: ["climate-change", "critical-thinking", "artificial-intelligence"]
  },

  "communication-skills": {
    title: "The Art of Effective Communication",
    category: "Personal Growth",
    readTime: 4,
    level: "Beginner",
    icon: "⌁",
    intro:
      "Effective communication means sharing information in a way another person can understand. It involves expressing ideas clearly, listening carefully, and adjusting your message to the audience and situation.",
    sections: [
      {
        heading: "Speak and write clearly",
        paragraphs: [
          "Begin with the main point. Organize supporting details in a logical order and use language suited to the person receiving the message.",
          "Specific examples can make abstract ideas easier to understand. Before sending a message, check whether the purpose and any requested action are clear."
        ]
      },
      {
        heading: "Listen to understand",
        paragraphs: [
          "Listening involves paying attention to both the message and its context. Avoid planning your reply while the other person is still explaining their point.",
          "Ask clarifying questions and briefly summarize what you heard. This gives the other person a chance to correct misunderstandings before they grow."
        ]
      },
      {
        heading: "Communicate with empathy",
        paragraphs: [
          "People may interpret the same words differently because of their experiences, expectations, or circumstances. Consider the other person's perspective without assuming you know exactly how they feel.",
          "When disagreements happen, focus on the issue rather than attacking the person. Calm questions, respectful language, and specific examples make problem-solving easier."
        ]
      }
    ],
    takeaways: [
      "Put the main message first and support it with clear details.",
      "Active listening helps prevent misunderstandings.",
      "Respectful communication makes disagreement more productive."
    ],
    related: ["critical-thinking", "human-brain", "entrepreneurship"]
  },

  entrepreneurship: {
    title: "How to Turn an Idea into a Business",
    category: "Business",
    readTime: 9,
    level: "Intermediate",
    icon: "↗",
    intro:
      "Entrepreneurship involves identifying a problem or opportunity and developing a product or service that creates value. A promising idea becomes a stronger business proposition when it is tested with real customers.",
    sections: [
      {
        heading: "Start with a problem",
        paragraphs: [
          "A business idea should address a need people actually have. Talk to potential customers, observe their difficulties, and examine how they currently solve the problem.",
          "Avoid assuming that everyone will want the product. Identify a specific audience and learn what matters most to that group."
        ]
      },
      {
        heading: "Test before investing heavily",
        paragraphs: [
          "Create a simple version of the product or service, often called a minimum viable product. Its purpose is to test key assumptions with as little unnecessary effort as possible.",
          "Collect feedback, observe how people use it, and improve the concept. Positive comments alone are not proof of demand; actual use, willingness to pay, and repeat interest can provide stronger signals."
        ]
      },
      {
        heading: "Plan the business model",
        paragraphs: [
          "A business model explains who the customers are, what value they receive, how the business reaches them, and how it earns revenue.",
          "Estimate costs, pricing, expected sales, and the resources required to operate. A basic plan helps identify financial risks before committing large amounts of money."
        ],
        bullets: [
          "Define your target customer.",
          "Identify what makes your offer useful or different.",
          "Estimate startup and operating costs.",
          "Test customer interest and refine your approach."
        ]
      }
    ],
    takeaways: [
      "Build around a real customer problem.",
      "Test assumptions with a simple early version before scaling.",
      "Understand costs, pricing, customer needs, and revenue."
    ],
    related: ["financial-literacy", "digital-marketing", "communication-skills"]
  }
};

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const article = id ? articles[id] : undefined;

  if (!article) {
    return (
      <div className="article-page">
        <section className="article-not-found">
          <span aria-hidden="true">⌕</span>
          <h1>Article not found</h1>
          <p>
            We could not find that topic. Explore our available topics to
            discover something new.
          </p>
          <Link className="article-primary-link" to="/explore">
            Back to Explore <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="article-page">
      <div className="article-breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/explore">Explore</Link>
        <span aria-hidden="true">/</span>
        <span className="article-breadcrumb-current">
          {article.category}
        </span>
      </div>

      <header className="article-hero">
        <div className="article-hero-copy">
          <span className="article-eyebrow">
            {article.category.toUpperCase()} · A NSEEREAD GUIDE
          </span>

          <h1>{article.title}</h1>

          <p className="article-intro">{article.intro}</p>

          <div className="article-metadata">
            <span>{article.readTime} min read</span>
            <span className="article-meta-dot" aria-hidden="true" />
            <span>{article.level}</span>
            <span className="article-meta-dot" aria-hidden="true" />
            <span>Key takeaways included</span>
          </div>
        </div>

        <div className="article-hero-art" aria-hidden="true">
          <div className="article-art-ring article-art-ring-one" />
          <div className="article-art-ring article-art-ring-two" />
          <span>{article.icon}</span>
          <small>LEARN · UNDERSTAND</small>
        </div>
      </header>

      <main className="article-reading-layout">
        <article className="article-body">
          <div className="article-reading-note">
            <span aria-hidden="true">✳</span>
            <p>
              <strong>Start with the idea.</strong> Each section breaks the
              topic into clear, manageable concepts.
            </p>
          </div>

          {article.sections.map((section, index) => (
            <section className="article-section" key={section.heading}>
              <div className="article-section-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="article-section-content">
                <h2>{section.heading}</h2>

                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <section className="article-takeaways">
            <span className="article-eyebrow">REMEMBER THE ESSENTIALS</span>
            <h2>Key takeaways</h2>

            <ul>
              {article.takeaways.map((takeaway) => (
                <li key={takeaway}>
                  <span aria-hidden="true">✓</span>
                  <p>{takeaway}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className="article-end-note">
            <span aria-hidden="true">✳</span>
            <p>Learn more. Read less. Understand better.</p>
          </div>
        </article>

        <aside className="article-sidebar">
          <div className="article-sidebar-card">
            <span className="article-eyebrow">YOUR LEARNING PATH</span>
            <h3>Make your next discovery.</h3>
            <p>
              Continue exploring ideas, build connections, and keep learning
              at your own pace.
            </p>
            <Link to="/explore" className="article-sidebar-link">
              Explore more topics <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="article-related">
            <span className="article-eyebrow">KEEP EXPLORING</span>
            <h3>Related topics</h3>

            {article.related.map((relatedId) => {
              const relatedArticle = articles[relatedId];

              if (!relatedArticle) {
                return null;
              }

              return (
                <Link
                  to={`/article/${relatedId}`}
                  className="article-related-link"
                  key={relatedId}
                >
                  <span
                    className="article-related-icon"
                    aria-hidden="true"
                  >
                    {relatedArticle.icon}
                  </span>

                  <span className="article-related-text">
                    <strong>{relatedArticle.title}</strong>
                    <small>
                      {relatedArticle.readTime} min read
                    </small>
                  </span>

                  <span className="article-related-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              );
            })}
          </div>
        </aside>
      </main>

      <footer className="article-footer">
        <Link to="/explore" className="article-back-link">
          <span aria-hidden="true">←</span> Back to Explore
        </Link>

        <span>Curiosity leads to understanding.</span>
      </footer>
    </div>
  );
}
