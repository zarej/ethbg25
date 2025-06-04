import Campaign from '../components/Campaign';
import Investments from '../components/Investments';

export default function Campaigns() {
  return (
    <div className="py-6">
      <h1 className="text-3xl mb-6">THE BRISTOL RESIDENCES</h1>
      <div className="flex flex-row gap-6">
        <Campaign />
        <Investments />
      </div>
    </div>
  );
}
