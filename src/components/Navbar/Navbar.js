import React, { useContext } from 'react'
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const items = [
        {
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        {
            label: 'Dashboard',
            icon: 'pi pi-chart-bar',
            command: () => navigate('/')
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
                logout();
                navigate('/');
            }
        }
    ];
  return (
    <div className="card">
        <Menubar model={items} />
    </div>
  )
}
