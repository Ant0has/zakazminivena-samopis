import { CapacityPage, capacityMetadata } from '@/components/CapacityPage';
export const metadata = capacityMetadata(6);
export default function Page() { return <CapacityPage count={6} />; }
