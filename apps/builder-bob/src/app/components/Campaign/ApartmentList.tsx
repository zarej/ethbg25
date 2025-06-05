import { NavLink } from 'react-router-dom';
import useBuildingApartments from '../../hooks/useBuildingApartments';
import Spinner from '../Spinner';

export default function ApartmentList({ buildingId }: { buildingId: number }) {
  const { data, isLoading } = useBuildingApartments(buildingId);

  if (isLoading || !data) {
    return (
      <div className="w-full h-full bg-gray-200">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-1">
      {data.map(({ number, sizeInSqM, pricePerSqM, metadataDecoded }) => (
        <NavLink
          key={number}
          to={`/campaign/${buildingId}/apartment/${number}`}
          className="p-3 bg-gray-600 w-full text-white rounded-md"
        >
          Apartment {number}, Floor {metadataDecoded.floor}, {sizeInSqM}m2,{' '}
          {pricePerSqM} ETH/m2
        </NavLink>
      ))}
    </div>
  );
}
