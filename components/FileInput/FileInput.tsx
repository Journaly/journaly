import React from 'react'
import Button, { ButtonVariant } from '@/elements/Button'

interface HTMLInputEvent extends React.FormEvent {
  target: HTMLInputElement & EventTarget
}

type FileInputProps = {
  onChange: (e: HTMLInputEvent) => void
  variant: ButtonVariant
  loading: boolean
  className?: string
  children?: React.ReactNode
}

const FileInput: React.FC<FileInputProps> = ({
  onChange,
  variant,
  loading,
  className,
  children,
}) => {
  const fileInput = React.useRef<HTMLInputElement>(null)
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (fileInput && fileInput.current) {
      fileInput.current.click()
    }
  }

  return (
    <>
      <Button
        onClick={onClick}
        type="button"
        className={className}
        variant={variant}
        loading={loading}
      >
        {children}
      </Button>
      <input
        className="file-input"
        onChange={onChange}
        type="file"
        ref={fileInput}
      />
      <style jsx>{`
        .file-input {
          display: none;
        }
      `}</style>
    </>
  )
}

export default FileInput
