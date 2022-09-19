import { NextApiRequest, NextApiResponse } from "next";
import { kitsuApi } from "../../services/axios";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { animeName } = req.query;

  try {
    const { data } = await kitsuApi.get(`/anime?filter[text]=${animeName}`)
    
    res.status(200).json(data.data)
  } catch (error) {
    console.log(error)
  }
}