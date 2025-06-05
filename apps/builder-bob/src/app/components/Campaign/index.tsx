import { NavLink } from 'react-router-dom';
import useBuildingData, { Building } from '../../hooks/useBuildingDeta';
import Hr from '../Hr';
import Spinner from '../Spinner';
import Apartment from './Apartment';
import { useAccount } from 'wagmi';
import Modal from '../Modal';
import Button from '../Button';
import { useState } from 'react';
import useApartmentContract from '../../hooks/useApartmentContract';
import usePinataFileUpload from '../../hooks/usePinataFileUpload';
import usePinataJsonUpload from '../../hooks/usePinataJsonUpload';
import ApartmentList from './ApartmentList';
import { waitForTransactionReceipt } from '@wagmi/core';
import { config } from '../../../config';

const Campaign = ({ data }: { data: Building }) => {
  const { address: account } = useAccount();
  const { mutateAsync: uploadFile } = usePinataFileUpload();
  const { mutateAsync: uploadJson } = usePinataJsonUpload();
  const { createApartment, isLoading } = useApartmentContract();

  const { id, image, description, floors, investor, address, owner } = data;

  const [blueprint, setBlueprint] = useState();
  const [addApartmentVisible, setAddApartmentVisible] = useState(false);
  const [addApartmentButtonDisabled, setAddApartmentButtonDisabled] =
    useState<boolean>(false);

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    setBlueprint(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setAddApartmentButtonDisabled(true);
      const formData = new FormData(e.currentTarget);

      const { IpfsHash: blueprintImageHash } = await uploadFile(blueprint);

      const apartmentData = {
        number: Number(formData.get('number')),
        floor: formData.get('floor'),
        size: formData.get('sqare_meters'),
        price: formData.get('price'),
        blueprint: blueprintImageHash,
      };

      const { IpfsHash: jsonIpfsHash } = await uploadJson(apartmentData);

      const hash = await createApartment(
        id!,
        formData.get('sqare_meters') as any,
        formData.get('price') as any,
        jsonIpfsHash
      );

      await waitForTransactionReceipt(config, { hash: hash as any });
      setAddApartmentButtonDisabled(false);

      window.location.reload();
    } catch (e) {
      console.error('Upload failed:', e);
      setAddApartmentButtonDisabled(false);
    }
  };

  return (
    <div className="max-w-[600px]">
      <Modal
        isOpen={addApartmentVisible}
        onClose={() => setAddApartmentVisible(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-4">
            <p className="text-sm text-gray-700">Apartment number</p>
            <input
              type="number"
              name="number"
              placeholder="1"
              className="border rounded w-full px-3 py-1"
            />
          </div>
          <div className="w-full mb-4">
            <p className="text-sm text-gray-700">Floor</p>
            <input
              type="number"
              name={`floor`}
              placeholder="1"
              className="border rounded w-full px-3 py-1"
            />
          </div>
          <div className="w-full mb-4">
            <p className="text-sm text-gray-700">Square meters</p>
            <input
              type="number"
              name={`sqare_meters`}
              placeholder="33"
              className="border rounded w-full px-3 py-1"
            />
          </div>
          <div className="w-full mb-4">
            <p className="text-sm text-gray-700">Price</p>
            <input
              type="text"
              name={`price`}
              placeholder="1"
              className="border rounded w-full px-3 py-1"
            />
          </div>
          <div className="w-full mb-4">
            <p className="text-sm text-gray-700">Blueprint</p>
            <input
              type="file"
              name={`blueprint`}
              className="border rounded w-full px-3 py-1"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={addApartmentButtonDisabled}
          >
            Submit
          </Button>
        </form>
      </Modal>
      <img src={`https://ipfs.io/ipfs/${image}`} className="rounded-md" />
      <p className="text-gray-700 mt-4">{description}</p>
      <Hr />
      <div className="flex flex-col gap-4">
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">apartment</span> 33
          apartments
        </p>
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">stairs_2</span> {floors}{' '}
          floors
        </p>
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">attach_money</span>{' '}
          {investor}
        </p>
        <p className="flex gap-2 items-center">
          <span className="material-symbols-outlined">location_on</span>{' '}
          {address}
        </p>
      </div>
      <Hr />
      {account === owner && (
        <Button className="w-full" onClick={() => setAddApartmentVisible(true)}>
          + Add Apartment
        </Button>
      )}
      <Hr />
      <ApartmentList buildingId={id!} />
    </div>
  );
};

function CampaignEmbed({ id }: { id: number }) {
  const { isLoading, data } = useBuildingData(id);

  if (isLoading || !data) {
    return (
      <div className="w-full h-full bg-gray-200">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="rounded-md relative">
      <NavLink
        to={`/campaign/${id}`}
        className="absolute top-0 left-0 w-full h-full cursor-pointer z-[999]"
      />
      <img src={`https://ipfs.io/ipfs/${data.image}`} />
      <div
        className="absolute top-0 left-0 w-[70%] h-full bg-lime-500 rounded-s-sm pt-3 px-3 flex flex-col py-12
"
      >
        <p className="text-sm text-gray-700 mb-3">Bob The Builder</p>
        <p className="text-3xl text-bold">{data.name}</p>
        <p className="text-md text-slate-700 mt-auto">{data.address}</p>
      </div>
    </div>
  );
}

function CampaignList({ length = 4, campaignsTotal = 0 }) {
  return (
    <div className="border p-5 rounded-xl">
      <p className="mb-3">{campaignsTotal} campaigns</p>
      <div className="grid grid-cols-2 gap-4">
        {Array.from(
          { length: Number(campaignsTotal < length ? campaignsTotal : length) },
          (_, i) => i + 1
        ).map((i) => (
          <Campaign.Embed id={i} key={i} />
        ))}
      </div>
    </div>
  );
}

Campaign.List = CampaignList;
Campaign.Embed = CampaignEmbed;
Campaign.Apartment = Apartment;

export default Campaign;
