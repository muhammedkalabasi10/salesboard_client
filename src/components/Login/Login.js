import React, { useContext, useState, useRef } from 'react'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import AuthContext from '../../Context/AuthContext';
import { Toast } from 'primereact/toast';

const Login = () => {
  const [name, setName] = useState('');

  const { login } = useContext(AuthContext);
  const toast = useRef(null);

  const handleLogin = async(event) => {
    event.preventDefault();
    try{
        const res = await login({name:name});
        console.log(res);
    }catch(error){
        console.log(error);
        toast.current.show({severity:'error', summary: 'Error', detail:error, life: 3000});
    }
  };

  return (
    <div>
        <Toast ref={toast} />
      <div style={{ display:"flex",justifyContent:"center",alignItems:"center", height: '100vh', background: '#f5f5f5' }}>          
          <Card title="Giriş Yap" style={{ width: '25rem' }}>
              <div className="p-fluid">
                  <div className="field">
                      <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Vendor Name" />
                  </div>                  
                  <Button label="Giriş Yap" icon="pi pi-sign-in" onClick={handleLogin} style={{ marginTop: '2rem' }} />
              </div>
          </Card>
      </div>
      </div>
  );  
};

export default Login;