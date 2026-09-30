# Security notes

This is a public portfolio. Its text, client-side code, directory paths and contact links are intentionally public, including through browser developer tools and the public GitHub repository. Hiding controls or disabling Inspect Element would not protect information. Never commit credentials or put secrets in `public/`, client components, or `NEXT_PUBLIC_*` variables.

## Application protections

- The terminal parses a fixed command list and resolves paths against a fixed site directory. It never executes a shell, reads server files, accepts arbitrary navigation destinations, or sends commands to an API. Input length, history and transcript sizes are bounded; React renders command output as text.
- Every document request receives a fresh cryptographically random script nonce. Proxy replaces visitor-supplied nonce/CSP headers. The CSP blocks unapproved inline scripts, string-to-code evaluation in production, objects, framing, and third-party script sources. Inline styles remain allowed for Leaflet positioning and layout. Only named map image hosts are permitted.
- Reading the nonce in the root layout makes pages dynamically rendered. HTML is private/not cached across visitors; this trades static CDN rendering for strict script authorization. Static assets remain cacheable. The public nonce is not a credential and must be unique for each document.
- Production browser source maps and the framework identification header are disabled. This reduces incidental exposure, not access control: browser JavaScript is still public.
- MIME-sniffing, framing, referrer and browser-permission headers are configured. Vercel handles HTTPS and its platform protections.
- Dependencies are locked. CI checks npm advisories and runs tests/build/HTTP regressions. Audit results are a point-in-time check of known advisories, not proof of security.

## Review scope and limits

The September 2026 review checked application source, common credential patterns in tracked source/public files, dependency advisories, terminal injection boundaries, security response headers, nonce isolation, absent public source maps, and HTTP denial of `.env`, `.git/config`, source and package files. No common credential patterns were found in the checked files. It did not perform an exhaustive historical secret scan or inspect GitHub/Vercel account settings, private environment variables, domain registrar access, or all possible attacks. No guarantee of being unhackable is implied.

Keep GitHub, Vercel and registrar accounts protected with MFA/passkeys and keep dependencies patched. If a real secret ever enters Git history, rotate it; deleting it in a later commit is insufficient.

Implementation reference: https://nextjs.org/docs/app/guides/content-security-policy
