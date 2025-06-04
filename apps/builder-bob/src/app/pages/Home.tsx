import Campaign from '../components/Campaign';

export default function Home() {
  return (
    <div className="py-6 flex flex-col gap-6">
      <h1 className="text-3xl">Overview</h1>
      <p>Checkout campaigns and participate</p>

      <Campaign.List />
    </div>
  );
}
