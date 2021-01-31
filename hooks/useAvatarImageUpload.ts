import useImageUpload from '@/hooks/useImageUpload'
import {
  useInitiateAvatarImageUploadMutation,
  InitiateAvatarImageUploadResponse,
} from '@/generated/graphql'

const useAvatarImageUpload: UploadHook<InitiateAvatarImageUploadResponse> = () => {
  const [initiateAvatarImageUpload] = useInitiateAvatarImageUploadMutation()

  const getUploadData = async () =>  {
    const {
      data: {
        initiateAvatarImageUpload: uploadData
      }
    } = await initiateAvatarImageUpload()

    return uploadData
  }

  return useImageUpload(getUploadData)
}

export default useAvatarImageUpload
