import React from 'react'
import Nav from './Nav'

const Dashboard = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className="dashboard-container">{children}</div>
      <style jsx>{`
        display: flex;

        .dashboard-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          background-color: white;
        }
      `}</style>
    </div>
  )
}

export default Dashboard
