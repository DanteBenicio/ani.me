import { NextApiRequest, NextApiResponse } from "next";
import { kitsuApi } from "../../services/axios";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { animeName, limit } = req.query;

  try {
    const textFilter = animeName ? `filter[text]=${animeName}` : ``
    const limitFilter = limit ? `page[limit]=${limit}&` : '';
    
    const endpoint = `/anime?${limitFilter + textFilter}`

    const { data } = await kitsuApi.get(endpoint)

    res.status(200).json(data.data)
  } catch (error) {
    console.log(error)
  }
}