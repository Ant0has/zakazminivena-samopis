import { CapacityPage, capacityMetadata } from '@/components/CapacityPage';
export const metadata = capacityMetadata(5);
export default function Page() { return <CapacityPage count={5} />; }
