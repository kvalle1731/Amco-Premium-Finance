# AMCO Premium Finance — Editorial Financial Workspace

This is a standalone, static site concept for AMCO Premium Finance, separate in design and content from RAMCO Insurance.

## Architecture

The homepage deliberately avoids the conventional insurance landing page sequence. It begins with an interactive illustration of a premium's initial payment and remaining balance, moves through an editorial statement of AMCO's role, uses an audience accordion in place of a three-card menu, lists financing types as a financial ledger, and provides a progressively revealed inquiry.

## Running the site

Serve the repository root as static files, for example with `python -m http.server 8000`, then visit `http://localhost:8000`.

For Vercel, use the **Other** framework, repository root as root directory and no build command. The `staging` branch is the intended review branch and includes an X-Robots-Tag to discourage search indexing.

## Branding

`assets/amco-logo-transparent.webp` preserves the official AMCO logo artwork and its colors. Only its white image background is made transparent, so it can sit on an ivory page without a bounding rectangle. Website colors and layout are deliberately different from RAMCO Insurance.

## Safety

The premium illustration is not a financing rate quote or installment calculation. It does not use interest rates or fees. The multi-step inquiry uses a `mailto:` link and does not transmit information to a server or store customer information. AMCO must establish approved financing procedures, licensing, legal documents, and secure servicing before enabling real financing applications or payments. No unverified company statistics or licensing claims are used.