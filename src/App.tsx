import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

const App: React.FC = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [token, setToken] = useState<string>();

	const handleLoginSuccess = (data: { access_token: string }) => {
		setToken(data.access_token);
		setIsLogin(true);
		alert('¡Bienvenido! Token guardado.');
	};

	return (
		<div className='p-8 max-w-lg mx-auto'>
			{isLogin ? (
				<>
					<LoginForm onLoginSuccess={handleLoginSuccess} />
					<p className='mt-4 text-center'>
						¿No tienes cuenta?{' '}
						<button className='text-blue-600 underline' onClick={() => setIsLogin(false)}>
							Regístrate
						</button>
					</p>
				</>
			) : (
				<>
					<RegisterForm />
					<p className='mt-4 text-center'>
						¿Ya tienes cuenta?{' '}
						<button className='text-blue-600 underline' onClick={() => setIsLogin(true)}>
							Inicia sesión
						</button>
					</p>
				</>
			)}

			{isLogin && token && (
				<>
					<p>Felicitaciones, esta autenticado correctamente</p>
					<p>Su token de accesso es: {token}</p>
				</>
			)}
		</div>
	);
};

export default App;
