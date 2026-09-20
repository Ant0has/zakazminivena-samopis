import { TripConstructor } from './TripConstructor';
export function PriceCalculator({ defaultFrom = '' }: { defaultFrom?: string } = {}) {
  return <TripConstructor defaultFrom={defaultFrom} />;
}
