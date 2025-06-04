import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function usePinataUpload(): {
  data: any;
  isLoading: boolean;
  error: any;
  uploadFile: any;
  uploadJson: any;
} {
  const {
    data,
    isPending,
    error,
    mutate: uploadFile,
  } = useMutation({
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

  const {
    data: dataJson,
    isPending: isPendingJson,
    error: errorJson,
    mutateAsync: uploadJson,
  } = useMutation({
    mutationFn: async (json: any) => {
      console.log('KEY', import.meta.env.VITE_PINATA_JWT);

      console.log('json', json);
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

  return {
    data: dataJson,
    isLoading: isPending || isPendingJson,
    error: error || errorJson,
    uploadFile,
    uploadJson,
  };
}
