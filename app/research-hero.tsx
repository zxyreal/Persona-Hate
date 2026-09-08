import {
  ArrowDown,
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
            Persona download: 2,285 descriptions · JSONL
          </p>
        </div>
        <aside
          className="synthesis-portrait"
          aria-label="PersonaHate dataset construction summary"
        >
          <div className="portrait-label">
            <span>PERSONA → TEXT</span>
            <span>§4.2–4.4</span>
          </div>
          <div className="portrait-input">
            <strong>2,285</strong>
            <span>selected personas</span>
          </div>
          <div className="portrait-process">
            <ArrowDown aria-hidden="true" />
            <p>
              <strong>8</strong> generators <span> / </span> <strong>34</strong>{' '}
              identity groups
            </p>
          </div>
          <div className="portrait-output">
            <strong>791,283</strong>
            <span>valid generated samples</span>
          </div>
          <div className="portrait-footnote">
            <span>6 annotation judges</span>
            <a href={`${paper}#page=6`} target="_blank" rel="noreferrer">
              Method <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>
      <div className="headline-results" aria-label="Results at a glance">
        <a href="#overview">
          <span>Balanced training set</span>
          <strong>67,452</strong>
          <small>Examples balanced by group and label</small>
        </a>
        <a href="#results">
          <span>Detector performance</span>
          <strong>
            77.5<em>% F1</em>
          </strong>
          <small>DeBERTa-v3 · average of four benchmarks</small>
        </a>
        <a href="#results">
          <span>Fine-tuning improvement</span>
          <strong>
            +7.7<em>pp</em>
          </strong>
          <small>Llama-3.1-8B · 70.7 → 78.4 average F1</small>
        </a>
      </div>
    </>
  );
}
