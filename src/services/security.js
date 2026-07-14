const DOMPurify = {
  sanitize(dirty) {
    if (typeof dirty !== 'string') return '';
    return dirty
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
};

export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input.trim());
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  const errors = [];
  if (password.length < 8) errors.push('Password must be at least 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('Password must contain at least one number');
  return { valid: errors.length === 0, errors };
}

export function validateUrl(url) {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function validateStringLength(input, maxLength) {
  return typeof input === 'string' && input.length <= maxLength;
}

export function containsSqlInjection(input) {
  if (typeof input !== 'string') return false;
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /(--|;|\/\*|\*\/|xp_|sp_)/i,
    /(\b(OR|AND)\b\s+\d+\s*=\s*\d+)/i,
    /('\s*(OR|AND)\s+')/i
  ];
  return sqlPatterns.some(pattern => pattern.test(input));
}

export function validateFormData(data, rules) {
  const errors = {};
  
  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field];
    
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[field] = `${field} is required`;
      continue;
    }
    
    if (value && rule.maxLength && !validateStringLength(value, rule.maxLength)) {
      errors[field] = `${field} must be less than ${rule.maxLength} characters`;
    }
    
    if (value && rule.type === 'email' && !validateEmail(value)) {
      errors[field] = 'Invalid email address';
    }
    
    if (value && rule.type === 'url' && !validateUrl(value)) {
      errors[field] = 'Invalid URL';
    }
    
    if (value && rule.sanitize) {
      data[field] = sanitizeInput(value);
    }
  }
  
  return { valid: Object.keys(errors).length === 0, errors, data };
}

export function generateCsrfToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function validateCsrfToken(token, storedToken) {
  return token === storedToken;
}
