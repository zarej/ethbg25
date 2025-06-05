import { useReadContract } from 'wagmi';
import { readContract } from '@wagmi/core';
import { abi as ApartmentNFTABI } from './../../abi/ApartmentNFT.json';
import { useQuery } from '@tanstack/react-query';
import { config } from '../../config';
import { formatEther } from 'viem';
import axios from 'axios';

export type Apartment = {
  number?: number;
  buildingId?: number;
  sizeInSqM?: string;
  pricePerSqM?: string;
  metadataURI?: string;
  metadataDecoded: any;
};

type BuildingApartmentsResponse = {
  isLoading: boolean;
  data?: Apartment[];
};

export default function useBuildingApartments(
  buildingId: number
): BuildingApartmentsResponse {
  const { data: totalApartments, isLoading } = useReadContract({
    address: import.meta.env.VITE_APARTMENT_NFT_CONTRACT,
    abi: ApartmentNFTABI,
    functionName: 'apartmentCounter',
    args: [],
  });

  const getAllApartments = async () => {
    const total = Number(totalApartments);

    const apartments = await Promise.all(
      Array.from({ length: total }, (_, i) => {
        return readContract(config, {
          address: import.meta.env.VITE_APARTMENT_NFT_CONTRACT,
          abi: ApartmentNFTABI,
          functionName: 'apartments',
          args: [i],
        });
      })
    );

    return (await Promise.all(
      apartments
        .filter((apartment) => {
          const [_, bId] = apartment as any;

          return Number(bId) === buildingId;
        })
        .map(async (apartment) => {
          const [tokenid, bId, sizeInSqM, pricePerSqM] = apartment as any;

          const metadataURI = await readContract(config, {
            address: import.meta.env.VITE_APARTMENT_NFT_CONTRACT,
            abi: ApartmentNFTABI,
            functionName: 'tokenURI',
            args: [tokenid],
          });

          const metadataResponse = await axios.get(
            `https://ipfs.io/ipfs/${metadataURI}`
          );

          return {
            number: Number(tokenid),
            buildingId: Number(bId),
            sizeInSqM: Number(sizeInSqM),
            pricePerSqM: formatEther(pricePerSqM),
            metadataURI,
            metadataDecoded: metadataResponse.data,
          };
        })
    )) as any;
  };

  const { data: apartments, isLoading: isFetchingDetails } = useQuery({
    queryKey: ['building', 'apartments', buildingId],
    queryFn: async (): Promise<Apartment[]> => await getAllApartments(),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!totalApartments,
  });

  return {
    isLoading: isLoading || isFetchingDetails,
    data: apartments,
  };
}
