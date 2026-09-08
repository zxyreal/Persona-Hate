'use client';

import { sitePath } from './site-path';
import { useState } from 'react';
import { benchmarkNames, fineTuning } from './research-data';
import { ComparisonBars, ExplorerSelect } from './explorer-controls';

export default function FineTuningExplorer() {
  const [model, setModel] = useState('Llama-3.1-8B');
  const [benchmark, setBenchmark] = useState('4');
  const row = fineTuning.find((item) => item.model === model) ?? fineTuning[7];
  const index = Number(benchmark);
  const delta =
    index === 4
      ? row.delta
      : Number((row.after[index] - row.before[index]).toFixed(1));
  const metric =
    index === 4 ? 'Average across four benchmarks' : benchmarkNames[index];

  return (
    <div className="evidence-explorer">
      <div className="explorer-controls">
        <ExplorerSelect
          id="fine-tuning-model"
          label="Detector"
          value={model}
          onChange={setModel}
          options={fineTuning.map((item) => ({
            value: item.model,
            label: item.model,
          }))}
        />
        <ExplorerSelect
          id="fine-tuning-benchmark"
          label="Evaluation benchmark"
          value={benchmark}
          onChange={setBenchmark}
          options={[
            { value: '4', label: 'Average F1' },
            ...benchmarkNames.map((name, i) => ({
              value: String(i),
              label: name,
            })),
          ]}
        />
      </div>
      <div className="explorer-result" aria-live="polite" aria-atomic="true">
        <div className="explorer-reading">
          <span className={`explorer-delta ${delta < 0 ? 'negative' : ''}`}>
            {delta > 0 ? '+' : ''}
            {delta.toFixed(1)}
            <small> pp</small>
          </span>
          <div>
            <strong>{model}</strong>
            <p>{metric} · F1 after fine-tuning on PersonaHate</p>
          </div>
        </div>
        <ComparisonBars
          max={100}
          unit="F1 (%) · higher is better"
          format={(value) => value.toFixed(1)}
          rows={[
            {
              label: 'Before fine-tuning',
              value: row.before[index],
              tone: 'reference',
            },
            {
              label: '+ PersonaHate',
              value: row.after[index],
              tone: 'primary',
            },
          ]}
        />
      </div>
      <p className="table-note">
        <a
          href={sitePath('/assets/personahate-paper.pdf#page=11')}
          target="_blank"
          rel="noreferrer"
        >
          Table 10 ↗
        </a>
        . Fine-tuned results average five seeds. Average deltas use the paper’s
        reported values; benchmark deltas use the displayed rounded scores. This
        comparison measures fine-tuning effects, not performance after training
        on alternative datasets.
      </p>
    </div>
  );
}
