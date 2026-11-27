import { kazanTransferAt } from '@/lib/kazan-transfers';
import { getJourneyIllustration } from '@/lib/journey-illustrations';
import { kazanArtSeason } from '@/lib/kazan-art-calendar';

// The landing can stay statically generated across a seasonal change.
export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{city: string}> }) {
  const { city } = await params;
  const route = kazanTransferAt('/airport/kzn/' + city);
  if (!route) return new Response(null, { status: 404 });

  const season = kazanArtSeason(new Date());
  const asset = season === 'standard'
    ? getJourneyIllustration(route.path).src
    : `/images/journeys/kzn-${city}-transfer-${season}-v1.webp`;
  const compact = new URL(request.url).searchParams.get('size') === 'mobile';
  const location = compact ? '/_next/image?' + new URLSearchParams({ url: asset, w: '750', q: '75' }) : asset;
  // Only the dated choice is uncached. The image and its resized variant are cacheable.
  return new Response(null, { status: 307, headers: { Location: location, 'Cache-Control': 'no-store' } });
}
