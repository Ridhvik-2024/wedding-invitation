/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
```

---

## .env.example
```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

---

## .gitignore
```
node_modules/
.next/
out/
.env.local
.env
.vercel
*.log
.DS_Store