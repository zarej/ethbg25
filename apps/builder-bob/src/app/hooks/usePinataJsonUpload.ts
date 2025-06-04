import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function usePinataJsonUpload(): any {
  return useMutation({
    mutationFn: async (json: any) => {
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        json,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
        }
      );

      return response.data;
    },
  });
}
