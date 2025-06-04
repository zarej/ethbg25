import { useAccount } from 'wagmi';
import Spinner from '../components/Spinner';
import { useState } from 'react';
import Button from '../components/Button';
import ConnectWallet from '../components/ConnectWallet';

import usePinataJsonUpload from '../hooks/usePinataJsonUpload';
import usePinataFileUpload from '../hooks/usePinataFileUpload';

export default function Add() {
  const { isConnected, isConnecting } = useAccount();
  const { mutateAsync: uploadFile } = usePinataFileUpload();
  const { mutateAsync: uploadJson } = usePinataJsonUpload();

  const [apartments, setApartments] = useState<any[]>([]);
  const [buildingImage, setBuildingImage] = useState<any>();

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    setBuildingImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const { IpfsHash: buildingImageIpfsHash } = await uploadFile(
        buildingImage
      );

      const { IpfsHash: jsonIpfsHash } = await uploadJson({
        name: formData.get('name'),
        address: formData.get('address'),
        floors: formData.get('floors'),
        investor: formData.get('investor'),
        image: buildingImageIpfsHash,
      });

      console.log('json', jsonIpfsHash);
    } catch (e) {
      console.error('Upload failed:', e);
    }
  };

  if (isConnecting) {
    return <Spinner />;
  }

  return (
    <>
      {isConnected ? (
        <div className="py-6">
          <h1 className="text-3xl mb-6">Add a new building</h1>
          <form onSubmit={handleSubmit}>
            <div className="w-full mb-4">
              <p className="text-sm text-gray-700">Name</p>
              <input
                required
                type="text"
                placeholder="THE BRISTOL RESIDENCES"
                name="name"
                className="border rounded w-full px-3 py-1"
              />
            </div>
            <div className="w-full mb-4">
              <p className="text-sm text-gray-700">Summary</p>
              <textarea
                required
                placeholder="Bristol Residences has been developed as a premium residential complex in the form of a 'U', with an internal yard. At your doorstep, there are shops, cafes, restaurants and a swimming pool surrounded by greenery, with integrated hydromassage baths and accompanying facilities, as well as Residence Club, gym and meeting office and work office."
                name="summary"
                className="border rounded w-full px-3 py-1"
              />
            </div>
            <div className="w-full mb-4">
              <p className="text-sm text-gray-700">Address</p>
              <input
                required
                type="text"
                placeholder="Karađorđeva 50, Beograd 11000"
                name="address"
                className="border rounded w-full px-3 py-1"
              />
            </div>
            <div className="w-full mb-4">
              <p className="text-sm text-gray-700">Number of floors</p>
              <input
                required
                type="number"
                placeholder="5"
                name="floors"
                className="border rounded w-full px-3 py-1"
              />
            </div>
            <div className="w-full mb-4">
              <p className="text-sm text-gray-700">Investor</p>
              <input
                required
                type="text"
                placeholder="Test"
                name="investor"
                className="border rounded w-full px-3 py-1"
              />
            </div>
            <div className="w-full mb-4">
              <p className="text-sm text-gray-700">Image</p>
              <input
                required
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                className="border rounded w-full px-3 py-1"
                onChange={handleFileChange}
              />
            </div>
            {apartments.map((apartment, i) => (
              <div
                key={`apartment_${i}`}
                className="flex flex-row gap-3 border mb-4 px-4 py-3 rounded-md"
              >
                <div className="w-full mb-4">
                  <p className="text-sm text-gray-700">Apartment Number</p>
                  <input
                    type="text"
                    name={`apartment[${i}][number]`}
                    value={i + 1}
                    className="border rounded w-full px-3 py-1"
                  />
                </div>
                <div className="w-full mb-4">
                  <p className="text-sm text-gray-700">Floor</p>
                  <input
                    type="number"
                    name={`apartment[${i}][floor]`}
                    value="1"
                    className="border rounded w-full px-3 py-1"
                  />
                </div>
                <div className="w-full mb-4">
                  <p className="text-sm text-gray-700">Square meters</p>
                  <input
                    type="number"
                    name={`apartment[${i}][sqare_meters]`}
                    value="33"
                    className="border rounded w-full px-3 py-1"
                  />
                </div>
                <div className="w-full mb-4">
                  <p className="text-sm text-gray-700">Price</p>
                  <input
                    type="text"
                    name={`apartment[${i}][price]`}
                    value="1"
                    className="border rounded w-full px-3 py-1"
                  />
                </div>
                <div className="w-full mb-4">
                  <p className="text-sm text-gray-700">Blueprint</p>
                  <input
                    type="file"
                    name={`apartment[${i}][blueprint]`}
                    className="border rounded w-full px-3 py-1"
                  />
                </div>
              </div>
            ))}
            <Button
              className="my-5"
              style="transparent"
              onClick={() => setApartments([...apartments, {}])}
            >
              + Add apartment
            </Button>
            <Button type="submit" className="w-full mt-6">
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <div className="py-6">
          <h1 className="text-3xl mb-6">Connect wallet</h1>
          <ConnectWallet />
        </div>
      )}
    </>
  );
}
