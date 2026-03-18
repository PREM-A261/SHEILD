# Contributing to Gender Equity Intelligence Platform

Thank you for your interest in contributing to the Gender Equity Intelligence Platform! We welcome contributions from developers, designers, researchers, and gender equality advocates. This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

Please read our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing. We are committed to providing a welcoming and inclusive environment for all contributors.

## How to Contribute

### 1. Report Bugs 🐛

Found a bug? Please create an issue with:
- **Clear Title**: Descriptive bug description
- **Steps to Reproduce**: How to trigger the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What happens instead
- **Environment**: OS, browser, Node/React versions
- **Screenshots**: If applicable

**Example:**
```
Title: Risk map not displaying districts in Chrome
Steps to Reproduce:
1. Navigate to /risk-map
2. Wait for map to load
3. See districts not appearing

Expected: Districts should be visible as circle markers
Actual: Map loads but no markers appear
Environment: Windows 10, Chrome 120, React 19.2.4
```

### 2. Suggest Features & Enhancements 💡

Have an idea? Open an issue with:
- **Use Case**: Why this feature is needed
- **Proposed Solution**: How you envision it working
- **Alternative Approaches**: Other possible implementations
- **Impact**: How this helps the mission of gender equity

**Example:**
```
Title: Add SMS notifications for high-risk districts

Use Case: NGO workers and government officials should be notified when 
a district's risk level changes significantly.

Proposed Solution:
- Add SMS service integration (Twilio or AWS SNS)
- Allow users to subscribe to district alerts
- Send automated alerts when gender risk score changes by >10 points

This would improve responsiveness to emerging gender equity crises.
```

### 3. Create Pull Requests 🚀

