import Button from '../Button';
import BuilderBob from './../../../assets/builder-bob.png';

export default function Header() {
  return (
    <div className="py-3 px-4 border-b shadow">
      <div className="flex flex-row justify-between max-w-4xl mx-auto">
        <img src={BuilderBob} alt="Nx Logo" width="75" height="50" />
        <Button>Connect a wallet</Button>
      </div>
    </div>
  );
}
