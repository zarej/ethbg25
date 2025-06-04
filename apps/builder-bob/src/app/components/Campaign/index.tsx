import Hr from '../Hr';
import Bristol from './../../../assets/bristol2.webp';
import Apartment from './Apartment';

const Campaign = () => {
  return (
    <div className="max-w-[600px]">
      <img src={Bristol} className="rounded-md" />
      <p className="text-gray-700 mt-4">
        Bristol Residences has been developed as a premium residential complex
        in the form of a "U", with an internal yard. At your doorstep, there are
        shops, cafes, restaurants and a swimming pool surrounded by greenery,
        with integrated hydromassage baths and accompanying facilities, as well
        as Residence Club, gym and meeting office and work office.
      </p>
      <Hr />
      <div className="flex flex-col gap-4">
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">apartment</span> 33
          apartments
        </p>
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">stairs_2</span> 5 floors
        </p>
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">attach_money</span>{' '}
          Belgrade Waterfront
        </p>
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">location_on</span>{' '}
          Karađorđeva 50, Beograd 11000
        </p>
      </div>
      <Hr />
      <div className="w-full flex flex-col gap-1">
        <a
          href="/campaign/1/apartment/1"
          className="p-3 bg-gray-600 w-full text-white rounded-md"
        >
          Apartment 1, Floor 1, 33m2, 0.05/m2
        </a>
        <a
          href="/campaign/1/apartment/2"
          className="p-3 bg-gray-600 w-full text-white rounded-md"
        >
          Apartment 1, Floor 1, 33m2, 0.05/m2
        </a>
        <a
          href="/campaign/1/apartment/3"
          className="p-3 bg-gray-600 w-full text-white rounded-md"
        >
          Apartment 1, Floor 1, 33m2, 0.05/m2
        </a>
        <a
          href="/campaign/1/apartment/4"
          className="p-3 bg-gray-600 w-full text-white rounded-md"
        >
          Apartment 1, Floor 1, 33m2, 0.05/m2
        </a>
        <a
          href="/campaign/1/apartment/5"
          className="p-3 bg-gray-600 w-full text-white rounded-md"
        >
          Apartment 1, Floor 1, 33m2, 0.05/m2
        </a>
        <a
          href="/campaign/1/apartment/6"
          className="p-3 bg-gray-600 w-full text-white rounded-md"
        >
          Apartment 1, Floor 1, 33m2, 0.05/m2
        </a>
      </div>
    </div>
  );
};

function CampaignEmbed() {
  return (
    <div className="rounded-md relative">
      <a
        href="/campaign/1"
        className="absolute top-0 left-0 w-full h-full cursor-pointer z-[999]"
      />
      <img src={Bristol} />
      <div
        className="absolute top-0 left-0 w-[70%] h-full bg-lime-500 rounded-s-sm pt-3 px-3 flex flex-col py-12
"
      >
        <p className="text-sm text-gray-700 mb-3">Bob The Builder</p>
        <p className="text-3xl text-bold">THE BRISTOL RESIDENCES</p>
        <p className="text-md text-slate-700 mt-auto">
          Karađorđeva 50, Beograd 11000
        </p>
      </div>
    </div>
  );
}

function CampaignList() {
  return (
    <div className="border p-5 rounded-xl">
      <p className="mb-3">4 campaigns</p>
      <div className="grid grid-cols-2 gap-4">
        <Campaign.Embed />
        <Campaign.Embed />
        <Campaign.Embed />
        <Campaign.Embed />
      </div>
    </div>
  );
}

Campaign.List = CampaignList;
Campaign.Embed = CampaignEmbed;
Campaign.Apartment = Apartment;

export default Campaign;
