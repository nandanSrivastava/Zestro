"use client";

import React from "react";
import styles from "../styles/DashboardContent.module.css";
import useQuery from "@/services/useQuery";

const DashboardContent = () => {
  const processData = (data) => {
    return data.map((post) => ({ ...post, postContent: post.body }));
  };

  const {
    data,
    error,
    isLoading,
    refetch: refechPost,
  } = useQuery(
    "posts",
    {},
    {
      processData,
      autoFetch: true,
      skipCache: false,
      ttl: 10000,
    }
  );

  return (
    <div className={styles.dashboardContent}>
      <button onClick={refechPost}>Refetch</button>
      <div>{isLoading && "Loading ..."}</div>
      {!isLoading && data && (
        <div>
          {data.map((post) => {
            return (
              <div>
                <h1>Card</h1>
                <h2>{post.title}</h2>
                <p>{post.postContent}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
