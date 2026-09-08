# My Coding Journey — Interactive Developer Journal & Progress Dashboard

> *"A visual story of how I started coding, what I've learned, what I've built, what I've achieved, how I've improved, and where I'm going next."*

This is **NOT a resume or traditional CV**. It is a developer diary, progress dashboard, and achievement tracker built with **Python, Flask, HTML5, CSS3, and Vanilla JavaScript** with zero front-end framework bloat.

---

## 🚀 Quick Start & Running Instructions

### 1. Requirements
- Python 3.9+
- Flask (>= 3.0.0)

### 2. Installation
```bash
# Clone or navigate to the project directory
cd my-coding-journey

# (Optional) Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Run the Application
```bash
# Start the Flask web server
python3 app.py
```
Open your browser and navigate to:
```
http://localhost:3000
```
*(Or `http://127.0.0.1:3000`)*

---

## 🎨 Design System & Aesthetic
- **Theme**: Premium Dark Developer Aesthetic (refined slate/navy canvas, glassmorphism panels, crisp typography).
- **Colors**: Deep `#090d16` background, glowing `#10b981` (Emerald) and `#06b6d4` (Cyan) accents, amber and ruby status badges.
- **Typography**: `Plus Jakarta Sans` for titles and display; `JetBrains Mono` for code snippets, metrics, and terminal status indicators.
- **Visuals**: Chart.js for data-driven trajectory graphs, Font Awesome 6 icons, responsive navigation with mobile drawer, and animated modal deep dives.

---

## 🧭 Pages & Site Structure

| Route | Page | Purpose |
|---|---|---|
| `/` | **Home** | Hero, Quick Stats counter, interactive mini timeline preview, Right Now status, Featured Projects, Before vs. Now preview, Roadmap teaser |
| `/journey` | **The Journey** | Full chronological milestones timeline with year/category filtering, expandable technical breakdowns, and reflections |
| `/achievements` | **Achievements** | Trophy room of coding breakthroughs, certifications, hackathons, and contest benchmarks with category filters |
| `/skills` | **Skills & Progression** | Deep dive into technical strengths, mastery progression, tools used, and real-world evidence |
| `/projects` | **Things I've Built** | The narrative behind key projects: the problem space, architectural challenges, worst bugs solved, and lessons learned |
| `/progress` | **How I've Grown** | Visual progress charts (problems solved, shipping velocity, time allocation, tech categories) + interactive Before vs. Now comparison |
| `/lessons` | **Lessons & Failures** | Authentic retrospectives on what went wrong: *What Happened*, *What I Learned*, and *What I'd Do Differently Now* |
| `/roadmap` | **The Roadmap** | Interactive trajectory pipeline marking completed stages, current active focus (`YOU ARE HERE ●`), and future horizons |

---

## 🛠️ How to Customize Your Data

All personal coding journey data is decoupled into clean JSON files inside the `data/` folder. You never have to touch HTML templates to update your story!

### 1. `data/milestones.json`
Contains your chronological journey milestones. Each entry has:
- `id`: Unique identifier (e.g. `m1`, `m2`)
- `year`: e.g. `2024`, `2025`
- `date`: e.g. `January 2024`
- `title`: Milestone name (e.g. `My First Line of Code: "Hello, World!"`)
- `tagline`: Short tagline
- `description`: The story behind this milestone
- `category`: `Origins`, `Fundamentals`, `Full-Stack`, `Competitive`, `Systems`
- `status`: `completed` or `current`
- `tech`: Array of technologies touched (e.g. `["Python", "VS Code"]`)
- `highlight_achievement`: What you achieved
- `highlight_learned`: What mental shift happened

### 2. `data/projects.json`
Contains your project stories. Each entry has:
- `title`, `tagline`, `date`, `badge`
- `summary`: High-level explanation
- `problem_solved`: Why this project was built
- `key_challenges`: The hardest technical problem faced
- `what_i_learned`: New principles learned
- `how_i_improved`: Concrete coding habits upgraded
- `tech_stack`: Array of technologies
- `github_url`, `live_url`

### 3. `data/achievements.json`
Contains breakthroughs, contests, streaks, and milestones with category filters (`streaks`, `contests`, `projects`, `certs`).

### 4. `data/skills.json`
Contains skills with `level` (`Proficient`, `Working Knowledge`, `Exploring`), `years_active`, `summary`, `use_cases`, and `core_strengths` with real evidence.

### 5. `data/progress.json`
Configures:
- `quick_stats`: Projects built, problems solved, hours logged, streak days
- `currently`: What you are learning, building, improving, and your next goal
- `charts`: Labels and data points for Chart.js graphs
- `before_vs_now`: Side-by-side dimensions (e.g., Debugging, Architecture, Code Style)

### 6. `data/lessons.json`
Contains transparent retrospectives on bugs, failures, and mistakes:
- `what_happened`
- `what_learned`
- `what_differently`

---

## 📦 Tech Stack
- **Backend**: Python 3, Flask
- **Templating**: Jinja2 (`templates/`)
- **Styling**: Vanilla CSS3 with CSS variables (`static/css/style.css`)
- **Scripting**: Vanilla JavaScript (`static/js/main.js`)
- **Charts**: Chart.js 4 (loaded via CDN)
- **Icons**: Font Awesome 6 (loaded via CDN)
- **Fonts**: Google Fonts (Plus Jakarta Sans & JetBrains Mono)
