# CyberGym Documentation

This directory contains the Docusaurus documentation for the CyberGym project.

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

## 📦 Deployment

Documentation is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

If you need to deploy manually:

```bash
# Build the documentation
npm run build

# Deploy to GitHub Pages (requires GIT_USER)
GIT_USER=<your-github-username> npm run deploy
```

## 🔧 Configuration

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to **Pages** section
3. Under **Source**, select **GitHub Actions**

### Update Configuration

Edit `docusaurus.config.js` and replace:
- `your-username` with your GitHub username
- `cybergym-implementation` with your repository name (if different)

```javascript
url: 'https://your-username.github.io',
baseUrl: '/cybergym-implementation/',
organizationName: 'your-username',
projectName: 'cybergym-implementation',
```

## 📝 Writing Documentation

Documentation files are in Markdown format and located in:
- `docs/` - Main documentation
- `blog/` - Blog posts
- `src/pages/` - Custom pages

### Adding a New Doc

1. Create a new `.md` file in the appropriate directory
2. Add frontmatter:
```markdown
---
sidebar_position: 1
title: Your Title
---
```
3. Write your content in Markdown

### Adding a Blog Post

Create a file in `blog/` with the naming format:
- `YYYY-MM-DD-post-name.md` or
- `YYYY-MM-DD-post-name/index.md` (for posts with assets)

## 🎨 Customization

- `src/css/custom.css` - Custom styles
- `static/` - Static assets (images, fonts, etc.)
- `sidebars.js` - Sidebar configuration

## 🔄 GitHub Actions

The documentation uses GitHub Actions for:
- **Automatic deployment** on push to `main`
- **PR preview builds** for documentation changes
- **Broken link checking**

Workflows are located in `.github/workflows/`:
- `deploy-docs.yml` - Deploys to GitHub Pages
- `test-docs.yml` - Tests PR builds