import useImageUpload, { UploadHook } from '@/hooks/useImageUpload'
import {
  useInitiatePostImageUploadMutation,
  InitiatePostImageUploadResponse,
} from '@/generated/graphql'

const usePostImageUpload: UploadHook<InitiatePostImageUploadResponse> = () => {
  const [initiatePostImageUpload] = useInitiatePostImageUploadMutation()

  const getUploadData = async () => {
    const resp = await initiatePostImageUpload()

    return resp?.data?.initiatePostImageUpload
  }

  return useImageUpload(getUploadData)
}

export default usePostImageUpload
