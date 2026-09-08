// Construction facts from the original papers, not inferred from selected text examples.
export const profileDimensions = [
  'Construction',
  'Speaker context',
  'Target coverage',
  'Annotation',
  'Corpus and subsets',
] as const;
export const personaHateProfile = [
  'Persona-conditioned generation with eight LLMs.',
  '2,285 personas sampled from PersonaHub and 4chan-derived descriptions.',
  '34 predefined target groups across six categories.',
  'Six automated judges; at least four hate votes assign a hate label.',
  '791,283 valid generated texts; 67,452 retained in a balanced training set.',
] as const;

export const datasetProfiles = [
  {
    id: 'hatebench',
    name: 'HateBenchSet',
    source: 'https://arxiv.org/html/2501.16750v1',
    context:
      'The closest direct comparison: both datasets use 34 predefined identity groups. The diversity panels compare these two corpora.',
    values: [
      'Template-based generation with six LLMs, including original and jailbreak settings.',
      'No independently sampled speaker-profile pool.',
      '34 predefined target groups across six categories.',
      'Two human annotators; a third resolves disagreements by majority vote.',
      '11,016 raw generations; 7,838 evaluation texts after excluding N/A outputs.',
    ],
  },
  {
    id: 'toxigen',
    name: 'ToxiGen',
    source: 'https://arxiv.org/html/2203.09509',
    context:
      'A comparison of synthesis methods. ToxiGen is not one of the four external evaluation benchmarks in the PersonaHate experiments.',
    values: [
      'GPT-3 generation from example prompts, including classifier-guided decoding with ALICE.',
      'No independently sampled persona condition.',
      '13 minority groups in a US sociocultural context.',
      'Prompt-derived proxy labels for the large corpus; separate human-annotated subsets.',
      '274,186 generated texts; the paper also describes an 8,960-text human-annotated training subset.',
    ],
  },
  {
    id: 'hatexplain',
    name: 'HateXplain',
    source: 'https://arxiv.org/html/2012.10289',
    context:
      'A human-authored benchmark with target-community annotations and token-level rationales. Its observed communities are not a predefined generation taxonomy.',
    values: [
      'Human-authored Twitter and Gab posts collected with lexicon-based queries.',
      'Not applicable: the posts are collected, rather than generated from personas.',
      'Observed target communities; ten communities retained under the original paper’s analysis criteria.',
      'Three annotators: hate/offensive/normal, target communities, and supporting text spans.',
      '20,148 original posts; 19,229 in the original paper’s analysis after excluding complete label disagreements.',
    ],
  },
] as const;
