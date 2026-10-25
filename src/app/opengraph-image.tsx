import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site-config';

export const alt = 'Duncan Tima — UI/UX & Product Designer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const logo = await readFile(
    join(process.cwd(), 'public', siteConfig.logo.dark.src),
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
        background: '#0b0b0c',
        color: '#f4f3f0',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img src={logoSrc} width={140} height={104} alt="" />
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#8a8a8f',
          }}
        >
          UI/UX & Product Design
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: -3 }}>
          Complex products.
        </div>
        <div
          style={{
            fontSize: 84,
            lineHeight: 1.02,
            letterSpacing: -3,
            color: '#8a8a8f',
          }}
        >
          Clear experiences.
        </div>
        <div style={{ marginTop: 36, fontSize: 28, color: '#b4b4b8' }}>
          Duncan Tima
        </div>
      </div>
    </div>,
    size,
  );
}
