import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Esquema de validação
const userSchema = z.object({
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Digite um e-mail válido'),
  password: z.string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string()
    .min(1, 'Confirme sua senha')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
})

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema)
  })

  const onSubmit = (data) => {
    console.log('Dados do formulário:', data)
    alert('Cadastro realizado com sucesso!')
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Formulário de Cadastro</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            E-mail:
          </label>
          <input
            type="email"
            {...register('email')}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.email ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          {errors.email && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              {errors.email.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Senha:
          </label>
          <input
            type="password"
            {...register('password')}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.password ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          {errors.password && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              {errors.password.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Confirmar Senha:
          </label>
          <input
            type="password"
            {...register('confirmPassword')}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.confirmPassword ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          {errors.confirmPassword && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          style={{
            width: '50%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            margin: '0 auto',
            display: 'block',
            
            
          }}
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}

export default App
