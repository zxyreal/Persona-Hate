'use client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { sitePath } from './site-path';
import { personaExamples } from './persona-examples-data';

export default function PersonaExamples() {
  return (
    <Tabs defaultValue={personaExamples[0].postId} className="persona-examples">
      <TabsList
        variant="line"
        className="research-tabs"
        aria-label="Persona extraction examples"
      >
        {personaExamples.map((example, index) => (
          <TabsTrigger key={example.postId} value={example.postId}>
            Example {index + 1}
          </TabsTrigger>
        ))}
      </TabsList>
      {personaExamples.map((example) => (
        <TabsContent key={example.postId} value={example.postId}>
          <div className="extraction-grid">
            <div className="extraction-panel source-post">
              <h3>Original post</h3>
              <p className="extraction-meta">
                4chan /pol/ · Post #{example.postId}
              </p>
              <blockquote>{example.sourcePost}</blockquote>
            </div>
            <div className="extraction-arrow" aria-hidden="true">
              <span>→</span>
            </div>
            <div className="extraction-panel extracted-persona">
              <h3>Extracted persona</h3>
              <p className="extraction-meta">
                Inferred from the post with GPT-4o
              </p>
              <blockquote>{example.extractedPersona}</blockquote>
            </div>
          </div>
          <p className="example-provenance">
            <a
              href={sitePath('/assets/personahate-paper.pdf#page=18')}
              target="_blank"
              rel="noreferrer"
            >
              Table 16, p. 18 ↗
            </a>
            <span>
              Perspective API identity attack score:{' '}
              {example.perspectiveIdentityAttackScore.toFixed(2)}
            </span>
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
}
