import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaListScreen from "./MediaListScreen";
import { getListFromFirestore } from "../store/reducers/slice/mediaSlice";
import { removefromList } from "../store/reducers/slice/mediaMenuSlice";

const FavoriteScreen = () => {
  const dispatch = useDispatch();
  const { favoriteList } = useSelector((state) => state.firestore);

  useEffect(() => {
    dispatch(getListFromFirestore("favorites"));
  }, []);

  const mappedFavorites = favoriteList
    ? favoriteList.map((item) => item.data)
    : [];

  return <MediaListScreen mediaList={mappedFavorites} listType="favorite" />;
};

export default FavoriteScreen;
