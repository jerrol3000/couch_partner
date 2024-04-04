import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaListScreen from "./MediaListScreen";
import { getListFromFirestore } from "../store/reducers/slice/mediaSlice";

const WatchListScreen = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const dispatch = useDispatch();
  const { watchList } = useSelector((state) => state.firestore);

  useEffect(() => {
    dispatch(getListFromFirestore("watchlist"))
      .then((action) => {
        const watchlistPayload = action.payload;
        setWatchlistData(watchlistPayload);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  }, [watchList]);
  const mappedWatchlist = watchlistData.map((item) => item.data);

  return <MediaListScreen mediaList={mappedWatchlist} listType="watchList" />;
};

export default WatchListScreen;
