import React, { useCallback } from 'react'

type Props = {
  target: string,
  children: React.ReactNode
}

const SkipLink = ({ target, children }: Props) => {
  const handleSkipLinkClick = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault()
    document.getElementById(target)?.focus()
  }, [target])

  return (
    <>
      <a
        className="skip-link"
        href={'#' + target}
        onClick={handleSkipLinkClick}
      >
        {children}
      </a>

      <style jsx>{`
        .skip-link {
          display: block;
          background: white;
          padding: 10px 20px;
        }
        .skip-link:not(:focus) { 
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          overflow: hidden !important;
          clip: rect(1px, 1px, 1px, 1px) !important;
          border: 0 !important;
        }
        .skip-link:focus {
          display: block;
          z-index: 999;
          position: absolute;
        }
      `}</style>
    </>
  )
}

const SkipLinkTarget = ({ id }: { id: string }) => (
  <div id={id} tabIndex={-1} />
)

export default SkipLink
export { SkipLinkTarget }
