import { useReadContract, useWriteContract } from 'wagmi';
import { abi as ApartmentNFTABI } from './../../abi/ApartmentNFT.json';
import { parseEther } from 'viem';

type BuildingRegistryContractResponse = {
  isLoading: boolean;
  totalApartments: number;
  createApartment: (
    buildingId: number,
    sizeInSqM: string,
    pricePerSqM: string,
    metadataURI: string
  ) => Promise<string>;
};

export default function useApartmentContract(): BuildingRegistryContractResponse {
  const { data: totalApartments, isLoading } = useReadContract({
    address: import.meta.env.VITE_APARTMENT_NFT_CONTRACT,
    abi: ApartmentNFTABI,
    functionName: 'apartmentCounter',
  });

  const { writeContractAsync, error, isError, isPending } = useWriteContract();

  const createApartment = async (
    buildingId: number,
    sizeInSqM: string,
    pricePerSqM: string,
    metadataURI: string
  ): Promise<string> => {
    console.log(buildingId, sizeInSqM, parseEther(pricePerSqM), metadataURI);
    const hash = await writeContractAsync({
      address: import.meta.env.VITE_APARTMENT_NFT_CONTRACT,
      abi: ApartmentNFTABI,
      functionName: 'mintApartment',
      args: [buildingId, sizeInSqM, parseEther(pricePerSqM), metadataURI],
    });

    if (isError) {
      throw new Error(error?.message);
    }

    return hash;
  };

  return {
    isLoading: isLoading || isPending,
    totalApartments: Number(totalApartments || 0),
    createApartment,
  };
}
