import React from 'react'

interface Props {
  children: React.ReactNode
}

const ModalFooter: React.FC<Props> = (props) => {
  return (
    <>
      <div className="modal-footer" {...props} />
      <style jsx>{`
        .modal-footer {
          display: flex;
          justify-content: space-between;
          padding: 24px 32px;
          border-top: 1px solid #d4d8db;
        }

        /* If there's only one button in the footer, place all the way to the right */
        .modal-footer :global(> *:last-child) {
          margin-left: auto;
        }
      `}</style>
    </>
  )
}

export default ModalFooter
