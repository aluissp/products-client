import { useState, type FormEvent } from 'react';
import { apiUrl } from '../utils/apiUrl';

interface LoginFormProps {
	onLoginSuccess?: (data: { access_token: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
	const [form, setForm] = useState({ email: '', password: '' });
	const [error, setError] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			const res = await fetch(`${apiUrl}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});

			const data = await res.json();

			if (res.ok) {
				localStorage.setItem('token', data.access_token);
				if (onLoginSuccess) onLoginSuccess(data);
			} else {
				setError(data.message || 'Error en el login');
			}
		} catch {
			setError('Error de conexión');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4 p-4 border rounded max-w-md mx-auto'>
			<h2 className='text-xl font-bold mb-2'>Iniciar sesión</h2>

			<input
				type='email'
				name='email'
				placeholder='Correo'
				value={form.email}
				onChange={handleChange}
				className='border p-2 w-full'
				required
			/>

			<input
				type='password'
				name='password'
				placeholder='Contraseña'
				value={form.password}
				onChange={handleChange}
				className='border p-2 w-full'
				required
			/>

			<button type='submit' className='bg-green-600 text-white p-2 rounded w-full'>
				Entrar
			</button>

			{error && <p className='mt-2 text-center text-red-500'>{error}</p>}
		</form>
	);
};

export default LoginForm;
