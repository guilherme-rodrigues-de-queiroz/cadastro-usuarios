import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-iota-ten-17.vercel.app',
    headers: {
        'Authorization': `Bearer`,
        'Content-Type': 'application/json'
    }
})

export default api
