import type { Metadata } from 'next';
import { publication } from './publication';
import { sitePath, siteUrl } from './site-path';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `PersonaHate | ${publication.venue}`,
  authors: publication.authors.map(({ name }) => ({ name })),
  description:
    'ACM CCS 2026. A scalable persona-based data synthesis pipeline for hate speech analysis. Explore the methodology, research results, and 2,285 selected persona descriptions.',
  icons: { icon: sitePath('/favicon.svg') },
  openGraph: {
    title:
      'PersonaHate: A Scalable Persona-Based Data Synthesis Pipeline for Hate Speech Analysis — ACM CCS 2026',
    description:
      '791,283 generated samples. 34 identity groups. Persona-driven supervision for more robust hate speech detectors.',
    type: 'website',
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
