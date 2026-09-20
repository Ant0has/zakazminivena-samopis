import { CapacityPage, capacityMetadata } from '@/components/CapacityPage';
export const metadata = capacityMetadata(7);
export default function Page() { return <CapacityPage count={7} />; }
