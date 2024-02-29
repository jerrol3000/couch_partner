import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import axios from "axios";

const DetailsScreen = ({ route }) => {
  const { item } = route.params;
  const [details, setDetails] = useState(null);

  const API_KEY = "f00232dfb1ce381afc3c65971e0fd1aa";

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${item.media_type}/${item.id}`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
              append_to_response:
                "credits,companies,countries,images,recommendations,similar",
            },
          }
        );
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [item]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.title || item.name}</Text>
      <Text style={styles.overview}>{item.overview}</Text>
      {details && (
        <>
          <Text style={styles.detail}>
            Cast: {details.credits.cast.map((actor) => actor.name).join(", ")}
          </Text>
          <Text style={styles.detail}>
            Production Companies:{" "}
            {details.production_companies
              .map((company) => company.name)
              .join(", ")}
          </Text>
          <Text style={styles.detail}>
            Production Countries:{" "}
            {details.production_countries
              .map((country) => country.name)
              .join(", ")}
          </Text>
          {item.media_type === "movie" && (
            <Text style={styles.detail}>
              Runtime: {details.runtime} minutes
            </Text>
          )}
          {item.media_type === "tv" && (
            <Text style={styles.detail}>Status: {details.status}</Text>
          )}
          {item.media_type === "tv" && (
            <Text style={styles.detail}>
              Networks:{" "}
              {details.networks.map((network) => network.name).join(", ")}
            </Text>
          )}
          {item.media_type === "movie" && (
            <Text style={styles.detail}>Revenue: ${details.revenue}</Text>
          )}
          {item.media_type === "movie" && (
            <Text style={styles.detail}>Budget: ${details.budget}</Text>
          )}
          <Text style={styles.detail}>
            Similar Movies/TV Shows:{" "}
            {details.similar.results
              .map((similar) => similar.title || similar.name)
              .join(", ")}
          </Text>
          <Text style={styles.detail}>
            Recommendations:{" "}
            {details.recommendations.results
              .map(
                (recommendation) => recommendation.title || recommendation.name
              )
              .join(", ")}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
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
  },
  overview: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DetailsScreen;
