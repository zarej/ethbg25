import { useParams } from 'react-router-dom';
import Campaign from '../components/Campaign';
import Payment from '../components/Payment';
import useApartmentData from '../hooks/useApartmentData';
import Spinner from '../components/Spinner';
import useApartmentBuyoutContract from '../hooks/useApartmentBuyout';
import { useState } from 'react';

export default function Apartment() {
  const { id, apartment } = useParams<{ id: string; apartment: string }>();

  const { data, building, isLoading } = useApartmentData(
    Number(id),
    Number(apartment)
  );
  const { buyout } = useApartmentBuyoutContract(Number(apartment));

  const [bidButtonDisabled, setBidButtonDisabled] = useState<boolean>(false);

  const onBuy = async (price: any) => {
    setBidButtonDisabled(true);
    await buyout(`${price}`);
    setBidButtonDisabled(false);
  };

  if (isLoading || !data || !building) {
    return (
      <div className="w-full h-full bg-gray-200">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="py-6">
      <h1 className="text-3xl mb-6">
        {building.name}, Apartment {apartment}
      </h1>
      <div className="flex flex-row gap-6">
        <Campaign.Apartment
          number={apartment}
          floor={data.floor}
          size={data.size}
          price={data.price}
        />
        <Payment
          price={parseFloat(data.size) * parseFloat(data.price)}
          onPay={onBuy}
          disabled={bidButtonDisabled}
        />
      </div>
    </div>
  );
}
