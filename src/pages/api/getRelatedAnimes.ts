import { NextApiRequest, NextApiResponse } from "next";
import { kitsuApi } from "../../services/axios";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  
  try {
    const { data } = await kitsuApi.get(`/anime?page[limit]=6&page[offset]=${Math.round(Math.random() * 12062)}`)

    res.status(200).json(data.data)
  } catch (error) {
    console.log(error)
  }
}