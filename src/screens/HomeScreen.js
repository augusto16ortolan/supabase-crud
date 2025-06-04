import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../config/supabase";

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([
    {
      id: "1",
      description: "Smart TV Samsung 50 polegadas",
      price: 2900.0,
      image:
        "https://a-static.mlcdn.com.br/1500x1500/smart-tv-50-4k-uhd-led-samsung-50du7700-wi-fi-bluetooth-alexa-3-hdmi/magazineluiza/238245000/458132cb7c4ad98839480f8c7e73f9dc.jpg",
    },
    {
      id: "2",
      description: "Smart TV LG 50 polegadas",
      price: 2300.0,
      image:
        "https://assets.betalabs.net/fit-in/760x760/filters:fill(white)/production/projetocasaecompanhia/item-images/0054dcbe579ed18f90f0bd10030217d0.png",
    },
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("ProductForm")}
          style={{ marginRight: 16 }}
        >
          <Ionicons name="add-circle-outline" size={28} color="#4e73df" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => supabase.auth.signOut()}
        >
          <Ionicons name="exit-outline" size={28} color="#4e73df" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      "Excluir produto",
      "Tem certeza que deseja excluir este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => setProducts(products.filter((p) => p.id !== id)),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProductForm", { product: item })}
          style={styles.actionButton}
        >
          <Ionicons name="pencil-outline" size={24} color="#4e73df" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.actionButton}
        >
          <Ionicons name="trash-outline" size={24} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fc",
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    color: "#6c757d",
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 16,
  },
  emptyText: {
    color: "#6c757d",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
