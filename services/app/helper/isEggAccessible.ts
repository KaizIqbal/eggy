import fetch from "isomorphic-unfetch";

import { endpoint } from "lib/endpoint";
import { getAccessToken } from "lib/accessToken";

export async function isEggAccessible(eggname: any) {
  let response: any = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: `Bearer ${getAccessToken()}` },
    body: JSON.stringify({
      query: `{
        isEggAccessible(eggname: "${eggname}") {
          access
        }
      }`
    })
  });

  response = await response.json();

  const {
    data: {
      isEggAccessible: { access }
    }
  } = response;

  return access;
}
