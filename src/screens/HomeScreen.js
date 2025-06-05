import React, { useState, useLayoutEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../config/supabase";
import { readProducts, deleteProduct } from "../services/ProductService";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getProducts();
    }, [])
  );

  async function getProducts() {
    setLoading(true);
    const userId = await getUserId();
    const { products, error } = await readProducts(userId);

    if (error) {
      console.error(error.message);
      Alert.alert("Erro", error.message);
      setProducts([]);
      setLoading(false);
      return;
    }

    setProducts(products);
    setLoading(false);
  }

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

  async function getUserId() {
    const user = await supabase.auth.getUser();
    return user.data.user.id;
  }

  const handleDelete = (id) => {
    Alert.alert(
      "Excluir produto",
      "Tem certeza que deseja excluir este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const userId = await getUserId();
            const response = await deleteProduct(userId, id);

            if (response.error) {
              Alert.alert("Erro", response.error);
              return;
            }

            setProducts((prevProducts) =>
              prevProducts.filter((product) => product.id !== id)
            );

            //getProducts();
          },
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4e73df" />
      </View>
    );
  }

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
