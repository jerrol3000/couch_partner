import React from "react";
import { useSelector } from "react-redux";
import MediaListScreen from "./MediaListScreen";

const FavoriteScreen = () => {
  const { favorite } = useSelector((state) => state.favoriteList);

  return <MediaListScreen mediaList={favorite} listType="favorite" />;
};

export default FavoriteScreen;
