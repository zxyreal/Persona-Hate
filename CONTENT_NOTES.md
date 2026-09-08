# Content provenance and release notes

## Inputs

- Manuscript: `../paper/revised_version-2.pdf`, 24 pages, anonymous.
- Selected persona asset: `../dataset/personas_paper.jsonl`, 2,285 JSONL records; fields `id`, `persona`, `source`. Source labels: 1,000 `personahub`, 1,285 `4chan`.
- Structural reference: https://hatebench.xinyueshen.me/ (paper-first academic homepage). Site copy and visual design are written for PersonaHate.

## Displayed facts

- Persona pool: 257,473 + 200,000; selected personas: 2,285. Sections 4.2 / 4.3.1, page 4.
- 791,283 valid generated samples, eight generators, six annotation judges, hate threshold >=4/6. Sections 4.3–4.4, pages 5–6; Table 21, page 20.
- 67,452 training examples, 33,726 per label. Section 4.4.2, page 6.
- 34 groups in six categories. Table 19, page 20.
- DeBERTa-v3: 77.5 average F1, 79.4 average accuracy. Table 9, page 10. This uses a general-purpose pretrained encoder, not random initialization.
- Fine-tuning results: all eight Table 10 rows, page 11. Averages span HateXplain, HateBenchSet, Davidson, MHS; fine-tuned results average five seeds. Some individual benchmark scores decline. The reported +2.7 for Detoxify-RoBERTa differs from rounded 74.2-71.4; display the published delta with an explicit rounding note.
- Fixed 2K ablation: 64.5, 70.8, 72.6 average F1. Table 13, page 13.
- Persona extraction examples: exact source-post/persona pairs for original post IDs 92427541 (score 0.84) and 94529252 (score 0.71), Table 16, page 18. Asterisk redactions and original grammar are retained; only PDF line-break artifacts are normalized.

## Conflicts resolved for the homepage

The manuscript abstract/introduction and parts of Sections 6.5/6.7 contain stale numerical claims. Homepage values follow Tables 9, 10, and 13. Specifically, avoid abstract DeBERTa 77.6/79.3 and Llama-3.1-8B 14.1→76.8. Do not combine Table 14's different DeBERTa row with Table 9. Generator model names have internal inconsistencies, so the homepage reports the confirmed count rather than a disputed inventory.

## Release boundaries

The supplied PDF is anonymous and contains template ACM year, venue, DOI, and ISBN values; these placeholders are not used. On September 8, 2026, the user supplied the author list and shared CISPA affiliation in a screenshot and explicitly requested the venue label ACM CCS 2026. Those supplied details now appear in the homepage title area and metadata. No final BibTeX or DOI is fabricated. Appendix A, pages 15–16, describes the original anonymous review repository as code, selected personas, and a representative training-data subset, with the full corpus excluded from the submission artifact. The homepage now links to the user-designated TrustAIRLab/PersonaHate repository. Its main branch was checked on September 8, 2026: it contains persona extraction, speech generation, and training code. No full-corpus availability is inferred from that repository.

The local JSONL is a persona-description asset, not the generated corpus or detector-training set. No license field/file was supplied. Before public release, confirm the final citation, long-term repository and dataset links, and actual license/responsible-use terms. This version exposes no live generation interface.

## Academic-page revision

The page now includes all 19 Table 9 model rows, both settings for all eight Table 10 models, and all six Table 13 ablation rows. Per-benchmark decreases are retained and explicitly marked. Table 19 provides the full identity-group list. `app/research-data.ts` stores these source values separately from presentation.

Original Figure 1 (page 4) and Figure 3 (page 19) are rendered directly from the supplied PDF, excluding conference placeholders and unrelated text. Figure 1's original 'more than 4 votes' wording is qualified in the caption: the defined threshold is at least four of six votes. Figure 3 distinguishes the random source split (1,003 / 1,282) from FPS and DA-FPS (1,000 / 1,285). It describes persona embeddings, not detector outcomes.

At the user’s request, the full persona browser is replaced with two switchable original-post → extracted-persona pairs from Table 16. The examples illustrate GPT-4o extraction from 4chan posts. Their post IDs are not IDs in the supplied JSONL; neither example text was found in the selected persona file, so no mapping to that file is claimed. The unchanged JSONL remains available as a download.

## Persona-to-post generation

The generation section now presents the original prompt from Section 4.3.2 (page 5) above a two-column persona → generated hate speech pair. Persona #1067 is copied exactly from the supplied selected-persona JSONL, with its id and source. The output, target group, generator, and annotation remain null. The empty output panel is intentional, as requested by the user on 2026-09-08 while generation records are unavailable. Replace the complete pair with a verified record when supplied; do not assume a link to the Table 16 extraction examples.

