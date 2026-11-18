import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site-config';

export const alt = 'ABCD — A Better Creative Direction';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const logo = await readFile(
    join(process.cwd(), 'public', siteConfig.logo.horizontal.dark.src),
  );
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: '#1b1b1b',
        color: '#f6f3eb',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img src={logoSrc} width={300} height={88} alt="" />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 20,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: '#e7e6e2',
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#4f8a68',
            }}
          />
          Independent Creative Consultancy
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 78, lineHeight: 1.04, letterSpacing: -3 }}>
          Good design is
        </div>
        <div
          style={{
            fontSize: 78,
            lineHeight: 1.04,
            letterSpacing: -3,
            color: '#b3b2ab',
          }}
        >
          just the beginning.
        </div>
        <div
          style={{
            marginTop: 34,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 24,
            color: '#e7e6e2',
          }}
        >
          <span>Brand Design</span>
          <span style={{ color: '#4f8a68' }}>·</span>
          <span>Digital Experiences</span>
          <span style={{ color: '#4f8a68' }}>·</span>
          <span>Product Design</span>
        </div>
      </div>
    </div>,
    size,
  );
}
