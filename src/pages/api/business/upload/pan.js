import { getAuthHeaders } from "@/helper/server";
export const config = { api: { bodyParser: false } };
const api = JSON.parse(process.env.EXTERNAL_BASE_SERVICE);

export default async function handler(req, res) {
  try {
    const authHeaders = getAuthHeaders(req, res);
    if (!authHeaders) return res.status(401).json({ message: "Unauthorized" });

    if (req.method === "POST") {
      const response = await fetch(`${api.url}/business/upload/pan`, {
        method: "POST",
        headers: {
          "content-type": req.headers["content-type"],
          ...api.headers,
          ...authHeaders,
        },
        duplex: "half",
        body: req,
      });
      const json = await response.json();
      return res.json(json);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
