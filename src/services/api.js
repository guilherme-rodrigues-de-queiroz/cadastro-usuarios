import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-7j6znf97k-guiziins-projects.vercel.app',
    headers: {
        'Authorization': `Bearer`,
        'Content-Type': 'application/json'
    }
})

export default api