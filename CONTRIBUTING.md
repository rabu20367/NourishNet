# Contributing to NourishNet 🌱

Thank you for considering contributing to NourishNet! We appreciate your time and effort in helping us build a better platform for food donation and redistribution.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Code Style](#-code-style)
- [Commit Message Guidelines](#-commit-message-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Reporting Bugs](#-reporting-bugs)
- [Feature Requests](#-feature-requests)
- [Code Review Process](#-code-review-process)
- [Community](#-community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🌟 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** to your local machine
   ```bash
   git clone https://github.com/your-username/NourishNet.git
   cd NourishNet
   ```
3. **Set up the development environment**
   ```bash
   # Install dependencies
   npm install
   
   # Set up environment variables
   cp .env.example .env.local
   ```
4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

1. **Create a new branch** for your feature or bugfix
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number-description
   ```

2. **Make your changes** following the code style guidelines

3. **Run tests** to ensure nothing is broken
   ```bash
   npm test
   ```

4. **Stage your changes**
   ```bash
   git add .
   ```

5. **Commit your changes** following the commit message guidelines
   ```bash
   git commit -m "feat: add new feature"
   ```

6. **Push your changes** to your fork
   ```bash
   git push origin your-branch-name
   ```

7. **Open a Pull Request** from your fork to the main repository

## 🎨 Code Style

- Follow the [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- Use [Prettier](https://prettier.io/) for code formatting
- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
- Document all new features and components
- Write tests for new functionality

### Linting and Formatting

We use ESLint and Prettier to maintain code quality. Before committing, run:

```bash
# Check for linting errors
npm run lint

# Automatically fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 📝 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for our commit messages. The format is:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools
- `ci`: Changes to CI configuration files and scripts
- `revert`: Revert a previous commit

### Examples:

```
feat(auth): add Google OAuth authentication
fix(ui): resolve button alignment issue in mobile view
docs: update README with new setup instructions
```

## 🔄 Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations, and container parameters.
3. Increase the version numbers in any example files and the README.md to the new version that this Pull Request would represent.
4. You may merge the Pull Request once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the reviewer to merge it for you.

## 🐛 Reporting Bugs

Before submitting a bug report, please check if the issue has already been reported.

### How to Report a Bug

1. **Use the GitHub issue search** to check if the issue has already been reported.
2. **Check if the issue has been fixed** in the latest version.
3. **Isolate the problem** to ensure it's not caused by a plugin or your environment.

### Bug Report Template

```markdown
## Describe the bug
A clear and concise description of what the bug is.

## To Reproduce
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected behavior
A clear and concise description of what you expected to happen.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Environment (please complete the following information):
- OS: [e.g. iOS, Windows, Linux]
- Browser [e.g. Chrome, Safari]
- Version [e.g. 22]

## Additional context
Add any other context about the problem here.
```

## ✨ Feature Requests

We welcome feature requests. Before submitting a new feature request, please check if a similar feature has already been requested.

### Feature Request Template

```markdown
## Is your feature request related to a problem? Please describe.
A clear and concise description of what the problem is.

## Describe the solution you'd like
A clear and concise description of what you want to happen.

## Describe alternatives you've considered
A clear and concise description of any alternative solutions or features you've considered.

## Additional context
Add any other context or screenshots about the feature request here.
```

## 🔍 Code Review Process

1. A core team member will review your PR and provide feedback.
2. The PR may go through several iterations of feedback and changes.
3. Once approved, a core team member will merge your PR.

## 👥 Community

Join our community to ask questions and discuss ideas:

- [GitHub Discussions](https://github.com/rabu20367/NourishNet/discussions)
- [Discord/Slack Channel]() (if applicable)
- [Twitter]() (if applicable)

## 🙏 Thank You!

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to contribute.
