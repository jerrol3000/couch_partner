import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaListScreen from "./MediaListScreen";
import { getFavoriteFromFireStore } from "../store/reducers/slice/addToFavoriteSlice";

const FavoriteScreen = () => {
  const [favoriteData, setFavoriteData] = useState([]);
  const dispatch = useDispatch();
  const { favorite } = useSelector((state) => state.favoriteList);

  useEffect(() => {
    dispatch(getFavoriteFromFireStore())
      .then((action) => {
        const favoritePayload = action.payload;
        setFavoriteData(favoritePayload);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  }, [favorite]);
  const mappedFavorites = favoriteData.map((item) => item.data);

  return <MediaListScreen mediaList={mappedFavorites} listType="favorite" />;
};

export default FavoriteScreen;
