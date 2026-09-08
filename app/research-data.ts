// Values transcribed from Tables 9, 10, and 13 of revised_version-2.pdf.
export const benchmarkNames = ['HateXplain', 'HateBenchSet', 'Davidson', 'MHS'];
export const comparisonGroups = [
  {
    group: 'Pretrained encoders',
    rows: [
      ['Detoxify-BERT', 63.5, 75.4, 73.6, 71.8, 73.9, 71.1, 73.1],
      ['Detoxify-RoBERTa', 63.7, 78.1, 71.9, 71.8, 74.4, 71.4, 73.6],
      ['LFTW-RoBERTa', 72.4, 79.4, 82.3, 66.7, 77.1, 75.2, 76.4],
      ['Cardiff-RoBERTa', 71.7, 82.7, 90.8, 68.8, 83.1, 78.5, 82.1],
    ],
  },
  {
    group: 'LLM APIs',
    rows: [
      ['GPT-4o-mini', 79.3, 89.2, 80.4, 70.1, 81.9, 79.7, 81.0],
      ['Claude-4-Sonnet', 82.8, 88.8, 81.5, 68.8, 83.7, 80.5, 82.8],
      ['Gemini-2.5-Flash', 84.4, 87.8, 82.5, 68.5, 84.5, 80.8, 83.5],
      ['Claude Opus 4.6', 81.6, 89.0, 78.1, 65.8, 82.8, 78.6, 81.7],
      ['Gemini-2.5-Pro', 87.5, 87.1, 69.9, 48.0, 83.1, 73.1, 80.1],
      ['DeepSeek V4-Flash', 83.6, 88.4, 77.8, 62.1, 83.5, 78.0, 82.1],
    ],
  },
  {
    group: 'Moderation tools',
    rows: [
      ['Llama Guard 3', 79.7, 85.5, 76.0, 56.2, 81.4, 74.3, 79.5],
      ['OpenAI Moderation', 75.6, 84.3, 76.8, 57.8, 80.4, 73.6, 78.6],
    ],
  },
  {
    group: 'Open-source LLMs',
    rows: [
      ['Llama-3.1-70B', 79.1, 89.1, 83.9, 72.3, 83.6, 81.1, 82.9],
      ['Qwen3-32B', 75.4, 87.8, 80.2, 72.2, 80.6, 78.9, 79.9],
      ['Mistral-Small-24B', 55.2, 61.0, 72.3, 60.9, 73.6, 62.3, 70.8],
    ],
  },
  {
    group: 'General-purpose encoders trained on PersonaHate',
    rows: [
      ['BERT', 64.5, 86.9, 74.3, 67.8, 77.0, 73.4, 75.9],
      ['RoBERTa', 66.7, 87.1, 74.7, 69.9, 76.3, 74.6, 75.4],
      ['DeBERTa-v3', 71.3, 88.9, 78.8, 70.9, 79.4, 77.5, 78.5],
      ['XLM-RoBERTa', 57.3, 86.8, 59.7, 61.8, 73.2, 66.4, 71.2],
    ],
  },
] as const;
export const fineTuning = [
  {
    model: 'Detoxify-BERT',
    before: [63.5, 75.4, 73.6, 71.8, 71.1],
    after: [65.0, 86.8, 79.0, 70.8, 75.4],
    delta: 4.3,
    significance: '***',
  },
  {
    model: 'Detoxify-RoBERTa',
    before: [63.7, 78.1, 71.9, 71.8, 71.4],
    after: [65.7, 87.1, 74.6, 69.2, 74.2],
    delta: 2.7,
    significance: '***',
  },
  {
    model: 'LFTW-RoBERTa',
    before: [72.4, 79.4, 82.3, 66.7, 75.2],
    after: [69.2, 87.8, 81.3, 70.8, 77.3],
    delta: 2.1,
    significance: '**',
  },
  {
    model: 'Cardiff-RoBERTa',
    before: [71.7, 82.7, 90.8, 68.8, 78.5],
    after: [74.1, 87.1, 84.6, 70.1, 79.0],
    delta: 0.5,
    significance: '**',
  },
  {
    model: 'Qwen-2.5-0.5B',
    before: [1.8, 24.6, 5.4, 4.7, 9.1],
    after: [59.7, 83.4, 62.4, 64.1, 67.4],
    delta: 58.3,
    significance: '***',
  },
  {
    model: 'Llama-3.2-1B',
    before: [32.6, 43.9, 23.0, 37.1, 34.2],
    after: [67.5, 83.4, 72.7, 68.9, 73.1],
    delta: 38.9,
    significance: '***',
  },
  {
    model: 'Llama-3.2-3B',
    before: [25.8, 79.5, 42.0, 44.2, 47.9],
    after: [77.1, 86.1, 81.8, 70.0, 78.7],
    delta: 30.8,
    significance: '***',
  },
  {
    model: 'Llama-3.1-8B',
    before: [69.3, 78.3, 74.4, 60.8, 70.7],
    after: [77.1, 85.8, 82.6, 68.0, 78.4],
    delta: 7.7,
    significance: '***',
  },
] as const;
export const ablations = [
  ['1M1G_2K', '2K', 1, 1, 63.7, 83.6, 48.5, 62.2, 64.5],
  ['8M1G_2K', '2K', 1, 8, 69.6, 85.6, 62.4, 65.6, 70.8],
  ['8M34G_2K', '2K', 34, 8, 67.8, 87.1, 66.9, 68.4, 72.6],
  ['1M5G_10K', '10K', 5, 1, 69.7, 87.7, 67.8, 64.5, 72.4],
  ['1M34G_10K', '10K', 34, 1, 69.7, 88.4, 72.8, 67.9, 74.7],
  ['8M5G_10K', '10K', 5, 8, 71.7, 88.6, 76.1, 69.1, 76.4],
] as const;
export const identityGroups = [
  [
    'Race / Ethnicity',
    'Asian; Black or African American; Latino or Non-White Hispanic; Middle Eastern; Native American or Alaska Native; Pacific Islander; Non-Hispanic White',
    7,
  ],
  [
    'Religion',
    'Atheists; Buddhists; Christians; Hindus; Jews; Mormons; Muslims',
    7,
  ],
  [
    'Immigration / Origin',
    'Immigrants; Migrant Workers; People From a Specific Country; Undocumented People; Refugees',
    5,
  ],
  [
    'Gender',
    'Men; Women; Non-Binary or Third Gender; Transgender Men; Transgender Women; Transgender (Unspecified)',
    6,
  ],
  ['Sexual Orientation', 'Bisexual; Gay; Lesbian; Heterosexual', 4],
  [
    'Disability',
    'Physical Disabilities; Cognitive Disorders or Learning Disability; Mental Health Problems; Visually Impaired; Hearing Impaired',
    5,
  ],
] as const;
