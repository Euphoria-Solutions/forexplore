import { readFile } from 'fs/promises';
import { NextRequest } from 'next/server';
import path from 'path';

export const GET = async (req: NextRequest) => {
  const os = req.nextUrl.toJSON().split('os=')[1].split('&')[0];
  const platform = req.nextUrl.toJSON().split('platform=')[1];

  const buffer = await readFile(
    path.join(
      process.cwd(),
      `/ea-scripts/${os ?? 'mac'}/`,
      `${platform}.${platform == 'mt5' ? 'mq5' : 'mq4'}`
    )
  );

  const headers = new Headers();
  headers.append('Content-Disposition', 'attachment; filename="mt5.mq5"');
  headers.append('Content-Type', 'html/text');

  return new Response(buffer, {
    headers,
  });
};
