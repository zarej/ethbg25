import Hr from '../Hr';
import Bluprint from './../../../assets/bluepring.jpeg';

export default function Apartment({
  number,
  floor,
  size,
  price,
}: {
  number?: string;
  floor?: string;
  size?: string;
  price?: string;
}) {
  return (
    <div className="max-w-[600px]">
      <img src={Bluprint} className="rounded-md" />
      <Hr />
      <div className="flex flex-row gap-4">
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">doorbell</span> {number}
        </p>
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">stairs_2</span> {floor}{' '}
          floor
        </p>
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">square_foot</span> {size}
          m2
        </p>
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">attach_money</span>{' '}
          {price || 0}/m2
        </p>
      </div>
    </div>
  );
}
