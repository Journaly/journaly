const Toolbar = props => (
  <div>
    {props.children}
    <style jsx>{`
      display: flex;
      justify-content: space-around;
    `}</style>
  </div>
);

export default Toolbar;
