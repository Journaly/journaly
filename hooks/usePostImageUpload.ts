import useImageUpload from '@/hooks/useImageUpload'
import {
  useInitiatePostImageUploadMutation,
  InitiatePostImageUploadResponse,
} from '@/generated/graphql'

const usePostImageUpload: UploadHook<InitiatePostImageUploadResponse> = () => {
  const [initiatePostImageUpload] = useInitiatePostImageUploadMutation()

  const getUploadData = async () =>  {
    const {
      data: {
        initiatePostImageUpload: uploadData
      }
    } = await initiatePostImageUpload()

    return uploadData
  }

  return useImageUpload(getUploadData)
}

export default usePostImageUpload
