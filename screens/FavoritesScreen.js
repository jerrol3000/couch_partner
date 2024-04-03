import React from "react";
import { useSelector } from "react-redux";
import MediaListScreen from "./MediaListScreen";

const FavoriteScreen = () => {
  const { favorite } = useSelector((state) => state.favoriteList);

  const favoriteData = favorite.map((item) => item.data);

  return <MediaListScreen mediaList={favoriteData} listType="favorite" />;
};

export default FavoriteScreen;
