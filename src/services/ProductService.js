import { supabase } from "../config/supabase";

export async function readProducts(userId) {
  try {
    let { data, error } = await supabase
      .from("product")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error(error.message);
      return { error: "Ocorreu um erro ao buscar os produtos" };
    }

    return { products: data };
  } catch (error) {
    console.error(error.message);
    return { error: "Ocorreu um erro ao buscar os produtos" };
  }
}

export async function createProduct(userId, product) {
  try {
    const { data, error } = await supabase
      .from("product")
      .insert([
        {
          description: product.description,
          price: product.price,
          image: product?.image,
          user_id: userId,
        },
      ])
      .select();

    if (error) {
      console.error(error.message);
      return { error: "Ocorreu um erro ao cadastrar o produto" };
    }

    return { product: data[0] };
  } catch (error) {
    console.error(error.message);
    return { error: "Ocorreu um erro ao criar o produto" };
  }
}

export async function updateProduct(userId, productId, product) {
  try {
    const { data, error } = await supabase
      .from("product")
      .update([
        {
          description: product.description,
          price: product.price,
          image: product?.image,
          user_id: userId,
        },
      ])
      .eq("id", productId)
      .select();

    if (error) {
      console.error(error.message);
      return { error: "Ocorreu um erro ao editar o produto" };
    }

    return { product: data[0] };
  } catch (error) {
    console.error(error.message);
    return { error: "Ocorreu um erro ao editar o produto" };
  }
}

export async function deleteProduct(userId, productId) {
  try {
    const { error } = await supabase
      .from("product")
      .delete()
      .eq("id", productId)
      .eq("user_id", userId);

    if (error) {
      console.error(error.message);
      return { error: "Ocorreu um erro ao deletar o produto" };
    }

    return {};
  } catch (error) {
    console.error(error.message);
    return { error: "Ocorreu um erro ao deletar o produto" };
  }
}
