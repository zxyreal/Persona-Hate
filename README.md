# PersonaHate project homepage

The academic project homepage for **PersonaHate: A Scalable Persona-Based Data Synthesis Pipeline for Hate Speech Analysis**, ACM CCS 2026.

Xinyu Zhang, Ziqing Yang, Michael Backes, and Yang Zhang · CISPA Helmholtz Center for Information Security.

This repository contains the homepage source and its prebuilt GitHub Pages site on `main`. Research code is maintained separately in [TrustAIRLab/PersonaHate](https://github.com/TrustAIRLab/PersonaHate/tree/main).

## Contents

- `app/page.tsx`: paper overview, original figures, dataset descriptions and download links.
- `app/research-hero.tsx`: publication heading, download links, and paper-grounded dataset and result highlights.
- `app/results.tsx`: interactive fine-tuning view followed by collapsible full detector, fine-tuning, and ablation tables.
- `app/research-data.ts`: values from Tables 9, 10, 13, and 19.
- `app/persona-examples.tsx`: paired original-post and extracted-persona examples.
- `app/persona-generation.tsx`: the original prompt followed by a selected persona and an intentionally empty generated-text panel.
- `app/generation-example-data.ts`: exact selected persona #1067; output and related generation fields remain null until a verified pair is available.
- `app/dataset-comparison.tsx`: interactive group diversity, matched-sample lexical comparisons, and dataset construction comparisons.
- `app/dataset-comparison-data.ts` and `app/dataset-profiles.ts`: Tables 18/24 values and attributed dataset definitions.
- `app/fine-tuning-explorer.tsx`: model/benchmark selectors with before/after F1 comparisons.
- `app/explorer-controls.tsx`: shared accessible controls and zero-based comparison bars.
- `app/persona-examples-data.ts`: two exact source/persona pairs from Table 16, with post IDs and Perspective identity attack scores.
- `app/globals.css`: responsive academic page layout.
- `app/layout.tsx`: page metadata.
- `app/publication.ts`: author order, email links, shared CISPA affiliation, and ACM CCS 2026 venue.
- `public/assets/`: unchanged manuscript and persona downloads, plus original PDF figure crops.
- `docs/`: generated static website, ready for GitHub Pages; rebuild rather than editing these files.
- `scripts/prepare-pages.mjs`: copies the static export into `docs/` and adds `.nojekyll`.
- `CONTENT_NOTES.md`: source provenance, manuscript inconsistencies, and release details.

## Development

Use Node.js 22.13 or newer.

```sh
git clone https://github.com/zxyreal/Persona-Hate.git
cd Persona-Hate
npm ci
npm run dev
```

The local preview uses the root path. `npm run build:pages` builds the static website for the `/Persona-Hate/` GitHub Pages path and refreshes `docs/`. PDF, persona, figure, and JavaScript URLs use the same base path.

## GitHub Pages

The prebuilt `docs/` directory allows publishing directly from this branch without a custom Actions workflow:

1. Open the repository's **Settings → Pages**.
2. Select **Deploy from a branch**.
3. Select **main** and **/docs**, then save.

After Pages is enabled and its deployment succeeds, the default address is `https://zxyreal.github.io/Persona-Hate/`. The publishing source is the `main` branch and `/docs` folder. See [GitHub's publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

For later updates, edit the source, run `npm run build:pages`, and commit both the source changes and the refreshed `docs/` directory on `main`. Keep research code changes in the separate research repository.

## Before a public release

Author names, shared CISPA affiliation, and ACM CCS 2026 venue were supplied on September 8, 2026. The downloaded PDF is the unchanged anonymous manuscript. Add a verified citation after DOI and publication details are final. Confirm the intended dataset release and its actual license or responsible-use terms. No DOI, full-corpus download, or model-weight download is claimed. Generated-text examples are intentionally empty until verified records are available.
