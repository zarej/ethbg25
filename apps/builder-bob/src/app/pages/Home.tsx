import Campaign from '../components/Campaign';
import Spinner from '../components/Spinner';
import useBuildingRegistryContract from '../hooks/useBuildingRegistryContract';

export default function Home() {
  const { buildingCount, isLoading } = useBuildingRegistryContract();

  if (isLoading) {
    return (
      <div className="py-6 flex flex-col gap-6">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="py-6 flex flex-col gap-6">
      <h1 className="text-3xl">Overview</h1>
      <p>Checkout campaigns and participate</p>

      <Campaign.List campaignsTotal={buildingCount} />
    </div>
  );
}
