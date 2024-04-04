import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaListScreen from "./MediaListScreen";
import { getListFromFirestore } from "../store/reducers/slice/mediaSlice";

const FavoriteScreen = () => {
  const [favoriteData, setFavoriteData] = useState([]);
  const dispatch = useDispatch();
  const { favoriteList } = useSelector((state) => state.firestore);

  useEffect(() => {
    dispatch(getListFromFirestore("favorites"))
      .then((action) => {
        const favoritePayload = action.payload;
        setFavoriteData(favoritePayload);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  }, [favoriteList]);

  const mappedFavorites = favoriteData
    ? favoriteData.map((item) => item.data)
    : [];

  return <MediaListScreen mediaList={mappedFavorites} listType="favorite" />;
};

export default FavoriteScreen;
