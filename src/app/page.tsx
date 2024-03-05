import { StopsAPI } from "mobility-toolbox-js/api";
import Link from "next/link";
import { useEffect } from "react";

async function getKey() {
  const response = await fetch("https://backend.developer.geops.io/publickey");
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const { key } = await response.json();
  return key;
}
async function getData() {
  const key = await getKey();

  const stopsApi = new StopsAPI({ apiKey: key });
  const stops = await stopsApi.search({ q: "Hbf", limit: 30 }, {});
  return stops?.features || [];
}

export default async function Home() {
  const stops = await getData();
  const key = await getKey();

  return (
    <main>
      <h1>Stops</h1>
      <br></br>
      <ul>
        {stops
          ?.sort((stopA, stopB) => {
            return stopA.properties.name.localeCompare(stopB.properties.name);
          })
          .map((stop) => (
            <li key={stop.properties.name}>
              <Link href={`/${stop.properties.id}`}>
                {stop.properties.name}
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
}
