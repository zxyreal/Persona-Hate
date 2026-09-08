'use client';
import { Fragment } from 'react';
import { sitePath } from './site-path';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import FineTuningExplorer from './fine-tuning-explorer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ablations,
  benchmarkNames,
  comparisonGroups,
  fineTuning,
} from './research-data';
const pdf = sitePath('/assets/personahate-paper.pdf');
const score = (value: string | number) =>
  typeof value === 'number' ? value.toFixed(1) : value;
export default function Results() {
  return (
    <>
      <FineTuningExplorer />
      <Collapsible className="full-evidence">
        <CollapsibleTrigger className="evidence-toggle">
          Explore the full result tables <span aria-hidden="true">+</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Tabs defaultValue="finetuning" className="research-results">
            <TabsList
              variant="line"
              className="research-tabs"
              aria-label="Experiment results"
            >
              <TabsTrigger value="finetuning">Fine-tuning</TabsTrigger>
              <TabsTrigger value="comparison">Detector comparison</TabsTrigger>
              <TabsTrigger value="ablation">Diversity ablation</TabsTrigger>
            </TabsList>
            <TabsContent value="finetuning">
              <p className="experiment-description">
                <strong>Does PersonaHate improve existing detectors?</strong>{' '}
                Table 10 compares each model before and after fine-tuning.
                Average F1 improves for all eight models, while some individual
                benchmark scores decrease.
              </p>
              <div className="table-scroll-hint">
                F1 (%) on each benchmark. Horizontally scroll the table on
                smaller screens.
              </div>
              <Table className="paper-table fine-tuning-table">
                <TableHeader>
                  <TableRow>
                    <TableHead scope="col">Model</TableHead>
                    <TableHead scope="col">Setting</TableHead>
                    {benchmarkNames.map((x) => (
                      <TableHead scope="col" key={x} className="number">
                        {x}
                      </TableHead>
                    ))}
                    <TableHead scope="col" className="number average-col">
                      Avg. F1
                    </TableHead>
                    <TableHead scope="col" className="number">
                      Δ (pp)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fineTuning.map((row) => (
                    <Fragment key={row.model}>
                      <TableRow className="pair-first">
                        <TableHead
                          scope="rowgroup"
                          rowSpan={2}
                          className="model-label"
                        >
                          {row.model}
                        </TableHead>
                        <TableCell className="setting-label">
                          Zero-shot
                        </TableCell>
                        {row.before.map((x, i) => (
                          <TableCell
                            key={i}
                            className={`number ${i === 4 ? 'average-col' : ''}`}
                          >
                            {score(x)}
                          </TableCell>
                        ))}
                        <TableCell className="number">—</TableCell>
                      </TableRow>
                      <TableRow className="trained-row">
                        <TableCell className="setting-label">
                          + PersonaHate
                        </TableCell>
                        {row.after.map((x, i) => (
                          <TableCell
                            key={i}
                            className={`number ${i === 4 ? 'average-col' : ''} ${x < row.before[i] ? 'decrease' : ''}`}
                          >
                            {score(x)}
                            {x < row.before[i] && (
                              <span
                                className="down-mark"
                                aria-label="lower than baseline"
                              >
                                {' '}
                                ↓
                              </span>
                            )}
                          </TableCell>
                        ))}
                        <TableCell className="number">
                          +{row.delta.toFixed(1)}
                          <sup>{row.significance}</sup>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
              <p className="table-note">
                <a href={`${pdf}#page=11`} target="_blank" rel="noreferrer">
                  Table 10 ↗
                </a>
                . Fine-tuned results average five seeds. ↓ marks a decrease from
                the corresponding baseline. Significance: ** p &lt; 0.01; *** p
                &lt; 0.001, one-tailed one-sample t-test. Deltas follow the
                paper and may differ from subtraction of rounded scores.
              </p>
            </TabsContent>
            <TabsContent value="comparison">
              <p className="experiment-description">
                <strong>
                  How do trained encoders compare with other detectors?
                </strong>{' '}
                Table 9 includes commercial APIs, moderation tools, pretrained
                detectors, and general-purpose encoders trained on PersonaHate.
                The latter start from pretrained language models, without prior
                hate-specific training.
              </p>
              <Table className="paper-table">
                <TableHeader>
                  <TableRow>
                    <TableHead scope="col">Model</TableHead>
                    {benchmarkNames.map((x) => (
                      <TableHead scope="col" key={x} className="number">
                        {x}
                      </TableHead>
                    ))}
                    <TableHead scope="col" className="number">
                      Avg. Acc.
                    </TableHead>
                    <TableHead scope="col" className="number average-col">
                      Avg. F1
                    </TableHead>
                    <TableHead scope="col" className="number">
                      Avg. macro-F1
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonGroups.map((group) => (
                    <Fragment key={group.group}>
                      <TableRow className="group-row">
                        <TableHead colSpan={8} scope="colgroup">
                          {group.group}
                        </TableHead>
                      </TableRow>
                      {group.rows.map((row) => (
                        <TableRow
                          key={row[0]}
                          className={
                            row[0] === 'DeBERTa-v3' ? 'emphasis-row' : ''
                          }
                        >
                          <TableHead scope="row" className="model-label">
                            {row[0]}
                          </TableHead>
                          {row.slice(1).map((value, i) => (
                            <TableCell
                              key={i}
                              className={`number ${i === 5 ? 'average-col' : ''}`}
                            >
                              {score(value)}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
              <p className="table-note">
                <a href={`${pdf}#page=10`} target="_blank" rel="noreferrer">
                  Table 9 ↗
                </a>
                . Benchmark columns report F1 (%); the final three columns
                average accuracy, F1, and macro-F1 across all four benchmarks.
                PersonaHate-trained encoder results average five seeds (§6.2).
              </p>
            </TabsContent>
            <TabsContent value="ablation">
              <p className="experiment-description">
                <strong>
                  Does diversity help when training size is controlled?
                </strong>{' '}
                Table 13 uses DeBERTa-v3 and label-balanced training sets.
                Compare rows within the 2K or 10K sample budget to examine
                generator and identity-group coverage.
              </p>
              <Table className="paper-table">
                <TableHeader>
                  <TableRow>
                    <TableHead scope="col">Condition</TableHead>
                    <TableHead scope="col" className="number">
                      Samples
                    </TableHead>
                    <TableHead scope="col" className="number">
                      Groups
                    </TableHead>
                    <TableHead scope="col" className="number">
                      Generators
                    </TableHead>
                    {benchmarkNames.map((x) => (
                      <TableHead scope="col" key={x} className="number">
                        {x}
                      </TableHead>
                    ))}
                    <TableHead scope="col" className="number average-col">
                      Avg. F1
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ablations.map((row, i) => (
                    <TableRow
                      key={row[0]}
                      className={i === 3 ? 'budget-start' : ''}
                    >
                      <TableHead scope="row" className="model-label">
                        {row[0]}
                      </TableHead>
                      {row.slice(1).map((x, j) => (
                        <TableCell
                          className={`number ${j === 7 ? 'average-col' : ''}`}
                          key={j}
                        >
                          {j < 3 ? x : score(x)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="table-note">
                <a href={`${pdf}#page=13`} target="_blank" rel="noreferrer">
                  Table 13 ↗
                </a>
                . Five random seeds per condition. M = generators; G = identity
                groups. Results are F1 (%). The 2K comparison changes average F1
                from 64.5 (1M1G) to 72.6 (8M34G).
              </p>
            </TabsContent>
          </Tabs>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
