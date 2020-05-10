import React from 'react'
import { brandBlue } from '../../utils'

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
}

const Form: React.FC<Props> = ({ onSubmit, children }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      {children}

      <style global jsx>{`
        form {
          width: 100%;
          padding: 20px;
          font-size: 16px;
          line-height: 1.6;
          background: white;
          border: 5px solid white;
          box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
        }
        label {
          display: block;
          margin-bottom: 10px;
        }
        input,
        textarea,
        select {
          width: 100%;
          padding: 5px;
          font-size: 1rem;
          border: 1px solid black;
        }
        input,
        textarea,
        select:focus {
          outline: 0;
          border-color: ${brandBlue};
        }
        fieldset {
          border: 0;
          padding: 0;
          margin-bottom: 10px;
        }
        fieldset[disabled] {
          opacity: 0.5;
        }
        fieldset::before {
          height: 10px;
          content: '';
          display: block;
          background-image: linear-gradient(to right, #32567e 0%, #4391c9 50%, #32567e 100%);
        }
        @keyframes loading {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 100% 100%;
          }
        }
        fieldset[aria-busy='true']::before {
          background-size: 50% auto;
          animation: loading 0.5s linear infinite;
        }

        h2 {
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  )
}

export default Form
