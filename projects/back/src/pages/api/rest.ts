import { Request, Response } from 'express';

const handler = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'MT Data Reciever API' });
  } else if (req.method === 'POST') {
    const dataRaw = req.body;
    const normalizedData = Object.keys(dataRaw)[0].replace(/\u0000/g, '');
    const data = JSON.parse(normalizedData);

    res
      .status(201)
      .json({ message: 'Data received successfully', receivedData: data });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
