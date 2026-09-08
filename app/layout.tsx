import type { Metadata } from 'next';
import { publication } from './publication';
import { sitePath, siteUrl } from './site-path';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `PersonaHate | ${publication.venue}`,
  authors: publication.authors.map(({ name }) => ({ name })),
  description:
    'ACM CCS 2026. An extensible persona-based data synthesis pipeline for hate speech analysis, designed for incremental expansion across personas, target groups, and generators.',
  icons: { icon: sitePath('/favicon.svg') },
  openGraph: {
    title:
      'PersonaHate: A Scalable Persona-Based Data Synthesis Pipeline for Hate Speech Analysis — ACM CCS 2026',
    description:
      'Persona-driven data synthesis that can expand with new target groups and generators through modular, parallelizable generation and annotation.',
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
