import React from 'react'
import ConfirmationModal from './ConfirmationModal'

type Args = {
  title: string
  body: string
}
const useConfirmationModal = ({
  title,
  body
}: Args): [React.FC, () => Promise<boolean>] => {
  const resolveRef = React.useRef<((confirmed: boolean) => void) | null>()
  const [show, setShow] = React.useState(false)

  const resolvePromise = (confirmed: boolean) => (
    resolveRef.current && resolveRef.current(confirmed)
  )

  const Component = () => (
    <ConfirmationModal
      show={show}
      title={title}
      body={body}
      onConfirm={() => resolvePromise(true)}
      onCancel={() => resolvePromise(false)}
    />
  )

  const confirmWithUser = async () => {
    const promise = new Promise<boolean>(res => resolveRef.current = res)

    setShow(true)
    const confirmed = await promise
    setShow(false)

    return confirmed
  }

  return [
    Component,
    confirmWithUser
  ]
}

export default useConfirmationModal
