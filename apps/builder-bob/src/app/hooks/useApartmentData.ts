import axios from 'axios';
import { useReadContract } from 'wagmi';
import { abi as ApartmentNFTABI } from './../../abi/ApartmentNFT.json';
import { useQuery } from '@tanstack/react-query';
import useBuildingData, { Building } from './useBuildingDeta';

type ApartmentEmbedData = {
  blueprint: string;
  floor: string;
  number: string;
  price: string;
  size: string;
};

type ApartmentDataResponse = {
  isLoading: boolean;
  building?: Building;
  data?: ApartmentEmbedData;
};

export default function useApartmentData(
  buildingId: number,
  apartmentId: number
): ApartmentDataResponse {
  const { data: buildingData, isLoading: isFetchingDetails } =
    useBuildingData(buildingId);

  const { data: apartment, isLoading: isFetchingApartment } = useReadContract({
    address: import.meta.env.VITE_APARTMENT_NFT_CONTRACT,
    abi: ApartmentNFTABI,
    functionName: 'tokenURI',
    args: [apartmentId],
  });

  const { data: apartmentData, isLoading } = useQuery({
    queryKey: ['apartment', 'data', apartment],
    queryFn: async (): Promise<ApartmentEmbedData> => {
      const response = await axios.get(`https://ipfs.io/ipfs/${apartment}`);

      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!apartment,
  });

  return {
    isLoading: isLoading || isFetchingDetails || isFetchingApartment,
    building: buildingData,
    data: apartmentData,
  };
}
