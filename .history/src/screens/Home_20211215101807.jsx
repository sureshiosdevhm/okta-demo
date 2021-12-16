import React from "react";
import { useOktaAuth } from "@okta/okta-react";

export default function Home() {
  const { authState, oktaAuth } = useOktaAuth();
  return <div></div>;
}
