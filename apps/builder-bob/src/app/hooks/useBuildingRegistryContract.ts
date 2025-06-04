import { useReadContract, useWriteContract } from 'wagmi';
import { abi as BuildingRegistryABI } from './../../abi/BuildingRegistry.json';

type BuildingRegistryContractResponse = {
  isLoading: boolean;
  buildings: [];
  buildingCount: number;
  createBuilding: (metadataURI: string) => Promise<`0x${string}` | undefined>;
};

export default function useBuildingRegistryContract(): BuildingRegistryContractResponse {
  const { data: buildingCount, isLoading } = useReadContract({
    address: import.meta.env.VITE_BUILDING_REGISTRY_CONTRACT,
    abi: BuildingRegistryABI,
    functionName: 'buildingCount',
  });

  const {
    data: hash,
    writeContractAsync,
    error,
    isError,
    isPending,
  } = useWriteContract();

  const createBuilding = async (
    metadataURI: string
  ): Promise<`0x${string}` | undefined> => {
    await writeContractAsync({
      address: import.meta.env.VITE_BUILDING_REGISTRY_CONTRACT,
      abi: BuildingRegistryABI,
      functionName: 'createBuilding',
      args: [metadataURI],
    });

    if (isError) {
      throw new Error(error?.message);
    }

    return hash;
  };

  return {
    isLoading: isLoading || isPending,
    buildings: [],
    buildingCount: Number(buildingCount || 0),
    createBuilding,
  };
}
