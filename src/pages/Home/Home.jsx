import './Home.css'
import Del from '../../assets/delete.png'
import api from '../../services/api.js'
import { useEffect, useState, useRef } from 'react'
import Swal from 'sweetalert2'

function Home() {

  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  function validateEmail(newEmail) {
    return users.some(user => user.email === newEmail)
  }

  function validateForm() {
    const name = inputName.current.value
    const age = inputAge.current.value
    const email = inputEmail.current.value

    if (!name || !age || !email) {
      setError('Preencha todos os campos!')
      return false
    }

    if (isNaN(age) || age <= 0) {
      setError('A idade deve ser um número positivo!')
      return false
    }

    return true
  }

  async function postUsers(e) {
    e.preventDefault()
    const newEmail = inputEmail.current.value

    if (!validateForm()) {
      return
    }

    if (validateEmail(newEmail)) {
      setError('Este e-mail já está em uso!')
      return
    } else {
      setError('')
    }

    await api.post('/usuarios', {
      name: inputName.current.value,
      age: parseInt(inputAge.current.value),
      email: newEmail
    })

    getUsers()

    Swal.fire({
      title: 'Sucesso!',
      text: 'Usuário cadastrado com sucesso.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#6586FF',
      background: '#f4f4f9',
    });
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)

    getUsers()

    Swal.fire({
      title: 'Deletado!',
      text: 'Usuário deletado com sucesso.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#6586FF',
      background: '#f4f4f9',
    });
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (

    <div className="container">
      <form>
        <h1>Cadastro</h1>
        <input placeholder='Name' type="text" name='name' autoComplete='off' ref={inputName} required />
        <input placeholder='Age' type="number" name='age' autoComplete='off' ref={inputAge} required />
        <input placeholder='E-mail' type="email" name='email' autoComplete='off' ref={inputEmail} required />
        <button type="submit" onClick={postUsers}>Cadastrar</button>
        <div className="Errors">
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p><span>Name:</span> {user.name}</p>
            <p><span>Age:</span> {user.age}</p>
            <p><span>Email:</span> {user.email}</p>
          </div>
          <button type="button" onClick={() => deleteUsers(user.id)}>
            <img src={Del} alt="Delete User" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home