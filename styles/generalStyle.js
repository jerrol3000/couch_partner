import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 2 - 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  activeTab: {
    backgroundColor: "#007bff",
  },
  activeTabText: {
    color: "#fff",
  },
  mediaTile: {
    width: ITEM_WIDTH,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginRight: 10,
  },
  mediaPoster: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  mediaTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  menuIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuText: {
    fontSize: 24,
  },
  noMediaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMediaText: {
    fontSize: 16,
    color: "#555",
  },
  backgroundColor: "#333",
  height: 60,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
});

export default styles;
