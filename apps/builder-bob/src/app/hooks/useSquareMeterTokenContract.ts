import { useReadContract, useWriteContract } from 'wagmi';
import { abi as SquareMeterTokenABI } from './../../abi/SquareMeterToken.json';
import { parseEther } from 'viem';

type SquareMeterTokenContractResponse = {};

export default function useSquareMeterTokenContract(): SquareMeterTokenContractResponse {
  const { writeContractAsync, error, isError, isPending } = useWriteContract();

  const bid = async (
    to: `0x${string}`,
    apartmentId: number,
    squareMeters: number
  ): Promise<string> => {
    const hash = await writeContractAsync({
      address: import.meta.env.VITE_SMToken_CONTRACT,
      abi: SquareMeterTokenABI,
      functionName: 'mintSquareMeters',
      args: [to, apartmentId, squareMeters],
    });

    if (isError) {
      throw new Error(error?.message);
    }

    return hash;
  };

  return {};
}
