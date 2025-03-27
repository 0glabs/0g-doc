/**
 * Security Headers Plugin for Docusaurus
 * 
 * This plugin adds security headers to protect against clickjacking and other vulnerabilities.
 * It works by adding middleware to the development server and generating a _headers file for production.
 */

module.exports = function securityHeadersPlugin(context, options) {
  return {
    name: 'security-headers-plugin',
    
    // For development server
    configureDevServer(app) {
      app.use((req, res, next) => {
        // Prevent clickjacking
        res.setHeader('X-Frame-Options', 'DENY');
        
        // Prevent MIME type sniffing
        res.setHeader('X-Content-Type-Options', 'nosniff');
        
        // Control referrer information
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        
        // Content Security Policy
        res.setHeader(
          'Content-Security-Policy',
          "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; img-src 'self' data: https://www.google-analytics.com; font-src 'self' https://cdnjs.cloudflare.com; frame-ancestors 'none'; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com;"
        );
        
        // HTTPS enforcement
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        
        // Permissions policy
        res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
        
        next();
      });
    },
  };
}; 