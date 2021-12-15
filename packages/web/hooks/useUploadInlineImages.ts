import { useCallback } from 'react'
import { Node, ImageElement } from 'slate'
import NProgress from 'nprogress'
import cloneDeep from 'lodash/cloneDeep'

import { useInitiateInlinePostImageUploadMutation } from '@/generated/graphql'
import { isImageNode, ImageNode } from '@/utils/slate'
import { uploadFile, blobifyDataUrl } from '@/utils/images'

const extractImages = (body: Node[]): ImageElement[] => {
  const images: ImageNode[] = []

  const walk = (nodes: Node[]) => {
    for (const node of nodes) {
      if (isImageNode(node)) {
        images.push(node)
      } else if ('children' in node) {
        walk(node.children)
      }
    }
  }

  walk(body)
  return images
}

const useUploadInlineImages = () => {
  const [initiateInlinePostImageUpload] = useInitiateInlinePostImageUploadMutation()

  const getUploadData = async () => {
    const resp = await initiateInlinePostImageUpload()

    return resp?.data?.initiateInlinePostImageUpload
  }

  return useCallback(
    async (body: Node[]) => {
      const clonedBody = cloneDeep(body)
      const images = extractImages(clonedBody).filter(({ uploaded }) => !uploaded)

      if (images.length) {
        NProgress.start()

        try {
          for (let i = 0; i < images.length; i++) {
            const image = images[i]
            const blob = await blobifyDataUrl(image.url)
            const file = new File([blob], 'upload')
            const result = await uploadFile(getUploadData, file)

            if (result.failed) {
              throw new Error('Error uploading inline post image.')
            }

            image.url = result.value.finalUrl
            image.uploaded = true

            NProgress.set(i / images.length)
          }
        } finally {
          NProgress.done()
        }
      }

      return clonedBody
    },
    [initiateInlinePostImageUpload],
  )
}

export default useUploadInlineImages
