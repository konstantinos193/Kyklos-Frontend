# 🤝 Contributing to ΚΥΚΛΟΣ Εκπαίδευση

Thank you for your interest in contributing to the ΚΥΚΛΟΣ Εκπαίδευση frontend! This document provides guidelines and information for contributors.

## 📋 Table of Contents
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Pull Request Process](#pull-request-process)
- [Code Review Process](#code-review-process)

## 🚀 Getting Started

### Prerequisites
- Node.js 20.9.0 or higher
- npm 9.0.0 or higher
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork the repository on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Kyklos-Frontend.git
   cd Kyklos-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Coding Standards

### Code Style
- Use TypeScript for all new code
- Follow the existing code formatting (Prettier is configured)
- Use meaningful variable and function names
- Add comments for complex logic

### Component Guidelines
- Use functional components with hooks
- Follow the existing component structure
- Use proper TypeScript types
- Keep components small and focused

### File Naming
- Use kebab-case for file names
- Use descriptive names
- Group related files in appropriate directories

## 🔄 Submitting Changes

### Before Submitting
1. **Run tests and linting**
   ```bash
   npm run lint
   npm run type-check
   ```

2. **Format your code**
   ```bash
   npm run format
   ```

3. **Test your changes**
   - Manually test the functionality
   - Test on different screen sizes
   - Test accessibility

### Commit Messages
Use conventional commit messages:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Example:
```
feat: add responsive navigation menu
fix: resolve mobile layout issue
docs: update API documentation
```

## 🔄 Pull Request Process

1. **Update Documentation**
   - Update README.md if needed
   - Add comments to complex code
   - Update component documentation

2. **Create Pull Request**
   - Use the pull request template
   - Link related issues
   - Add screenshots for UI changes

3. **Code Review**
   - Respond to review comments promptly
   - Make requested changes
   - Keep the PR updated

## 📋 Code Review Process

### Review Guidelines
- Code follows project standards
- Functionality works as expected
- No breaking changes
- Tests are included
- Documentation is updated

### Review Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Code is properly commented
- [ ] Manual testing completed
- [ ] Automated tests pass

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

## ✨ Feature Requests

When requesting features, please include:
- Clear description of the feature
- Problem statement
- Proposed solution
- Acceptance criteria

## 📞 Getting Help

If you need help:
- Create an issue with the `question` label
- Join our discussions
- Check existing documentation

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to ΚΥΚΛΟΣ Εκπαίδευση! 🎓
