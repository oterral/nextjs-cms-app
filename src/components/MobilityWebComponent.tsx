"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

async function getKey() {
  const response = await fetch("https://backend.developer.geops.io/publickey");
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const { key } = await response.json();
  return key;
}

function MobilityWebComponent(props) {
  const [key, setKey] = useState("");
  // useEffect(() => import("@geops/mobility-web-component"), []);
  useEffect(() => {
    const get = async () => {
      const a = await getKey();
      setKey(a);
    };
    get();
  }, []);
  return (
    <div>
      {key && (
        <geops-mobility
          apikey={key}
          realtime={false}
          style={{ display: "block", width: "500px", height: "500px" }}
          {...props}
        ></geops-mobility>
      )}
      <Script src="https://www.unpkg.com/@geops/mobility-web-component@0.1.5/index.js" />
    </div>
  );
}

export default MobilityWebComponent;
