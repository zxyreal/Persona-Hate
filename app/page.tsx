import { sitePath } from './site-path';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PersonaExamples from './persona-examples';
import PersonaGeneration from './persona-generation';
import DatasetComparison from './dataset-comparison';
import Results from './results';
import { identityGroups } from './research-data';
import { publication } from './publication';
const paper = sitePath('/assets/personahate-paper.pdf');
const personas = sitePath('/assets/personas_paper.jsonl');
const artifact = 'https://github.com/TrustAIRLab/PersonaHate/tree/main';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="document-header">
        <nav aria-label="Page sections">
          <a className="nav-title" href="#main">
            PersonaHate
          </a>
          <div>
            <a href="#resources">Resources</a>
            <a href="#overview">Overview</a>
            <a href="#dataset-comparison">Compare</a>
            <a href="#personas">Personas</a>
            <a href="#results">Results</a>
          </div>
        </nav>
      </header>
      <main id="main" className="document">
        <div className="paper-heading">
          <h1>
            <strong>PersonaHate:</strong> A Scalable Persona-Based Data
            Synthesis Pipeline for Hate Speech Analysis
          </h1>
          <p className="paper-venue">{publication.venue}</p>
          <p className="authors">
            {publication.authors.map((author) => (
              <a key={author.name} href={`mailto:${author.email}`}>
                {author.name}
              </a>
            ))}
          </p>
          <p className="author-affiliation">{publication.affiliation}</p>
          <div className="paper-links">
            <a href={paper} target="_blank" rel="noreferrer">
              Paper <span>PDF ↗</span>
            </a>
            <a href={artifact} target="_blank" rel="noreferrer">
              Code <span>GitHub ↗</span>
            </a>
            <a href={personas} download>
              Personas <span>JSONL ↓</span>
            </a>
          </div>
        </div>
        <section id="resources">
          <h2>Artifact resources</h2>
          <Table className="paper-table resource-table">
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Resource</TableHead>
                <TableHead scope="col">Contents</TableHead>
                <TableHead scope="col">Access</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableHead scope="row">Paper</TableHead>
                <TableCell>
                  Method, experiments, limitations, and appendices
                </TableCell>
                <TableCell>
                  <a href={paper} target="_blank" rel="noreferrer">
                    PDF ↗
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope="row">Selected personas</TableHead>
                <TableCell>
                  2,285 descriptions · JSONL · id, persona, source
                </TableCell>
                <TableCell>
                  <a href={personas} download>
                    Download ↓
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope="row">Source code</TableHead>
                <TableCell>
                  Persona extraction, speech generation, and detector training
                  code
                </TableCell>
                <TableCell>
                  <a href={artifact} target="_blank" rel="noreferrer">
                    Repository ↗
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="table-note">
            The repository may require authorization. The full 791,283-sample
            generated corpus and 67,452-example training set are reported in the
            paper; they are not included in the persona download.
          </p>
        </section>

        <section id="overview">
          <h2>Overview</h2>
          <p>
            PersonaHate constructs hate speech training data through
            persona-conditioned generation. It combines personas inferred from
            4chan /pol/ with general-purpose personas from PersonaHub, samples
            for diversity, and generates text across multiple LLMs and target
            identity groups.
          </p>
          <ul className="overview-findings">
            <li>
              <strong>Data construction:</strong> 2,285 selected personas, 8
              generators, and 34 identity groups produce{' '}
              <strong>791,283 valid samples</strong>. Six judges annotate the
              outputs; group- and label-balanced sampling yields{' '}
              <strong>67,452 training examples</strong>.
            </li>
            <li>
              <strong>Detector evaluation:</strong> DeBERTa-v3 reaches{' '}
              <strong>77.5% average F1</strong> across four external benchmarks.
              Fine-tuning Llama-3.1-8B improves average F1 from{' '}
              <strong>70.7% to 78.4%</strong>.{' '}
              <a href="#results">View per-benchmark results ↓</a>
            </li>
            <li>
              <strong>Controlled ablation:</strong> at a fixed 2K training
              budget, increasing from one generator / one group to eight
              generators / 34 groups raises DeBERTa-v3’s average F1 from{' '}
              <strong>64.5% to 72.6%</strong>.
            </li>
          </ul>
          <figure className="paper-figure pipeline-figure">
            <a
              href={sitePath('/assets/pipeline.png')}
              target="_blank"
              rel="noreferrer"
              aria-label="Open full-size PersonaHate pipeline figure"
            >
              <img
                src={sitePath('/assets/pipeline.png')}
                width={1270}
                height={383}
                alt="Original PersonaHate pipeline: persona construction, diversity-aware selection, multi-LLM generation, multi-judge annotation, and balanced training set construction."
              />
            </a>
            <figcaption>
              <strong>Figure 1.</strong> Overview of the PersonaHate pipeline.{' '}
              <a href={`${paper}#page=4`} target="_blank" rel="noreferrer">
                Paper, p. 4 ↗
              </a>
              <span className="figure-correction">
                The original figure’s voting label should read “at least four of
                six votes,” following §4.4.2.
              </span>
            </figcaption>
          </figure>
        </section>

        <DatasetComparison />

        <section id="personas">
          <h2>From source posts to generated posts</h2>
          <nav className="synthesis-steps" aria-label="Data synthesis stages">
            <a href="#persona-extraction">1. Extract personas</a>
            <span aria-hidden="true">→</span>
            <a href="#persona-selection">2. Select personas</a>
            <span aria-hidden="true">→</span>
            <a href="#generation">3. Generate posts</a>
          </nav>
          <h3 id="persona-extraction">1. Posts → personas</h3>
          <p>
            For the 4chan branch of the pipeline, GPT-4o infers a persona
            description from a source post, capturing the speaker’s expressed
            attitudes, background, and communication style. The two pairs below
            reproduce extraction examples from Table 16 of the paper.
          </p>
          <p className="content-note">
            <strong>Content note.</strong> The source posts contain offensive
            language. Asterisk redactions are preserved from the paper.
          </p>
          <PersonaExamples />
          <p className="inline-download">
            <a href={personas} download>
              Download the selected persona set (.jsonl) ↓
            </a>
            <span>
              2,285 descriptions · 1,000 PersonaHub + 1,285 4chan-derived
            </span>
          </p>
          <h3 id="persona-selection">2. Diversity-aware persona selection</h3>
          <p>
            The pool contains 200,000 PersonaHub personas and 257,473
            deduplicated 4chan-derived personas. Farthest-point sampling (FPS)
            selects descriptions that extend coverage in the embedding space,
            with 1,000 and 1,285 selected from the respective sources.
          </p>
          <figure className="paper-figure selection-figure">
            <a
              href={sitePath('/assets/persona-selection.png')}
              target="_blank"
              rel="noreferrer"
              aria-label="Open full-size persona selection figure"
            >
              <img
                src={sitePath('/assets/persona-selection.png')}
                width={1270}
                height={750}
                loading="lazy"
                alt="Six UMAP plots comparing random, FPS, and DA-FPS persona selection. Top row: PersonaHub. Bottom row: 4chan. Light points are the full persona pools; dark points are the selected subsets."
              />
            </a>
            <figcaption>
              <strong>Figure 3.</strong> Persona selection in UMAP projections.
              Light points represent each source pool; dark points represent
              selected personas. The random sample uses 1,003 PersonaHub and
              1,282 4chan personas; FPS and DA-FPS use 1,000 and 1,285. These
              plots show persona embeddings, not detector performance.{' '}
              <a href={`${paper}#page=19`} target="_blank" rel="noreferrer">
                Paper, p. 19 ↗
              </a>
            </figcaption>
          </figure>
          <PersonaGeneration />
        </section>

        <section id="results">
          <h2>Experimental results</h2>
          <p>
            Evaluation uses{' '}
            <strong>
              HateXplain, HateBenchSet, Davidson, and Measuring Hate Speech
              (MHS)
            </strong>
            . Select a model and benchmark to see how fine-tuning changes its F1
            score. Full comparison and ablation tables are available below.
          </p>
          <Results />
        </section>

        <section id="coverage">
          <h2>Identity-group coverage</h2>
          <p>
            Generation spans 34 identity groups in six categories. These labels
            identify generation and evaluation targets; they do not describe the
            persona’s own identity.
          </p>
          <Table className="paper-table coverage-table">
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Category</TableHead>
                <TableHead scope="col" className="number">
                  Groups
                </TableHead>
                <TableHead scope="col">Identity groups</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {identityGroups.map(([category, groups, count]) => (
                <TableRow key={category}>
                  <TableHead scope="row" className="model-label">
                    {category}
                  </TableHead>
                  <TableCell className="number">{count}</TableCell>
                  <TableCell>{groups}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="table-note">
            <a href={`${paper}#page=20`} target="_blank" rel="noreferrer">
              Table 19 ↗
            </a>
            . Identity-group names follow the paper.
          </p>
        </section>

        <section id="scope">
          <h2>Scope and intended use</h2>
          <p>
            The artifact supports hate speech detector training and safety
            evaluation. The study covers English text and the identity groups
            listed above. Synthetic data complements human-authored benchmarks;
            aggregate improvements should not be interpreted as improvement for
            every dataset or group. See the paper’s limitations and ethical
            considerations for further context.
          </p>
        </section>
      </main>
      <footer className="document-footer">
        <span>PersonaHate</span>
        <a href="#main">Back to top ↑</a>
      </footer>
    </>
  );
}
