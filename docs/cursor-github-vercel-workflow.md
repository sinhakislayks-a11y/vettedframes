# Cursor + GitHub + Vercel Workflow

## Baseline
- Production branch: `main`
- Baseline commit before migration: `c234ec956576234c97bb43fe876fa7788ba5e9c2`
- Linked Vercel project: `frames-by-kislay`

## Daily Flow
1. Create a feature branch from `main` using `feature/<short-name>`.
2. Run locally in Cursor (`npm run dev`) and validate page-level changes.
3. Before push, run `npm run ci`.
4. Push branch and open a PR to `main`.
5. Validate Vercel preview deployment and complete smoke tests.
6. Merge only after checks pass.

## Smoke Test Checklist
- Homepage renders and interactive hero works
- Primary CTA path works
- Contact form submit path works
- Metadata/SEO tags unchanged (title, description, sitemap, robots)

## Branch Protection (GitHub Settings)
Configure protection for `main`:
- Require a pull request before merging
- Require status checks to pass (`CI / validate`)
- Disallow force pushes
- Optionally require at least 1 approval

## Rollback
- Vercel: redeploy previous successful production deployment
- GitHub: revert the merge commit through a PR
- Env vars: restore from known-good values if issue is config-related
