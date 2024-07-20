import { getAuthHeaders } from "@/helper/server";
export default async function callUpload(pathname, method, header, body) {
  try {
    const accountsBaseService = JSON.parse(process.env.EXTERNAL_BASE_SERVICE);

    const response = await fetch(`${accountsBaseService.url}${pathname}`, {
      method,
      headers: { ...accountsBaseService.headers, ...header },
      ...(body ? { body } : {}),
    });
    const data = await response.json();

    return { status: response.status, data };
  } catch (err) {
    throw new Error(err.message);
  }
}
