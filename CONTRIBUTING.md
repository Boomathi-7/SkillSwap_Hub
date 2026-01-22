# Contributing to Skill Swap Hub

Thank you for your interest in contributing to Skill Swap Hub! We welcome contributions from everyone. This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Be constructive in feedback
- Focus on ideas, not individuals

## How to Contribute

### Reporting Bugs

1. Check existing issues to avoid duplicates
2. Create a new issue with:
   - Clear title describing the bug
   - Detailed description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, browser, Node version)

### Suggesting Enhancements

1. Check existing issues and discussions
2. Create a new issue with:
   - Clear title describing the feature
   - Detailed description of the enhancement
   - Use cases and benefits
   - Possible implementation approach

### Submitting Changes

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. Make your changes:
   - Follow the existing code style
   - Write clear commit messages
   - Keep commits atomic and logical
   - Add comments for complex logic

4. Test your changes:
   ```bash
   # Backend tests
   cd backend
   npm test

   # Frontend tests
   cd frontend
   npm test
   ```

5. Commit and push:
   ```bash
   git add .
   git commit -m "Add: Clear description of your changes"
   git push origin feature/YourFeatureName
   ```

6. Open a Pull Request:
   - Use a clear title
   - Describe what your PR does
   - Reference related issues
   - Include screenshots for UI changes
   - Wait for review and address feedback

## Development Setup

### Prerequisites
- Node.js v14+
- PostgreSQL
- Git

### Local Setup

```bash
# Clone repository
git clone https://github.com/yourusername/skillswaphub.git
cd skillswaphub

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npx prisma migrate dev
npm run dev

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev
```

## Coding Standards

### JavaScript/React

- Use ES6+ syntax
- Use meaningful variable names
- Write comments for complex logic
- Keep functions small and focused
- Use proper error handling

### Example Code Style

```javascript
// Good
const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Bad
const getUser = async (i) => {
  return await prisma.user.findUnique({ where: { id: i } });
};
```

## Commit Message Guidelines

Use clear, descriptive commit messages:

```
[TYPE]: Concise description

More detailed explanation if needed.

Fixes #issueNumber
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat: Add skill matching algorithm`
- `fix: Resolve invite acceptance error`
- `docs: Update README with API documentation`

## Pull Request Guidelines

- One feature/fix per PR
- Keep PRs focused and manageable
- Update tests for any logic changes
- Update documentation if needed
- Rebase on main before submitting
- Respond to review feedback promptly

## File Structure

When adding new features, follow the existing structure:

```
Feature: New API Endpoint
├── backend/src/routes/new.routes.js
├── backend/src/controllers/new.controller.js
├── backend/src/services/new.service.js (if needed)
└── frontend/src/pages/New.jsx (if needed)
```

## Documentation

- Update README.md for user-facing changes
- Add comments for complex code sections
- Document API endpoints
- Update CHANGELOG for notable changes

## Getting Help

- Join our discussions
- Ask questions in issues
- Check existing documentation
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Skill Swap Hub! 🚀
