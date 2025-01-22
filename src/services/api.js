import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-d0y8reum0-guiziins-projects.vercel.app',
    headers: {
        'Authorization': `Bearer`,
        'Content-Type': 'application/json'
    }
})

export default api
