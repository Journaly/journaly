const Toolbar: React.FC = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
      display: flex;
      justify-content: center;
      padding: 15px 0;
      border-bottom: 2px solid #eee;
    `}</style>
  </div>
)

export default Toolbar
