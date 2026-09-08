import {
  Infinity as InfinityIcon,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  Download,
} from 'lucide-react';
import { publication } from './publication';

export default function ResearchHero({
  paper,
  personas,
  artifact,
}: {
  paper: string;
  personas: string;
  artifact: string;
}) {
  return (
    <>
      <div className="paper-heading">
        <div className="hero-copy">
          <p className="paper-venue">{publication.venue}</p>
          <h1>
            <span className="project-name">
              Persona<span>Hate</span>
              <span className="sr-only">: </span>
            </span>
            <span className="paper-title">
              A Scalable Persona-Based Data Synthesis Pipeline for Hate Speech
              Analysis
            </span>
          </h1>
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
              <BookOpen aria-hidden="true" /> Read the paper{' '}
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={artifact} target="_blank" rel="noreferrer">
              <Code2 aria-hidden="true" /> Code
            </a>
            <a href={personas} download>
              <Download aria-hidden="true" /> Personas
            </a>
          </div>
          <p className="download-detail">
            Selected persona descriptions · JSONL download
          </p>
        </div>
        <aside
          className="synthesis-portrait expansion-portrait"
          aria-label="Extensible persona-driven data synthesis"
        >
          <div className="portrait-label">
            <span>SCALABLE BY DESIGN</span>
            <span>§5.3</span>
          </div>
          <InfinityIcon
            className="expansion-symbol"
            strokeWidth={1.2}
            aria-hidden="true"
          />
          <h2>
            Open-ended
            <br />
            data synthesis
          </h2>
          <p className="expansion-description">
            Extend the persona pool, target groups, and generators through the
            same pipeline.
          </p>
          <div
            className="expansion-flow"
            aria-label="Shared generation and annotation stages"
          >
            <span>New inputs</span>
            <ArrowRight aria-hidden="true" />
            <span>Generate</span>
            <ArrowRight aria-hidden="true" />
            <span>Annotate</span>
          </div>
          <div className="portrait-footnote">
            <span>Modular · parallelizable</span>
            <a href={`${paper}#page=8`} target="_blank" rel="noreferrer">
              Scalability <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>
      <div
        className="headline-results scalability-axes"
        aria-label="Dimensions of pipeline expansion"
      >
        <a href="#persona-selection">
          <span>Persona space</span>
          <strong>Expand the pool</strong>
          <small>Broaden backgrounds, views, and communication styles.</small>
        </a>
        <a href="#coverage">
          <span>Target coverage</span>
          <strong>Add new targets</strong>
          <small>Adapt to identity groups and emerging hate topics.</small>
        </a>
        <a href="#overview">
          <span>Model choice</span>
          <strong>Add generators</strong>
          <small>Reuse persona selection, prompts, and annotation.</small>
        </a>
      </div>
    </>
  );
}
