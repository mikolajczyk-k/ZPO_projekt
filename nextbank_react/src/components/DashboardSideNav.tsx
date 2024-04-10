import React from 'react'
import "../styles/DashboardSideNav.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const DashboardSideNav: React.FC = () => {
  return (
    <Nav className="flex-column side-nav" style={{ height: '100vh', width: '25%' }}>
        <NavLink to="/dashboard">Main Page</NavLink>
    </Nav>
  )
}

export default DashboardSideNav;
