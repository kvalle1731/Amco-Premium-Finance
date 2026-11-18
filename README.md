# AMCO Premium Finance Website

A production-ready **static marketing website** for AMCO Premium Finance. It uses the supplied AMCO logo and a lightweight, responsive implementation without a framework, database, or paid services.

## Features

- Responsive landing page for agencies, brokers, carriers, MGAs and policyholders
- Audience-switching tabs and keyboard-accessible navigation
- Commercial, auto and homeowners insurance solution sections
- Explanatory premium-financing process and FAQs
- Illustrative calculator that deliberately **excludes interest and finance charges** and is **not a quote**
- Inquiry form that opens the visitor's own email client; **no information is stored** by this website
- Original supplied AMCO logo as a local web asset
- Search/social metadata, SVG favicon, and responsive styles

## Run locally

Open `index.html` in a browser. For development, run `python -m http.server 8000` and open http://localhost:8000.

## Deploy on GitHub and Vercel

1. In GitHub, create a new repository named `amco-premium-finance`. Keep it private until you intend to publish the source.
2. Upload **all** files and the `assets` directory from this package to the default branch.
3. In Vercel, create a new project and import that GitHub repository.
4. Select **Other** or **No framework**. No build command is needed. Root directory is `/`.
5. Deploy. Vercel will serve `index.html` as the homepage and will automatically deploy subsequent pushes.
6. After verifying the site, attach your domain via Vercel's project domain settings.

No environment variables or database are required.

## Important production conditions

- **Licensing and regulatory status:** Verify premium finance licensing and program availability in each intended jurisdiction. In Florida, Section 627.828 generally requires licensing to conduct business as a premium finance company. Seek regulatory and legal review before announcing active products.
- **Payments, quotes and applications:** This website does **not** process online applications, accept payments, generate financing agreements, approve funding or quote interest/fees. Never present the illustrative calculator as a formal payment schedule.
- **Email:** Change `info@amcopremium.com` in `index.html` and `script.js` if your authorized contact email differs.
- **Privacy and disclosures:** Before adding third-party analytics, form processing, CRM integration, loan applications, or payments, implement appropriate privacy notices, legal disclosures, security controls and consent mechanisms.
- **Scope:** Marketing site only. No bank accounts, underwriting, financing, or payment API integration has been configured.

## Palette

| Use | Color |
|---|---|
| Deep forest | `#052c22` |
| Emerald | `#093e2d` |
| Accent green | `#0e6849` |
| Champagne gold | `#d6ad5d` |
| Logo red | `#c5232b` |
| Warm ivory | `#f7f5ef` |

Fonts: Playfair Display, Manrope, DM Sans. All are real published Google Fonts with system fallbacks.