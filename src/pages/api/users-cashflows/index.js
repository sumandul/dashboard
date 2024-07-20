import querystring from "querystring";
import { getAuthHeaders } from "@/helper/server";

const api = JSON.parse(process.env.EXTERNAL_BASE_SERVICE);

export default async function handler(req, res) {
  try {
    const authHeaders = getAuthHeaders(req, res);

    if (!authHeaders) return res.status(401).json({ message: "Unauthorized" });

    const response = await fetch(
      `${api.url}/users-cashflows?${querystring.stringify(req.query)}`,
      {
        method: "GET",
        headers: { ...api.headers, ...authHeaders },
      }
    );

    return res.status(response.status).json(await response.json());
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}