#### Before Starting
- Check existing [issues](https://github.com/yourusername/gender-equity-platform/issues) and [pull requests](https://github.com/yourusername/gender-equity-platform/pulls)
- Discuss major changes in an issue first
- Fork the repository

#### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/gender-equity-platform.git
cd gender-equity-platform

# Create feature branch
git checkout -b feature/your-feature-name

# Install dependencies
npm install
cd frontend && npm install && cd ..
cd server && npm install && cd ..
```

#### Making Changes

**Code Style Guidelines:**
- Use **functional components** with React hooks
- Follow **ESLint** configuration (run `npm run lint`)
- Write **clear variable names** (avoid abbreviations)
- Add **comments** for complex logic
- Keep **components focused** (single responsibility)
- Use **CSS modules** or BEM for styling

**Example - Good Component:**
```jsx
// ✅ Clear, focused component
function RiskBadge({ level, size = 'md' }) {
  const colors = {
    Low: 'green',
    Moderate: 'yellow',
    High: 'orange',
    Critical: 'red'
  };
  
  return (
    <span className={`badge badge-${size} badge-${colors[level]}`}>
      {level}
    </span>
  );
}

export default RiskBadge;
```

#### Testing

- Test responsive design (320px, 768px, 1440px)
- Test on Chrome, Firefox, Safari
- Verify accessibility (keyboard navigation, screen readers)
- Test with sample data

#### Commit Messages

Follow these conventions:

```
[Type] Brief description (50 chars max)

Detailed explanation (if needed)
- Bullet point 1
- Bullet point 2

Fixes #123 (issue number)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructuring
- `style`: Formatting/styling
- `docs`: Documentation
- `test`: Tests
- `perf`: Performance improvement

**Examples:**
```
feat: Add SMS notification system for risk alerts

docs: Update API documentation for chat endpoint

fix: Resolve district filter not persisting in URL

refactor: Extract map component logic into custom hook
```

#### Push & Create PR

```bash
# Push your feature branch
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# - Reference related issues
# - Provide clear description
# - Link to relevant documentation
```

**PR Title Format:**
```
[Component] Brief description

- What changed
- Why this change
- How to test
```

**PR Description Template:**
```markdown
## Description
Brief description of changes

## Related Issues
Fixes #123
Related to #456

## Type of Change
- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change
- [ ] Documentation update

## Testing (How to verify)
1. Navigate to /risk-map
2. Filter by state "Maharashtra"
3. Verify districts display correctly

## Screenshots (if applicable)
[Add before/after or relevant screenshots]

## Checklist
- [ ] Code follows eslint rules
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Tests pass locally
- [ ] Responsive design verified
- [ ] No console errors/warnings
```

### 4. Contribute Documentation 📚

**Improve Existing Docs:**
- Fix typos, clarity issues
- Add missing information
- Update outdated references
- Improve examples

**Add New Guides:**
- Deployment guides
- Architecture decision records
- Feature tutorials
- Troubleshooting guides

**Create Educational Content:**
- Article ideas for Awareness portal
- Dataset documentation
- Research findings

---

## Development Workflow

### Frontend Development

```bash
cd frontend

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Check for linting issues
npm run lint
```

### Backend Development

```bash
cd server

# Start with auto-reload (nodemon)
npm run dev

# Start production server
npm start
```

### Database Schema

When adding features that require new Firestore collections:

1. Document the schema in comments
2. Create migration guides
3. Update data model documentation
4. Add validation rules

**Example Schema Documentation:**
```javascript
/**
 * Collection: interventions
 * 
 * Document Structure:
 * {
 *   id: string (auto-generated)
 *   districtId: number
 *   ngoId: string (reference to NGO doc)
 *   name: string
 *   type: enum ['education', 'health', 'economic', 'legal']
 *   status: enum ['planning', 'active', 'completed', 'paused']
 *   startDate: timestamp
 *   endDate: timestamp (nullable)
 *   targetBeneficiaries: number
 *   budget: number
 *   metrics: {
 *     girlsEnrolled: number,
 *     girlsCompleted: number,
 *     successRate: number
 *   },
 *   createdAt: timestamp
 *   updatedAt: timestamp
 * }
 */
```

---

## Project Structure for New Features

When adding new features, follow this structure:

```
src/
├── pages/
│   └── NewFeature/
│       ├── NewFeature.jsx      # Main component
│       ├── NewFeature.css      # Styles
│       └── hooks/              # Custom hooks (if needed)
│           └── useNewLogic.js
│
├── components/
│   └── FeatureComponents/      # Feature-specific components
│       ├── Card.jsx
│       └── Card.css
│
└── Firebase/
    └── NewFeatureQueries.js    # Database queries
```

---

## API Development

When adding backend endpoints:

1. **Document the endpoint:**
```javascript
/**
 * POST /api/interventions
 * 
 * Create a new intervention program
 * 
 * Request:
 *   - districtId: number (required)
 *   - ngoId: string (required)
 *   - name: string (required)
 *   - type: enum (required)
 * 
 * Response: { success: true, data: intervention }
 * Errors: 400 Bad Request, 401 Unauthorized, 500 Server Error
 */
```

2. **Add error handling:**
```javascript
app.post('/api/interventions', async (req, res) => {
  try {
    // Validation
    if (!req.body.districtId) {
      return res.status(400).json({ error: 'districtId required' });
    }
    
    // Process
    const data = await db.collection('interventions').add(req.body);
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error creating intervention:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
```

3. **Add tests** (minimal example):
```javascript
// test/interventions.test.js
describe('POST /api/interventions', () => {
  it('should create intervention with valid data', async () => {
    // Test implementation
  });
  
  it('should reject without required fields', async () => {
    // Test implementation
  });
});
```

---

## Areas Looking for Help

### High Priority 🔥
- [ ] Mobile responsiveness improvements
- [ ] District data population & validation
- [ ] Performance optimization
- [ ] Accessibility (WCAG) improvements
- [ ] Test coverage

### Medium Priority ⚡
- [ ] Additional language support for Sakhi AI
- [ ] Chart/visualization enhancements
- [ ] Documentation expansion
- [ ] UX/UI improvements
- [ ] Feature flags/toggles

### Nice to Have 💫
- [ ] Dark mode
- [ ] Data export (CSV, PDF)
- [ ] Advanced filtering options
- [ ] Analytics dashboard for admins
- [ ] Community feedback widget

---

## Recognition & Credit

Contributors will be:
- Added to [CONTRIBUTORS.md](CONTRIBUTORS.md)
- Mentioned in release notes
- Recognized on the project website

---

## Communication Guidelines

- **Be Respectful**: Treat all contributors with respect
- **Be Clear**: Provide clear and detailed explanations
- **Be Helpful**: Help others understand your changes
- **Ask Questions**: Don't hesitate—we're here to help
- **Share Credit**: Acknowledge other contributors' work

---

## Resources

- [React Documentation](https://react.dev)
- [Firebase Docs](https://firebase.google.com/docs)
- [MDN Web Docs](https://developer.mozilla.org)
- [Google Design Guidelines](https://design.google)
- [Gender Equality Resources](https://www.unwomen.org)

---

## Questions?

- 📧 Email: [support@geipshield.org](mailto:support@geipshield.org)
- 💬 [GitHub Discussions](https://github.com/yourusername/gender-equity-platform/discussions)
- 🐛 [GitHub Issues](https://github.com/yourusername/gender-equity-platform/issues)

---

## Thank You! 🙏

Your contributions matter and help advance gender equality through technology. Together, we're building tools that create real impact!

**Let's make the world more equitable.** ❤️
