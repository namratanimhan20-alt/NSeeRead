import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(process.cwd(), "server/.env") });

const PORT = Number(process.env.API_PORT || 4000);
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.error("ERROR: Configure a JWT_SECRET of at least 32 characters in server/.env");
  process.exit(1);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME || "nseeread_db",
  waitForConnections: true,
  connectionLimit: 10,
  charset: "utf8mb4",
});

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
}));

const USER_FIELDS = `
  id, name, email, password_hash,
  learning_goal, about, interests_json, created_at
`;

function normalizeName(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function validEmail(email) {
  return email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function publicUser(row) {
  if (!row) return null;

  let interests = [];

  try {
    const parsed = JSON.parse(row.interests_json || "[]");
    if (Array.isArray(parsed)) {
      interests = parsed.filter(item => typeof item === "string");
    }
  } catch {
    interests = [];
  }

  return {
    id: Number(row.id),
    name: row.name,
    email: row.email,
    learningGoal: row.learning_goal || "",
    about: row.about || "",
    interests,
    createdAt: row.created_at,
  };
}

async function findUserById(id) {
  const [rows] = await pool.execute(
    `SELECT ${USER_FIELDS} FROM users WHERE id = ? LIMIT 1`,
    [Number(id)]
  );

  return rows[0] || null;
}

function readCookie(req, name) {
  for (const part of (req.headers.cookie || "").split(";")) {
    const index = part.indexOf("=");
    if (index < 0) continue;

    if (part.slice(0, index).trim() === name) {
      try {
        return decodeURIComponent(part.slice(index + 1).trim());
      } catch {
        return null;
      }
    }
  }

  return null;
}

function setLoginCookie(res, userId, rememberMe = true) {
  const maxAge = rememberMe
    ? 30 * 24 * 60 * 60
    : 24 * 60 * 60;

  const token = jwt.sign(
    { sub: String(userId) },
    JWT_SECRET,
    { expiresIn: maxAge }
  );

  const secure = process.env.NODE_ENV === "production"
    ? "; Secure"
    : "";

  res.setHeader(
    "Set-Cookie",
    `nseeread_token=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure}`
  );
}

function clearLoginCookie(res) {
  const secure = process.env.NODE_ENV === "production"
    ? "; Secure"
    : "";

  res.setHeader(
    "Set-Cookie",
    `nseeread_token=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`
  );
}

async function getLoggedInUser(req) {
  const token = readCookie(req, "nseeread_token");
  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (typeof payload === "string" || !payload.sub) return null;

    return publicUser(await findUserById(payload.sub));
  } catch {
    return null;
  }
}

async function requireUser(req, res) {
  const user = await getLoggedInUser(req);

  if (!user) {
    res.status(401).json({ message: "Please log in to continue." });
    return null;
  }

  return user;
}

// Check that the API and MySQL are available.
app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, database: "connected" });
  } catch {
    res.status(503).json({
      ok: false,
      message: "The MySQL database is not available.",
    });
  }
});

// CREATE ACCOUNT
app.post("/api/auth/signup", async (req, res) => {
  const name = normalizeName(req.body?.name);
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || "");

  if (name.length < 2 || name.length > 80) {
    return res.status(400).json({
      message: "Enter a name between 2 and 80 characters.",
    });
  }

  if (!validEmail(email)) {
    return res.status(400).json({
      message: "Enter a valid email address.",
    });
  }

  if (password.length < 8 || password.length > 128) {
    return res.status(400).json({
      message: "Password must contain 8 to 128 characters.",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await pool.execute(
      `INSERT INTO users
       (name, email, password_hash, interests_json)
       VALUES (?, ?, ?, ?)`,
      [name, email, passwordHash, "[]"]
    );

    const user = await findUserById(result.insertId);
    setLoginCookie(res, user.id, true);

    return res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "An account with this email already exists. Please log in.",
      });
    }

    console.error("Signup error:", error.message);

    return res.status(500).json({
      message: "Could not create your account. Please try again.",
    });
  }
});

// LOG IN
app.post("/api/auth/login", async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || "");
  const rememberMe = Boolean(req.body?.rememberMe);

  if (!validEmail(email) || !password) {
    return res.status(400).json({
      message: "Enter your email address and password.",
    });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT ${USER_FIELDS} FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    const row = rows[0];

    if (!row || !(await bcrypt.compare(password, row.password_hash))) {
      return res.status(401).json({
        message: "Incorrect email or password.",
      });
    }

    setLoginCookie(res, row.id, rememberMe);

    return res.json({ user: publicUser(row) });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Could not log in. Please try again.",
    });
  }
});

