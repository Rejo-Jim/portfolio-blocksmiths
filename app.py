"""
My Coding Journey - Flask Application
An interactive coding journey, developer diary, progress dashboard, and achievement tracker.
"""

import json
import os
from flask import Flask, render_template, jsonify, request, abort

app = Flask(__name__)

# Base directory for data files
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')


def load_json(filename):
    """Safely load JSON data from data directory."""
    file_path = os.path.join(DATA_DIR, filename)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filename}: {e}")
        return [] if filename.endswith('s.json') else {}


@app.context_processor
def inject_global_data():
    """Inject common metadata and current status into all templates."""
    progress_data = load_json('progress.json')
    return {
        'site_title': 'My Coding Journey',
        'developer_name': 'Alex Rivera',
        'current_status': progress_data.get('currently', {}),
        'quick_stats': progress_data.get('quick_stats', {}),
        'version': '2026.1',
        'commit_msg': 'another step forward'
    }


@app.route('/')
def home():
    """Home Page: Hero, Quick Stats, Featured Journey, Projects preview, Currently, and Roadmap."""
    milestones = load_json('milestones.json')
    achievements = load_json('achievements.json')
    projects = load_json('projects.json')
    skills_data = load_json('skills.json')
    progress_data = load_json('progress.json')
    lessons = load_json('lessons.json')

    # Get featured/highlight items
    featured_projects = [p for p in projects if p.get('badge') == 'Featured Project' or p.get('badge') == 'Hackathon 2nd Place'][:3]
    recent_achievements = achievements[:4]
    recent_milestones = milestones[:5]

    return render_template(
        'index.html',
        active_page='home',
        milestones=milestones,
        recent_milestones=recent_milestones,
        featured_projects=featured_projects,
        projects=projects,
        achievements=achievements,
        recent_achievements=recent_achievements,
        skills=skills_data.get('skills', []),
        strengths=skills_data.get('strengths', []),
        progress=progress_data,
        before_vs_now=progress_data.get('before_vs_now', []),
        roadmap=progress_data.get('roadmap', []),
        lessons=lessons[:3]
    )


@app.route('/journey')
def journey():
    """The Journey Page: Interactive vertical chronological timeline with deep-dive stories."""
    milestones = load_json('milestones.json')
    return render_template(
        'journey.html',
        active_page='journey',
        milestones=milestones
    )


@app.route('/achievements')
def achievements():
    """Achievements Page: Category filters, badges, evidence, and verifiable proof."""
    achievements_list = load_json('achievements.json')
    categories = ['all', 'competitions', 'hackathons', 'projects', 'certifications', 'coding_platforms', 'milestones']
    return render_template(
        'achievements.html',
        active_page='achievements',
        achievements=achievements_list,
        categories=categories
    )


@app.route('/skills')
def skills():
    """Skills Page: Genuine progression, capabilities, and strong points with evidence."""
    skills_data = load_json('skills.json')
    return render_template(
        'skills.html',
        active_page='skills',
        skills=skills_data.get('skills', []),
        strengths=skills_data.get('strengths', [])
    )


@app.route('/projects')
def projects():
    """Projects Page: Things I've built, problem/solution stories, lessons, and tech filters."""
    projects_list = load_json('projects.json')
    
    # Collect unique tech tags for filter
    all_tags = set()
    for p in projects_list:
        for tag in p.get('tech_tags', []):
            all_tags.add(tag)

    return render_template(
        'projects.html',
        active_page='projects',
        projects=projects_list,
        tags=sorted(list(all_tags))
    )


@app.route('/progress')
def progress():
    """Progress Analysis Page: Chart.js visualizations, growth metrics, and Before vs Now."""
    progress_data = load_json('progress.json')
    return render_template(
        'progress.html',
        active_page='progress',
        progress=progress_data,
        charts=progress_data.get('charts', {}),
        before_vs_now=progress_data.get('before_vs_now', []),
        roadmap=progress_data.get('roadmap', [])
    )


@app.route('/lessons')
def lessons():
    """Lessons & Failures Page: Things that didn't go as planned, bugs, and growth mindset."""
    lessons_list = load_json('lessons.json')
    return render_template(
        'lessons.html',
        active_page='lessons',
        lessons=lessons_list
    )


@app.route('/roadmap')
def roadmap():
    """Roadmap Page: Visual progression from first day to current status and future milestones."""
    progress_data = load_json('progress.json')
    return render_template(
        'roadmap.html',
        active_page='roadmap',
        roadmap=progress_data.get('roadmap', []),
        currently=progress_data.get('currently', {})
    )


# --- JSON API Endpoints for dynamic client-side filtering and modals ---

@app.route('/api/milestones')
def api_milestones():
    return jsonify(load_json('milestones.json'))


@app.route('/api/achievements')
def api_achievements():
    return jsonify(load_json('achievements.json'))


@app.route('/api/skills')
def api_skills():
    return jsonify(load_json('skills.json'))


@app.route('/api/projects')
def api_projects():
    return jsonify(load_json('projects.json'))


@app.route('/api/progress')
def api_progress():
    return jsonify(load_json('progress.json'))


@app.route('/api/lessons')
def api_lessons():
    return jsonify(load_json('lessons.json'))


if __name__ == '__main__':
    # Bind to 0.0.0.0 and port 3000 as required by the AI Studio environment
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port, debug=True)
