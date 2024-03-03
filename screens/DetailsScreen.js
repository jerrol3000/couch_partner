import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { WebView } from "react-native-webview";
import { setDetails } from "../store/reducers/slice/detailSlice";

const DetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const API_KEY = "f00232dfb1ce381afc3c65971e0fd1aa";

  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.details);
  const { searchType } = useSelector((state) => state.media);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async (media_type) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${item.id}`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
              append_to_response:
                "credits,companies,countries,images,recommendations,similar,videos",
            },
          }
        );
        dispatch(setDetails(response.data));
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    setLoading(false);
    fetchDetails(searchType);
  }, [item]);

  const handleVideoPress = () => {
    //handle videos
  };

  const handleSimilarPress = (similar) => {
    navigation.navigate("Details", { item: similar });
  };

  const addComma = (num) => {
    let numArray = String(num).split("");
    let commaIndex = numArray.length - 3;
    while (commaIndex > 0) {
      numArray.splice(commaIndex, 0, ",");
      commaIndex -= 3;
    }
    return numArray.join("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.title || item.name}</Text>

      <Text style={styles.detail}>
        Genre:{" "}
        {details.genres.length ? (
          details.genres.map((genre) => genre.name).join(", ")
        ) : (
          <Text>Unclassified</Text>
        )}
      </Text>

      <Text></Text>

      <Text style={styles.overview}>{item.overview}</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        details && (
          <>
            <Text style={styles.sectionTitle}>Details</Text>
            <Text style={styles.detail}>Cast:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.castScrollView}
            >
              {details.credits.cast.map((actor) => (
                <View key={actor.id} style={styles.actorContainer}>
                  {actor.profile_path ? (
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
                      }}
                      style={styles.actorImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={
                        actor.gender === 1
                          ? require("../assets/default_female_profile.jpeg")
                          : require("../assets/default_male_display.jpeg")
                      }
                      style={styles.defaultActorImage}
                      resizeMode="cover"
                    />
                  )}
                  <Text style={styles.actorName}>{actor.name}</Text>
                </View>
              ))}
            </ScrollView>
            <Text style={styles.detail}>
              Production Companies:{" "}
              {details.production_companies
                .map((company) => company.name)
                .join(", ") || <Text>Unknown</Text>}
            </Text>
            <Text style={styles.detail}>
              Production Countries:{" "}
              {details.production_countries
                .map((country) => country.name)
                .join(", ") || <Text>Unknown</Text>}
            </Text>
            {searchType === "movie" && (
              <Text style={styles.detail}>
                Runtime: {details.runtime} minutes
              </Text>
            )}
            {searchType === "movie" && (
              <Text style={styles.detail}>
                Budget:{" "}
                {details.budget > 0 ? (
                  `$${addComma(details.budget)}`
                ) : (
                  <Text style={styles.detail}>Unknown</Text>
                )}
              </Text>
            )}

            <Text style={styles.sectionTitle}>Similar Movies/TV Shows</Text>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.similarScrollView}
              >
                {details.similar && details.similar.results.length ? (
                  details.similar.results.map((similar) => (
                    <TouchableOpacity
                      key={similar.id}
                      style={styles.similarContainer}
                      onPress={() => handleSimilarPress(similar)}
                    >
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${similar.poster_path}`,
                        }}
                        style={styles.similarPoster}
                        resizeMode="cover"
                      />
                      <Text style={styles.similarTitle} numberOfLines={2}>
                        {similar.title || similar.name}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text>No similar movies/TV shows found</Text>
                )}
              </ScrollView>
            )}

            <Text style={styles.sectionTitle}>Videos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {details.videos.results.length ? (
                details.videos.results.map((video) => (
                  <TouchableOpacity
                    key={video.id}
                    style={styles.videoContainer}
                    onPress={() => handleVideoPress(video)}
                  >
                    <WebView
                      source={{
                        uri: `https://www.youtube.com/embed/${video.key}`,
                      }}
                      style={styles.videoThumbnail}
                    />
                    <Text style={styles.videoTitle} numberOfLines={2}>
                      {video.name}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>
                  <Text>No videos available at this time</Text>
                </Text>
              )}
            </ScrollView>
          </>
        )
      )}
      <View style={styles.additionalDetails}>
        <Text style={styles.detail}>
          First Air Date: {details.first_air_date}
        </Text>
        <Text style={styles.detail}>
          Last Air Date: {details.last_air_date}
        </Text>
        <Text style={styles.detail}>
          Number of Seasons: {details.number_of_seasons}
        </Text>
        <Text style={styles.detail}>
          Number of Episodes: {details.number_of_episodes}
        </Text>
        <Text style={styles.detail}>Status: {details.status}</Text>
        <Text style={styles.detail}>Tagline: {details.tagline}</Text>
        <Text style={styles.detail}>Homepage: {details.homepage}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 20,
  },
  poster: {
    width: 300,
    height: 450,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  overview: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  videoContainer: {
    marginRight: 10,
    alignItems: "center",
  },
  videoTitle: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    width: Dimensions.get("window").width - 40,
  },
  videoThumbnail: {
    width: 200,
    height: 150,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  castScrollView: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  actorContainer: {
    marginRight: 10,
    alignItems: "center",
  },
  actorImage: {
    width: 80,
    height: 120,
    borderRadius: 10,
  },
  defaultActorImage: {
    width: 80,
    height: 120,
    borderRadius: 10,
  },
  actorName: {
    marginTop: 5,
    textAlign: "center",
    maxWidth: 80,
  },
  similarScrollView: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  similarContainer: {
    marginRight: 10,
    alignItems: "center",
  },
  similarPoster: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  similarTitle: {
    marginTop: 5,
    textAlign: "center",
    maxWidth: 120,
  },
  additionalDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
});

export default DetailsScreen;
