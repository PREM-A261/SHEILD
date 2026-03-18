# Security Policy

## Reporting Security Vulnerabilities

**Please do NOT open GitHub issues for security vulnerabilities.**

If you discover a security vulnerability in the Gender Equity Intelligence Platform, please report it by emailing:
**[security@geipshield.org](mailto:security@geipshield.org)**

Please include:
- Description of the vulnerability
- Affected component(s) or file(s)
- Steps to reproduce (if applicable)
- Potential impact
- Suggested fix (if you have one)

We will acknowledge receipt within 48 hours and provide updates on our progress.

---

## Security Best Practices

### For Users

1. **Keep Software Updated**
   - Update to latest releases regularly
   - Security patches are released as needed

2. **Use Strong Authentication**
   - Use strong, unique passwords
   - Enable two-factor authentication if available
   - Don't share login credentials

3. **Handle Data Securely**
   - Don't share sensitive data in public comments
   - Report data breaches immediately
   - Use HTTPS for all communications

4. **Report Issues**
   - Report security concerns to security@geipshield.org
   - Don't publicly disclose vulnerabilities before patching

### For Administrators & Deployment

1. **Firestore Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Public read-only data
       match /regions/{document=**} {
         allow read: if true;
         allow write: if request.auth != null && 
                       request.auth.token.admin == true;
       }
       
       // User-specific data
       match /users/{uid} {
         allow read: if request.auth.uid == uid;
         allow write: if request.auth.uid == uid;
       }
     }
   }
   ```

2. **Environment Variables**
   - Never commit `.env` files
   - Use `.env.example` for documentation
   - Add `.env` to `.gitignore`
   - Rotate API keys regularly

3. **Database**
   - Enable Firestore backups
   - Restrict database access to authenticated users
   - Use composite indexes for sensitive queries
   - Enable audit logging

4. **API Security**
   - Use HTTPS/TLS in production
   - Implement rate limiting on public endpoints
   - Validate all user inputs
   - Use Content Security Policy (CSP) headers
   - Implement CORS correctly

5. **Secrets Management**
   - Use platform-specific secret managers:
     - AWS: AWS Secrets Manager
     - Heroku: Config Variables
     - Vercel: Environment Variables
     - Netlify: Build & deploy settings
   - Never hardcode secrets
   - Rotate credentials regularly

---

## Security Features Implemented

### Frontend
- ✅ Protected routes with authentication checks
- ✅ XSS protection through React's default escaping
- ✅ CSRF tokens (via Firebase Auth)
- ✅ Content Security Policy headers
- ✅ Secure API communication (HTTPS)
- ✅ Local storage with encrypted auth tokens

### Backend
- ✅ CORS configuration for specific origins
- ✅ Input validation on all endpoints
- ✅ Environment variable management
- ✅ Error message sanitization (no stack traces exposed)
- ✅ Rate limiting on public endpoints
- ✅ Dependency scanning for vulnerabilities

### Database
- ✅ Firestore Security Rules
- ✅ Row-level access control
- ✅ Encrypted credentials
- ✅ Audit logging capability
- ✅ Regular automated backups

---

## Known Vulnerabilities

**Current Status**: No known critical vulnerabilities

We regularly scan dependencies using:
- npm audit
- Snyk
- GitHub Dependabot

---

## Historical Security Updates

### Version 0.1.0 (Initial Release)
- Implemented authentication & authorization
- Configured Firestore security rules
- Added input validation on all endpoints
- Implemented CORS configuration

---

## Security Development Practices

The team follows secure development practices:

1. **Code Review**: All code changes reviewed by maintainers
2. **Dependency Updates**: Regular updates to patch security vulnerabilities
3. **Static Analysis**: Use ESLint and code quality tools
4. **Testing**: Automated tests for critical security paths
5. **Monitoring**: Real-time error tracking with Sentry (optional)
6. **Incident Response**: Protocol for responding to security incidents

---

## Third-Party Dependencies Security

### Key Dependencies Verification

**Critical Dependencies**:
- `@google/genai`: Official Google Gemini API client
- `firebase`: Official Firebase SDK
- `react-leaflet`: Maintained library for map visualization
- `recharts`: Widely-used charting library
- `express`: Industry-standard web framework

**Dependency Scanning**:
```bash
# Check for known vulnerabilities
npm audit

# Install Snyk for continuous monitoring
npm install -g snyk
snyk test

# Fix vulnerabilities
npm audit fix
```

---

## Incident Response Procedure

### If a vulnerability is discovered:

1. **Immediate Response**
   - Contact security@geipshield.org
   - Provide detailed vulnerability information
   - Allow 48 hours for acknowledgment

2. **Investigation** (24-72 hours)
   - Assess severity and impact
   - Determine affected versions
   - Develop fix

3. **Patching** (varies by severity)
   - Critical: Patch released within 24 hours
   - High: Patch released within 1 week
   - Medium: Patch in next scheduled release
   - Low: Patch in next scheduled release

4. **Disclosure**
   - Prepare security advisory
   - Coordinate responsible disclosure
   - Notify affected users
   - Publish fix and advisory

5. **Post-Incident**
   - Post-mortem analysis
   - Prevention measures
   - Documentation updates

---

## Compliance & Standards

This project aims to comply with:
- **OWASP Top 10**: Key web application security risks
- **CWE/SANS Top 25**: Common weakness enumeration
- **Data Privacy**: GDPR & India's data protection regulations
- **Accessibility**: WCAG 2.1 Level AA

---

## Security Resources

- [OWASP Security Guidelines](https://owasp.org)
- [Firebase Security Documentation](https://firebase.google.com/docs/security)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security)
- [React Security](https://react.dev/learn/security)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

---

## Support

For security-related questions or concerns:
- 📧 Email: [security@geipshield.org](mailto:security@geipshield.org)
- 📞 Security HotLine: (Available to core maintainers)
- 🔒 PGP Key: [Available on request]

---

**Last Updated**: March 2026

*Thank you for helping keep our platform secure and trustworthy.*
