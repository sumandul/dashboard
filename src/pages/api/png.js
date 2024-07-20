  import querystring from "querystring";
import { getAuthHeaders } from "@/helper/server";

const api = JSON.parse(process.env.EXTERNAL_BASE_SERVICE);

export default async function handler(req, res) {
  try {
    const authHeaders = getAuthHeaders(req, res);

    if (!authHeaders) return res.status(401).json({ message: "Unauthorized" });

    if (req.method === "GET") {
      const response = await fetch(
        `${api.url}/rides?${querystring.stringify(req.query)}`,
        {
          method: "GET",
          headers: { ...api.headers, ...authHeaders },
        }
      );

      return res.status(response.status).json(await response.json());
    } else if (req.method === "POST") {
      const { name, phone, active, gender, business_id } = req.body;
      const response = await fetch(`${api.url}/your-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...api.headers,
          ...authHeaders,
        },
        body: JSON.stringify({ name, phone, active, gender, business_id }),
      });

      return res.status(response.status).json(await response.json());
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}
