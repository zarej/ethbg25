import { useState } from 'react';
import Button from '../Button';

export default function Payment() {
  const [squareMeters, setSquareMeters] = useState<number>(1);

  return (
    <div className="border p-5 flex flex-col gap-3 rounded-xl w-full h-fit">
      <div className="w-full mb-4">
        <p className="text-sm text-gray-700">Square meters</p>
        <input
          onChange={(e) => setSquareMeters(Number(e.target.value))}
          type="number"
          placeholder="1"
          value={squareMeters}
          className="border rounded w-full px-3 py-1"
        />
      </div>
      <div className="w-full">
        <p className="text-sm text-gray-700">Total price</p>
        <div className="flex flex-row justify-between items-center gap-3">
          <input
            disabled
            readOnly
            type="text"
            value={(squareMeters * 0.05).toFixed(3)}
            className="border rounded w-full px-3 py-1"
          />
          <p className="min-w-fit">ETH</p>
        </div>
      </div>
      <Button>Invest</Button>
    </div>
  );
}
