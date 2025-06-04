import Campaign from '../components/Campaign';
import Payment from '../components/Payment';

export default function Apartment() {
  return (
    <div className="py-6">
      <h1 className="text-3xl mb-6">THE BRISTOL RESIDENCES, Apartment 1</h1>
      <div className="flex flex-row gap-6">
        <Campaign.Apartment />
        <Payment />
      </div>
    </div>
  );
}