// RESTORE LOGIN AFTER REFRESH
app.get("/api/auth/me", async (req, res) => {
  try {
    const user = await getLoggedInUser(req);

    if (!user) {
      return res.status(401).json({ message: "Not logged in." });
    }

    return res.json({ user });
  } catch (error) {
    console.error("Session error:", error.message);

    return res.status(500).json({
      message: "Could not check your login session.",
    });
  }
});

// LOG OUT
app.post("/api/auth/logout", (_req, res) => {
  clearLoginCookie(res);
  return res.json({ message: "Logged out." });
});

// LOAD PROFILE
app.get("/api/profile", async (req, res) => {
  try {
    const user = await requireUser(req, res);
    if (!user) return;

    return res.json({ user });
  } catch (error) {
    console.error("Profile loading error:", error.message);

    return res.status(500).json({
      message: "Could not load your profile.",
    });
  }
});

// SAVE PROFILE
app.put("/api/profile", async (req, res) => {
  try {
    const user = await requireUser(req, res);
    if (!user) return;

    const name = normalizeName(req.body?.name);
    const email = normalizeEmail(req.body?.email);
    const learningGoal = String(req.body?.learningGoal || "")
      .trim().slice(0, 80);
    const about = String(req.body?.about || "")
      .trim().slice(0, 500);

    const interests = Array.isArray(req.body?.interests)
      ? [...new Set(
          req.body.interests
            .filter(item => typeof item === "string")
            .map(item => item.trim())
            .filter(item => item.length > 0 && item.length <= 80)
        )].slice(0, 20)
      : [];

    if (name.length < 2 || name.length > 80) {
      return res.status(400).json({
        message: "Enter a name between 2 and 80 characters.",
      });
    }

    if (!validEmail(email)) {
      return res.status(400).json({
        message: "Enter a valid email address.",
      });
    }

    await pool.execute(
      `UPDATE users
       SET name = ?, email = ?, learning_goal = ?,
           about = ?, interests_json = ?
       WHERE id = ?`,
      [
        name,
        email,
        learningGoal,
        about,
        JSON.stringify(interests),
        user.id,
      ]
    );

    const updatedUser = await findUserById(user.id);

    return res.json({ user: publicUser(updatedUser) });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "That email is already used by another account.",
      });
    }

    console.error("Profile saving error:", error.message);

    return res.status(500).json({
      message: "Could not save your profile. Please try again.",
    });
  }
});


// CHANGE PASSWORD
app.post("/api/auth/change-password", async (req, res) => {
  try {
    const user = await requireUser(req, res);
    if (!user) return;

    const currentPassword = String(req.body?.currentPassword || "");
    const newPassword = String(req.body?.newPassword || "");

    if (!currentPassword) {
      return res.status(400).json({
        message: "Enter your current password.",
      });
    }

    if (newPassword.length < 8 || newPassword.length > 128) {
      return res.status(400).json({
        message: "Your new password must contain 8 to 128 characters.",
      });
    }

    const [rows] = await pool.execute(
      "SELECT id, password_hash FROM users WHERE id = ? LIMIT 1",
      [user.id]
    );

    const account = rows[0];

    if (!account || !(await bcrypt.compare(currentPassword, account.password_hash))) {
      return res.status(401).json({
        message: "Your current password is incorrect.",
      });
    }

    if (await bcrypt.compare(newPassword, account.password_hash)) {
      return res.status(400).json({
        message: "Choose a new password different from your current password.",
      });
    }

    const newHash = await bcrypt.hash(newPassword, 12);

    await pool.execute(
      "UPDATE users SET password_hash = ? WHERE id = ?",
      [newHash, user.id]
    );

    return res.json({
      message: "Your password has been changed successfully.",
    });
  } catch (error) {
    console.error("Password change failed:", error.message);

    return res.status(500).json({
      message: "Could not change your password. Please try again.",
    });
  }
});

// Start only after confirming the MySQL connection works.
try {
  await pool.query("SELECT 1");

  app.listen(PORT, "127.0.0.1", () => {
    console.log(`NSeeRead API: http://127.0.0.1:${PORT}`);
    console.log("MySQL connected to database: nseeread_db");
  });
} catch (error) {
  console.error("Could not connect to MySQL.");
  console.error("Check that MySQL Server is running and server/.env is correct.");
  console.error(error.message);
  process.exit(1);
}

