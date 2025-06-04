import axios from 'axios';
import { useReadContract } from 'wagmi';
import { abi as BuildingRegistryABI } from './../../abi/BuildingRegistry.json';
import { useQuery } from '@tanstack/react-query';

export type Building = {
  id?: number;
  owner?: `0x${string}`;
  metadataURI?: string;
  address?: string;
  floors?: string;
  image?: string;
  investor?: string;
  name?: string;
  description?: string;
};

type BuildingDataResponse = {
  isLoading: boolean;
  data?: Building;
};

type BuildingBlockResponse = [BigInt, string, string];

export default function useBuildingData(id: number): BuildingDataResponse {
  const { data: building, isLoading } = useReadContract({
    address: import.meta.env.VITE_BUILDING_REGISTRY_CONTRACT,
    abi: BuildingRegistryABI,
    functionName: 'buildings',
    args: [id],
  });

  const { data: buildingData, isLoading: isFetchingDetails } = useQuery({
    queryKey: ['building', 'data', id],
    queryFn: async (): Promise<Building> => {
      const [buildingId, owner, metadataURI] =
        building as BuildingBlockResponse;

      const response = await axios.get(`https://ipfs.io/ipfs/${metadataURI}`);

      return {
        id: Number(buildingId),
        owner,
        metadataURI,
        ...response.data,
      };
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!building,
  });

  return {
    isLoading: isLoading || isFetchingDetails,
    data: buildingData,
  };
}
