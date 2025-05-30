import { useState } from 'react';
import { apiUrl } from '../utils/apiUrl';

interface Errors {
	name: string;
	email: string;
	password: string;
}

interface RegisterFormProps {
	onRegisterSuccess?: (data: { access_token: string }) => void;
}

export const RegisterForm = ({ onRegisterSuccess }: RegisterFormProps) => {
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const [errors, setErrors] = useState<Partial<Errors>>({});
	const [message, setMessage] = useState('');

	const validate = () => {
		const newErrors: Partial<Errors> = {};
		if (!form.name) newErrors.name = 'The name is required';
		if (!form.email || !form.email.includes('@')) newErrors.email = 'Invalid email';
		if (!form.password || form.password.length < 6)
			newErrors.password = 'The password must be at least 6 characters';

		return newErrors;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessage('');
		const newErrors = validate();
		setErrors(newErrors);

		if (Object.keys(newErrors).length > 0) return;

		try {
			const res = await fetch(apiUrl + '/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});

			if (!res.ok) {
				setMessage('Error while register');
				return;
			}

			const data = await res.json();

			setMessage('Register successfully');
			setForm({ name: '', email: '', password: '' });
			setErrors({});

			if (onRegisterSuccess) onRegisterSuccess(data as { access_token: string });
		} catch (_error) {
			setMessage('Conexion error');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4 p-4 border rounded max-w-md mx-auto'>
			<h2 className='text-xl font-bold mb-2'>u</h2>

			<input
				type='text'
				placeholder='Nombre'
				value={form.name}
				onChange={e => setForm({ ...form, name: e.target.value })}
				className='border p-2 w-full'
			/>
			{errors.name && <p className='text-red-500'>{errors.name}</p>}

			<input
				type='email'
				placeholder='Correo'
				value={form.email}
				onChange={e => setForm({ ...form, email: e.target.value })}
				className='border p-2 w-full'
			/>
			{errors.email && <p className='text-red-500'>{errors.email}</p>}

			<input
				type='password'
				placeholder='Contraseña'
				value={form.password}
				onChange={e => setForm({ ...form, password: e.target.value })}
				className='border p-2 w-full'
			/>
			{errors.password && <p className='text-red-500'>{errors.password}</p>}

			<button type='submit' className='bg-blue-600 text-white p-2 rounded w-full'>
				Registrarse
			</button>

			{message && <p className='mt-2 text-center'>{message}</p>}
		</form>
	);
};
