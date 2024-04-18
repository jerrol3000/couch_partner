import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaListScreen from "./MediaListScreen";
import { getListFromFirestore } from "../store/reducers/slice/mediaSlice";

const WatchListScreen = () => {
  const dispatch = useDispatch();
  const { watchList } = useSelector((state) => state.firestore);
  console.log("watchList", watchList);

  useEffect(() => {
    dispatch(getListFromFirestore("watchlist"));
  }, []);

  const mappedWatchlist = watchList ? watchList.map((item) => item.data) : [];

  return <MediaListScreen mediaList={mappedWatchlist} listType="watchList" />;
};

export default WatchListScreen;
