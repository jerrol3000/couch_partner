import React from "react";
import { useSelector } from "react-redux";
import MediaListScreen from "./MediaListScreen";

const WatchListScreen = () => {
  const { watchList } = useSelector((state) => state.watchList);

  return <MediaListScreen mediaList={watchList} listType="watchList" />;
};

export default WatchListScreen;
