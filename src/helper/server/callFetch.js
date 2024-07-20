import getAuthHeaders from "./getAuthHeaders";

export default async function callFetch(
  context,
  path,
  method = "GET",
  body = null
) {
  try {
    const { url, headers } = JSON.parse(process.env.EXTERNAL_BASE_SERVICE);
    const authHeaders = getAuthHeaders(context.req);
    const response = await fetch(`${url}/${path}`, {
      method,
      credentials: "include",
      headers: {
        ...headers,
        ...authHeaders,
      },
      ...(body ? { body: JSON.parse(body) } : {}),
    });
    const json = await response.json();
    return { status: response.status, json };
  } catch (err) {
    return {
      status: 0,
      json: { message: err.message },
    };
  }
}
