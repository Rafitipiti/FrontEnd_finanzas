import axios from "axios";

export default axios.create({
    //http://localhost:3000/letra/execute/3
    baseURL: 'http://localhost:3000/',
    headers: {'Content-type' : 'application/json'}
})