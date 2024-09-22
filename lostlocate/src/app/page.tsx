import Layout from "./Layout";
import React from "react";
import Dashboard from "./Dashboard";

export default function Home() {
  return (
    <div> 
      <Layout>
        <Dashboard /> 
      </Layout>
    </div>
  );
}
