import { getAuthHeaders } from "@/helper/server";

const api = JSON.parse(process.env.EXTERNAL_BASE_SERVICE);

export default async function handler(req, res) {
  try {
    const authHeaders = getAuthHeaders(req, res);
    if (!authHeaders) return res.status(401).json({ message: "Unauthorized" });

    if (req.method === "PATCH") {
      const { amount } = req.body;
      const response = await fetch(
        `${api.url}/your-users/${req.query.id}/deduct-balance`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...api.headers,
            ...authHeaders,
          },
          body: JSON.stringify({ amount }),
        }
      );

      return res.status(response.status).json(await response.json());
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}
