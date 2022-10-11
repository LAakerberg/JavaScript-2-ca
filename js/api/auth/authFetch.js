export function headers() {
  const myAccessToken = localStorage.getItem("myAccessToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${myAccessToken}`,
  };
}

export async function authFetch(url, option) {
  return fetch(url, {
    ...option,
    headers: headers(),
  });
}
