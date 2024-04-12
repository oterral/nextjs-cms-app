import { StopsAPI } from "mobility-toolbox-js/api";
import { prettyPrintJson } from "pretty-print-json";
import MobilityWebComponent from "../../components/MobilityWebComponent";
import { fromLonLat } from "ol/proj";

async function getData({ slug }) {
  let response = await fetch(
    "https://mobility-cms.dev.geops.com/stops?filters[uic][$eq]=" + slug,
    // "http://localhost:1337/stops?filters[uic][$eq]=" + slug,
    {
      headers: {
        Authorization:
          "Bearer c40dfd1c57638aa7f8fc4efbacb5497473c06eadacff3168201d250e278d50eec9deb20d8f9e51c9baa9fe38480e135a086f3f2cc896abc03cefb3ef2bd259fd95e253b1314556b8d51cad9c03369aca7a0d5b57456c87c48cd89b869b0b489dfed280ddacfd387da39cc22eac0cd2e445124f28ff74031746a2ed741d2c0bc7",
      },
    },
  );
  console.log(response);
  if (!response.ok) {
    return {};
    // console.log(
    //   "Failed to fetch data from Strapi, with http://localhost:1337/stops?filters[uic][$eq]=" +
    //     slug +
    //     " ,  trying with the Mobility Toolbox API",
    // );
    // response = await fetch("https://backend.developer.geops.io/publickey");
    // if (!response.ok) {
    //   // This will activate the closest `error.js` Error Boundary
    //   throw new Error("Failed to fetch data");
    // }
    // const { key } = await response.json();

    // const stopsApi = new StopsAPI();
    // const stops = await stopsApi.search({ q: slug, limit: 1, key });
    // return stops?.features[0] || {};
  }
  const result = await response.json();
  console.log(result);
  return result?.[0]?.description && JSON.parse(result?.[0]?.description);
}

export default async function Slug({ params }: { params: { slug: string } }) {
  const stop = await getData(params);
  const { uid, name } = stop?.properties || {};
  return (
    <div>
      <h1>
        Hello, Stop {name} ({uid}) page!
      </h1>
      <br></br>
      {stop?.geometry && (
        <MobilityWebComponent
          center={fromLonLat(stop?.geometry.coordinates).join(",")}
        ></MobilityWebComponent>
      )}
      <br></br>
      <output
        className="pretty-print-json"
        style={{ whiteSpace: "pre" }}
        dangerouslySetInnerHTML={{
          __html: prettyPrintJson.toHtml(stop || {}),
        }}
      />
    </div>
  );
}
