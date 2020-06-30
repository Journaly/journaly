const Toolbar: React.FC = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
      display: flex;
      justify-content: center;
      padding: 15px 0;
      margin-bottom: 10px;
      border-bottom: 2px solid #eee;
    `}</style>
  </div>
)

export default Toolbar
