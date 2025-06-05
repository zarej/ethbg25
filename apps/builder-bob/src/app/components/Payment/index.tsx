import { useState } from 'react';
import Button from '../Button';

export default function Payment({
  price = 0.05,
  onPay,
}: {
  price: number;
  onPay?: (price: number) => void;
}) {
  const [totalPrice, setTotalPrice] = useState<number>(price);

  return (
    <div className="border p-5 flex flex-col gap-3 rounded-xl w-full h-fit">
      <div className="w-full">
        <p className="text-sm text-gray-700">Total price</p>
        <div className="flex flex-row justify-between items-center gap-3">
          <input
            type="text"
            value={price.toFixed(3)}
            className="border rounded w-full px-3 py-1"
            onChange={(e) => setTotalPrice(Number(e.target.value))}
          />
          <p className="min-w-fit">ETH</p>
        </div>
      </div>
      <Button onClick={() => onPay?.(totalPrice)}>Bid</Button>
    </div>
  );
}
