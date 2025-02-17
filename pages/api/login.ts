import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { usuario, contraseña, id } = req.body;

    if (!usuario || !contraseña || !id) {
        return res.status(400).json({ message: 'Faltan datos en la solicitud' });
    }

    return res.status(401).json({ message: 'Credenciales inválidas' });
}