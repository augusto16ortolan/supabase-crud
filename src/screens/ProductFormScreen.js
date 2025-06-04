import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function ProductFormScreen({ navigation, route }) {
  const editingProduct = route.params?.product;

  const [description, setDescription] = useState(
    editingProduct?.description || ""
  );
  const [price, setPrice] = useState(
    editingProduct ? String(editingProduct.price) : ""
  );
  const [image, setImage] = useState(editingProduct?.image || "");
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: editingProduct ? "Editar Produto" : "Cadastrar Produto",
    });
  }, []);

  const handleSave = () => {
    if (!description.trim() || !price.trim() || !image.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos.");
      return;
    }

    const priceNumber = parseFloat(price.replace(",", "."));
    if (isNaN(priceNumber) || priceNumber <= 0) {
      Alert.alert("Preço inválido", "Digite um preço válido maior que zero.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      Alert.alert(
        "Sucesso",
        editingProduct ? "Produto atualizado!" : "Produto cadastrado!"
      );

      navigation.goBack();

      setLoading(false);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f8f9fc" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          placeholder="Descrição do produto"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Preço (R$)</Text>
        <TextInput
          placeholder="Ex: 19.90"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <Text style={styles.label}>URL da Imagem</Text>
        <TextInput
          placeholder="https://exemplo.com/imagem.jpg"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={image}
          onChangeText={setImage}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {editingProduct ? "Salvar alterações" : "Cadastrar produto"}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  label: {
    fontSize: 15,
    color: "#343a40",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#212529",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    backgroundColor: "#4e73df",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#4e73df",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
