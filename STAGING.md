# AMCO staging environment

This branch is the review environment for the AMCO Premium Finance marketing website.

## Activate the Vercel preview

1. Open the AMCO Premium Finance project in Vercel under the account or team that owns it.
2. Under Settings > Git, verify the linked repository is `kvalle1731/Amco-Premium-Finance`.
3. Keep `main` as the production branch. Use `staging` as the preview branch.
4. When preview deployments are enabled, pushes to `staging` create an automatic Vercel preview deployment.
5. Copy its generated `.vercel.app` address from the Vercel Deployments tab. Do not infer or guess this address.
6. Optionally assign a branded staging subdomain under Settings > Domains if AMCO owns the required domain and DNS is configured.

This is a static HTML/CSS/JavaScript site. Framework: Other. Root directory: repository root. No build command or environment variables required.

## Safety

The `staging` branch contains a Vercel robots header to request no indexing. Staging does not accept payments, private applications, or financing agreements.
