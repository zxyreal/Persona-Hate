'use client';

import { sitePath } from './site-path';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ComparisonBars, ExplorerSelect } from './explorer-controls';
import { semanticGroups, lexicalMetrics } from './dataset-comparison-data';
import {
  datasetProfiles,
  profileDimensions,
  personaHateProfile,
} from './dataset-profiles';

const signed = (value: number, decimals: number) =>
  `${value > 0 ? '+' : ''}${value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;

export default function DatasetComparison() {
  const [group, setGroup] = useState(semanticGroups[0].group as string);
  const [metricId, setMetricId] = useState('distinct1');
  const [datasetId, setDatasetId] = useState('hatebench');
  const semantic =
    semanticGroups.find((row) => row.group === group) ?? semanticGroups[0];
  const metric =
    lexicalMetrics.find((row) => row.id === metricId) ?? lexicalMetrics[0];
  const dataset =
    datasetProfiles.find((row) => row.id === datasetId) ?? datasetProfiles[0];
  const formatLexical = (value: number) =>
    value.toLocaleString('en-US', {
      minimumFractionDigits: metric.decimals,
      maximumFractionDigits: metric.decimals,
    });

  return (
    <section id="dataset-comparison">
      <h2>Compare datasets</h2>
      <p>
        Compare PersonaHate with HateBenchSet by identity group and vocabulary,
        or examine how its construction differs from other datasets.
      </p>
      <Tabs defaultValue="semantic" className="dataset-comparison-tabs">
        <TabsList
          variant="line"
          className="research-tabs"
          aria-label="Dataset comparison view"
        >
          <TabsTrigger value="semantic">By identity group</TabsTrigger>
          <TabsTrigger value="lexical">Vocabulary</TabsTrigger>
          <TabsTrigger value="design">Dataset design</TabsTrigger>
        </TabsList>
        <TabsContent value="semantic">
          <div className="evidence-explorer">
            <div className="explorer-controls">
              <ExplorerSelect
                id="diversity-group"
                label="Target identity group"
                value={group}
                onChange={setGroup}
                options={semanticGroups.map((row) => ({
                  value: row.group,
                  label: row.group,
                }))}
              />
              <div className="explorer-context">
                Same target group
                <br />
                <strong>Two generated corpora</strong>
              </div>
            </div>
            <div
              className="explorer-result"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="explorer-reading">
                <span
                  className={`explorer-delta ${semantic.delta < 0 ? 'negative' : ''}`}
                >
                  {signed(semantic.delta, 3)}
                </span>
                <div>
                  <strong>{group}</strong>
                  <p>PersonaHate − HateBenchSet · semantic diversity</p>
                </div>
              </div>
              <ComparisonBars
                max={1}
                format={(value) => value.toFixed(3)}
                unit="Average pairwise cosine distance · larger means more dispersed text embeddings"
                rows={[
                  {
                    label: 'PersonaHate',
                    value: semantic.personaHate,
                    tone: 'primary',
                  },
                  {
                    label: 'HateBenchSet',
                    value: semantic.hateBenchSet,
                    tone: 'reference',
                  },
                ]}
              />
            </div>
            <div className="comparison-exceptions">
              <span>Lower-diversity cases:</span>
              {semanticGroups
                .filter((row) => row.delta < 0)
                .map((row) => (
                  <Button
                    key={row.group}
                    variant="outline"
                    className="exception-button"
                    aria-pressed={group === row.group}
                    onClick={() => setGroup(row.group)}
                  >
                    {row.group}
                  </Button>
                ))}
            </div>
            <p className="table-note">
              <a
                href={sitePath('/assets/personahate-paper.pdf#page=23')}
                target="_blank"
                rel="noreferrer"
              >
                Table 24 ↗
              </a>
              . Hate-labeled texts, grouped by target identity. The table
              reports higher diversity for PersonaHate in 31 of 34 groups.
              Values and deltas follow the table; Figure 4’s 32/34 count
              differs. This is a corpus-diversity measure, not detector accuracy
              or a causal estimate of the persona effect.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="lexical">
          <div className="evidence-explorer">
            <div className="explorer-controls">
              <ExplorerSelect
                id="lexical-metric"
                label="Vocabulary measure"
                value={metricId}
                onChange={setMetricId}
                options={lexicalMetrics.map((row) => ({
                  value: row.id,
                  label: row.name,
                }))}
              />
              <div className="explorer-context">
                Equal sample size
                <br />
                <strong>7,838 texts per dataset</strong>
              </div>
            </div>
            <div
              className="explorer-result"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="explorer-reading">
                <span className="explorer-delta">
                  {signed(
                    metric.personaHate - metric.hateBenchSet,
                    metric.decimals,
                  )}
                </span>
                <div>
                  <strong>{metric.name}</strong>
                  <p>PersonaHate − HateBenchSet</p>
                </div>
              </div>
              <ComparisonBars
                max={metric.max}
                format={formatLexical}
                unit={metric.unit}
                rows={[
                  {
                    label: 'PersonaHate',
                    value: metric.personaHate,
                    tone: 'primary',
                  },
                  {
                    label: 'HateBenchSet',
                    value: metric.hateBenchSet,
                    tone: 'reference',
                  },
                ]}
              />
            </div>
            <p className="table-note">
              <a
                href={sitePath('/assets/personahate-paper.pdf#page=19')}
                target="_blank"
                rel="noreferrer"
              >
                Table 18 ↗
              </a>
              . Distinct-n is the number of unique n-grams divided by all
              n-grams. These results use the table’s matched 7,838-text samples;
              the full corpora contain 791,283 and 7,838 texts, respectively.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="design">
          <div className="evidence-explorer">
            <div className="explorer-controls">
              <ExplorerSelect
                id="comparison-dataset"
                label="Compare PersonaHate with"
                value={datasetId}
                onChange={setDatasetId}
                options={datasetProfiles.map((row) => ({
                  value: row.id,
                  label: row.name,
                }))}
              />
            </div>
            <div aria-live="polite">
              <p className="dataset-context">{dataset.context}</p>
              <Table className="paper-table dataset-design-table">
                <TableHeader>
                  <TableRow>
                    <TableHead scope="col">Dimension</TableHead>
                    <TableHead scope="col">PersonaHate</TableHead>
                    <TableHead scope="col">{dataset.name}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profileDimensions.map((dimension, index) => (
                    <TableRow key={dimension}>
                      <TableHead scope="row">{dimension}</TableHead>
                      <TableCell>{personaHateProfile[index]}</TableCell>
                      <TableCell>{dataset.values[index]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="table-note">
              Sources:{' '}
              <a
                href={sitePath('/assets/personahate-paper.pdf#page=4')}
                target="_blank"
                rel="noreferrer"
              >
                PersonaHate §§4.2–4.4 ↗
              </a>{' '}
              ·{' '}
              <a href={dataset.source} target="_blank" rel="noreferrer">
                {dataset.name} original paper ↗
              </a>
              . Corpus totals and training/evaluation subsets are distinguished;
              target taxonomies and annotation schemes are not interchangeable.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
