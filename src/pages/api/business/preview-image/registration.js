import { getAuthHeaders } from "@/helper/server";

const api = JSON.parse(process.env.EXTERNAL_BASE_SERVICE);

export default async function handler(req, res) {
  try {
    const authHeaders = getAuthHeaders(req, res);
    if (!authHeaders) return res.status(401).json({ message: "Unauthorized" });
    if (req.method === "GET") {
      const response = await fetch(
        `${api.url}/business/preview-image/registration`,
        {
          method: "GET",
          headers: { ...api.headers, ...authHeaders },
        }
      );
      if (response.status === 200) {
        const imageBuffer = await response.arrayBuffer();
        res.setHeader("Content-Type", "image/png");
        return res.send(Buffer.from(imageBuffer));
      } else {
        return res.status(response.status);
      }
    }
  } catch (err) {
 
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
}
