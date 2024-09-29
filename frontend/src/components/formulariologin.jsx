import { useState } from 'react';

export default function FormularioLogin() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que se recargue la página
    
    // Realiza la solicitud POST al servidor con los datos del usuario y contraseña
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, password }),
    });

    if (response.ok) {
      alert('Login exitoso');
      // Aquí podrías redirigir a la página de inicio, por ejemplo:
      // window.location.href = '/index';
    } else {
      alert('Error en el login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user">Usuario</label>
      <input 
        id="user" 
        name="user" 
        type="text" 
        value={user} 
        onChange={(e) => setUser(e.target.value)} 
        required 
      />

      <label htmlFor="password">Contraseña</label>
      <input 
        id="password" 
        name="password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />

      <button type="submit">Ingresar</button>
    </form>
  );
}
