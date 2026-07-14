# UCJM Website Security Configuration

## Overview
This document outlines the security improvements implemented for the UCJM Website.

## 1. Row Level Security (RLS) Policies

### Songs & Playlists Tables
**Before:** Fully open access (anyone could create/edit/delete)
**After:** Read access is public, write access requires authentication

The migration file `00007_security_hardening.sql` applies:
- `songs_select_public`: Anyone can read songs
- `songs_insert_auth`: Only authenticated users can create songs
- `songs_update_auth`: Only authenticated users can update songs
- `songs_delete_auth`: Only authenticated users can delete songs
- Same policies applied to `playlists` and `playlist_songs` tables

### Admin Operations
Admin operations (announcements, events, photos) are restricted to users with `role = 'admin'` via the `is_admin()` SECURITY DEFINER function.

## 2. Security Headers

### Content Security Policy (CSP)
Added to `vercel.json` and `public/_headers`:
- `default-src 'self'`: Only load resources from same origin by default
- `script-src`: Allows self, inline scripts, and specific analytics
- `style-src`: Allows self, inline styles, and Google Fonts
- `font-src`: Allows self and Google Fonts
- `img-src`: Allows self, data URIs, blob URLs, and HTTPS
- `connect-src`: Allows Supabase connections
- `frame-src`: Allows YouVersion Bible embed
- `frame-ancestors 'none'`: Prevents framing
- `base-uri 'self'`: Restricts base URI
- `form-action 'self'`: Restricts form submissions

### Additional Headers
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-XSS-Protection: 1; mode=block` - Enables XSS filtering
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer info
- `Permissions-Policy`: Disables camera, microphone, geolocation, payment
- `Strict-Transport-Security`: Enforces HTTPS for 1 year

## 3. Rate Limiting

Client-side rate limiting implemented in `src/services/rateLimiter.js`:
- Prevents abuse of authentication endpoints
- Configurable max attempts and time windows
- Automatic cleanup of expired records

## 4. Input Validation & Sanitization

Security utilities in `src/services/security.js`:
- `sanitizeInput()`: Escapes HTML special characters
- `validateEmail()`: Email format validation
- `validatePassword()`: Password strength validation
- `validateUrl()`: URL format validation
- `validateStringLength()`: Input length limits
- `containsSqlInjection()`: Basic SQL injection detection
- `validateFormData()`: Form validation with rules

## 5. Audit Logging

New `audit_log` table tracks:
- INSERT, UPDATE, DELETE operations on announcements, events, photos
- User ID, action type, table name, record ID
- Old and new data for changes
- Timestamps for all operations

Only admins can read audit logs.

## 6. Supabase Dashboard Configuration

### CORS Origins
Configure allowed origins in Supabase Dashboard > Settings > API:
```
https://ucjmwebsite.vercel.app
http://localhost:5173 (for development)
```

### Rate Limiting
Supabase has built-in rate limiting for auth endpoints:
- Sign in: 30 attempts per hour
- Sign up: 10 attempts per hour
- Password reset: 5 attempts per hour

### API Settings
Verify in Supabase Dashboard > Settings > API:
- `API URL`: Should be your Supabase project URL
- `anon public`: Should be your anon key (safe to expose)
- `service_role secret`: Keep this secret, never expose

## 7. Environment Variables

### .env.local
Ensure `.env.local` is in `.gitignore` (already configured):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_YV_APP_KEY=your_youversion_key
```

**Important:** Never commit `.env.local` to version control.

## 8. Deployment Checklist

Before deploying:
1. Run migration `00007_security_hardening.sql` in Supabase SQL Editor
2. Configure CORS origins in Supabase Dashboard
3. Verify CSP headers don't break functionality
4. Test authentication flows
5. Test admin operations
6. Verify audit logging works

## 9. Monitoring

### Security Events to Monitor
- Failed login attempts
- Unauthorized access attempts
- Audit log entries for admin operations
- CSP violation reports (if configured)

### Supabase Logs
Check Supabase Dashboard > Logs for:
- Auth logs
- API logs
- Postgres logs

## 10. Future Improvements

Consider adding:
- Server-side rate limiting via Supabase Edge Functions
- Two-factor authentication (2FA)
- Email verification requirements
- Session management improvements
- Security.txt file
- Regular security audits