The full pipeline generates positive and negative text; a hate label requires at least four of six annotation votes. The placeholder is specifically reserved for a hate-labeled example, not a claim that every persona-conditioned output is hateful. This revision removes the repeated inputs/counts and generic output/annotation boxes in favor of the pair.

## Interactive dataset comparisons

The external dataset quotation section, its three text examples, and its bundled ToxiGen license file were removed at the user’s request. It is replaced by comparisons placed before the method section. The persona-to-generated-text placeholder remains intentionally empty.

- **Semantic diversity:** all 34 Table 24 rows and the published average (page 23). Values and deltas are retained exactly, including rounding discrepancies. Table 24 has 31 positive and three negative differences (Atheists, Buddhists, Women); the website exposes these exceptions and qualifies Figure 4’s stale 32/34 claim. The two corpus values are shown on a fixed 0–1 axis. Do not interpret diversity as detector accuracy or a controlled causal persona effect. The inconsistent `PH n` column is not shown or described as the actual sample count used in each calculation.
- **Lexical diversity:** Table 18 (page 19), equal-size samples of 7,838 texts per dataset: Distinct-1 0.064/0.051, Distinct-2 0.345/0.325, Distinct-3 0.656/0.634, vocabulary size 32,976/27,132. Every metric uses a zero-based, labeled axis with the proper unit. Do not mix these values with Figure 4/Appendix J’s separate 5,000-text analysis.
- **Dataset design:** PersonaHate is compared with HateBenchSet, ToxiGen, or HateXplain across construction, speaker context, target definitions, annotation, and corpus/subset scope. Sources are linked per selected dataset: [HateBench original paper](https://arxiv.org/html/2501.16750v1), [ToxiGen original paper](https://arxiv.org/html/2203.09509), [HateXplain original paper](https://arxiv.org/html/2012.10289). HateBenchSet uses two initial human annotators and a third for disagreements, not three independent annotators for every record. ToxiGen’s full corpus has proxy labels plus separately annotated subsets, not full human annotation. HateXplain’s ten analyzed communities use filtering criteria and are not a predefined coverage target comparable to 34 generated groups. Dataset corpus sizes are not compared as equal-budget training sets.
- **Fine-tuning explorer:** Table 10’s eight models × five metrics (four benchmarks plus average). Per-benchmark changes are differences of the displayed rounded F1 scores; average changes retain the paper’s published deltas. Decreases stay visible, e.g. Cardiff-RoBERTa on Davidson is 90.8 → 84.6 (−6.2 pp). This is a before/after fine-tuning comparison, not training on alternative datasets. The full Tables 9/10/13 remain in a collapsible section.

The site does not claim a same-model, same-budget detector-training comparison between PersonaHate and other datasets; no such result was located in the supplied paper. Table 14 is an internal training-configuration ablation with different sample sizes and is not used to imply that comparison.

## Author and venue update

The user-provided author order is Xinyu Zhang, Ziqing Yang, Michael Backes, Yang Zhang. All four share the affiliation CISPA Helmholtz Center for Information Security. The supplied contact addresses are used only as mailto links on the names: xinyu.zhang@cispa.de, ziqing.yang@cispa.de, director@cispa.de, zhang@cispa.de. The heading now displays ACM CCS 2026, as expressly requested by the user. Page-title, author metadata, and Open Graph title are synchronized through `app/publication.ts`. The downloaded PDF remains the original anonymous manuscript.

## Resource placement

At the user’s request, Artifact resources is now the first content section, directly after the title, author, and conference block. Navigation follows that order. The existing scope and intended-use text remains at the end of the page.

## GitHub publishing

On September 8, 2026, the website was first synced to the independent `webpage` branch of the private TrustAIRLab/PersonaHate repository. After confirming that the organization's Free plan does not support Pages for private repositories, the user designated the public https://github.com/zxyreal/Persona-Hate repository as the website destination, using its `main` branch. Research code remains in TrustAIRLab/PersonaHate, and the homepage's Code link continues to point there.

The website repository contains source files and a prebuilt `docs/` site. `npm run build:pages` uses Vinext static export and the `/Persona-Hate/` base path for https://zxyreal.github.io/Persona-Hate/. The `docs/.nojekyll` marker preserves access to `_next/` assets on GitHub Pages. Local hosting metadata, dependencies, caches, and development logs are excluded from the repository.

Vinext 1.0.0-beta.5 omits the configured base path in its internal homepage prerender request, causing a 404 that it records as skipped/dynamic. The Pages preparation script handles this known case by rendering `/Persona-Hate/` through the built production server, saving the complete HTML and React payload, and closing the temporary server. Dependency files are not patched.
