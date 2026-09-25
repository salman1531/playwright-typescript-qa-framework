# Playwright TypeScript QA Automation Framework

A portfolio project that demonstrates maintainable browser and API automation with Playwright, TypeScript, Page Objects, custom fixtures, reusable test data, cross-browser execution, failure artifacts, Allure reporting, and GitHub Actions.

The repository includes a small local demo store and API. Tests are deterministic and do not depend on a client system, production data, paid service, or public test website.

## What this project demonstrates

- UI smoke, negative, and end-to-end checkout scenarios
- API contract and order-creation tests
- Page Object Model with reusable page components
- Typed fixtures and a reusable API client
- Environment configuration with safe defaults
- Chromium, Firefox, and WebKit projects
- Parallel execution and CI retries
- Screenshot, video, and trace retention on failure
- Playwright HTML and Allure reports
- GitHub Actions execution with downloadable reports

## Structure

```text
config/                 Environment configuration
data/                   Typed test data and factories
demo/                   Self-contained portfolio application and API
fixtures/               Playwright custom fixtures
pages/                  Page Objects and reusable components
services/               API client and integration helpers
tests/api/              API tests
tests/ui/               UI and end-to-end tests
.github/workflows/      CI pipeline
```

## Quick start

Prerequisites: Node.js 20 or newer.

```bash
npm install
npx playwright install
npm test
```

Playwright starts the local demo application automatically. No secrets are required.

Useful commands:

```bash
npm run test:smoke
npm run test:api
npm run test:e2e
npm run test:cross-browser
npm run test:headed
npm run typecheck
npm run report:html
npm run allure:generate
npm run allure:open
```

PowerShell users whose execution policy blocks `npx.ps1` can run `npx.cmd playwright install` and `npm.cmd test`.

## Configuration

Copy `.env.example` to `.env` only when you want to override the local defaults. Never commit `.env` files or credentials.

| Variable | Default | Purpose |
| --- | --- | --- |
| `BASE_URL` | `http://127.0.0.1:4173` | Demo UI base URL |
| `API_URL` | `http://127.0.0.1:4173/api` | Demo API base URL |
| `E2E_USER` | `qa.user@example.test` | Local demo user |
| `E2E_PASSWORD` | `Portfolio123!` | Local demo password |

## Reporting and debugging

After a run, open the Playwright report with `npm run report:html`. Generate and open Allure with `npm run allure:generate` followed by `npm run allure:open`.

Failures retain a screenshot, trace, and video under `artifacts/`. CI uploads those files for every run, including failed runs.

## Design choices

Selectors prefer accessible roles, labels, visible names, and explicit test IDs. Tests describe business behavior while Page Objects own browser interactions. API calls sit behind a typed client. Unique test data prevents collisions during parallel execution.

This repository is a sanitized portfolio implementation. It contains no employer code, client URLs, real credentials, customer records, or proprietary business rules.

## Portfolio summary

**Title:** Playwright TypeScript QA Automation Framework with UI, API, and CI Testing

**Skills:** Playwright, TypeScript, Page Object Model, API Testing, End-to-End Testing, GitHub Actions, Allure, Cross-Browser Testing, Test Data Design, CI/CD

**Deliverables:** maintainable source code, automated UI and API suites, self-contained demo application, CI workflow, failure diagnostics, HTML/Allure reporting, setup documentation, and execution commands.

## License

MIT
