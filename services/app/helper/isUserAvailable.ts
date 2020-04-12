import { endpoint } from "lib/endpoint";

export async function isUserAvailable(username: string | string[]) {
  let response: any = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        isUserAvailable(username: "${username}"){
          available
        }
      }`
    })
  }).then(response => response.json());

  const {
    data: {
      isUserAvailable: { available }
    }
  } = response;

  return available;
}
