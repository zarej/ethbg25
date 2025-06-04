import Hr from '../Hr';
import Bluprint from './../../../assets/bluepring.jpeg';

export default function Apartment() {
  return (
    <div className="max-w-[600px]">
      <img src={Bluprint} className="rounded-md" />
      <Hr />
      <div className="flex flex-row gap-4">
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">doorbell</span> 1
        </p>
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">stairs_2</span> 1 floor
        </p>
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">square_foot</span> 33m2
        </p>
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">schema</span> 3 rooms
        </p>
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">attach_money</span>{' '}
          0.05/m2
        </p>
      </div>
    </div>
  );
}
