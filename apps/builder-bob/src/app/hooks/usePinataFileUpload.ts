import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function usePinataFileUpload(): any {
  return useMutation({
    mutationFn: async (file: any) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          maxContentLength: Infinity,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
        }
      );

      return response.data;
    },
  });
}
