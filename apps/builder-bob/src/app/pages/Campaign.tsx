import { useParams } from 'react-router-dom';
import Campaign from '../components/Campaign';
import Investments from '../components/Investments';
import useBuildingData from '../hooks/useBuildingDeta';
import Spinner from '../components/Spinner';

export default function Campaigns() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data } = useBuildingData(Number(id));

  if (isLoading || !data) {
    return (
      <div className="w-full h-full bg-gray-200">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="py-6">
      <h1 className="text-3xl mb-6">{data.name}</h1>
      <div className="flex flex-row gap-6">
        <Campaign data={data} />
        <Investments />
      </div>
    </div>
  );
}
