import { getAuthHeaders } from "@/helper/server";

const {url ,headers} = JSON.parse(process.env.EXTERNAL_BASE_SERVICE);

export default async function handler(req, res) {
  try {
    const authHeaders = getAuthHeaders(req, res);
    if (!authHeaders) return res.status(401).json({ message: "Unauthorized" });
    if (req.method === "PATCH") {
      const { password } = req.body;
      const response = await fetch(
        `${url}/your-admins/${req.query.id}/update-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
           ...headers,
            ...authHeaders,
          },
          body:JSON.stringify({ password }),
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
