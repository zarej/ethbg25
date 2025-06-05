import { useReadContract, useWriteContract } from 'wagmi';
import { abi as ApartmentBuyoutNFT } from './../../abi/ApartmentBuyout.json';
import { parseEther } from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core';
import { config } from '../../config';

type ApartmentBuyoutContractResponse = {
  buyout: (ethers: any) => Promise<string>;
};

export default function useApartmentBuyoutContract(
  apartmentId: number
): ApartmentBuyoutContractResponse {
  const { writeContractAsync, error, isError, isPending } = useWriteContract();

  const buyout = async (ethers: any): Promise<string> => {
    const hash = await writeContractAsync({
      address: import.meta.env.VITE_APARTMENT_BUYOUT_CONTRACT,
      abi: ApartmentBuyoutNFT,
      functionName: 'startBuyout',
      args: [apartmentId],
      value: parseEther(ethers),
    });

    if (isError) {
      throw new Error(error?.message);
    }

    await waitForTransactionReceipt(config, { hash: hash as any });

    return hash;
  };

  return {
    buyout,
  };
}
