import useImageUpload, { UploadHook } from '@/hooks/useImageUpload'
import {
  useInitiateAvatarImageUploadMutation,
  InitiateAvatarImageUploadResponse,
} from '@/generated/graphql'

const useAvatarImageUpload: UploadHook<InitiateAvatarImageUploadResponse> = () => {
  const [initiateAvatarImageUpload] = useInitiateAvatarImageUploadMutation()

  const getUploadData = async () =>  {
    const resp = await initiateAvatarImageUpload()

    return resp?.data?.initiateAvatarImageUpload
  }

  return useImageUpload(getUploadData)
}

export default useAvatarImageUpload
