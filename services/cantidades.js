import axios from "axios";

export function GET_cantidades() {
    return axios.get(`${"https://3.92.204.35:8000/"}inventario/Cantidades/`);
}