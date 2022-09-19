import { NextApiRequest, NextApiResponse } from "next";
import { kitsuApi } from "../../services/axios";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { animesCount, filter } = req.query;

  try {
    const { data } = await kitsuApi.get(`/anime?page[limit]=10&page[offset]=${animesCount}${filter}`)

    res.status(200).json(data.data)
  } catch (error) {
    
  }
}