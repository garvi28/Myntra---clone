import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect, useRef } from "react";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  discount: string;
  description: string;
  sizes: string[];
  images: string[];
}

const categories = [
  {
    id: 1,
    name: "Men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Women",
    image: "https://images.unsplash.com/photo-1618244972963-dbad0c4abf18?w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Kids",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop",
  },
];

const products: Product[] = [
  {
    id: 1,
    name: "Casual White T-Shirt",
    brand: "Roadster",
    price: "499",
    discount: "60% OFF",
    description: "A soft, breathable cotton t-shirt perfect for everyday wear.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    name: "Denim Jacket",
    brand: "Levis",
    price: "2499",
    discount: "40% OFF",
    description: "A stylish denim jacket with a relaxed fit and classic detailing.",
    sizes: ["M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=700&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    name: "Summer Dress",
    brand: "ONLY",
    price: "1299",
    discount: "50% OFF",
    description: "A light summer dress with a floral print and easy fit.",
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=700&auto=format&fit=crop",
    ],
  },
];

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [selectedSize, setSelectedSize] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const scrollviewref = useRef<ScrollView>(null);
  const autoscrolltimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  // 🔥 Loading + Start Auto Scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      startautoscroll();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 🔥 Auto Scroll Function
  const startautoscroll = () => {
    autoscrolltimer.current = setInterval(() => {
      if (product && scrollviewref.current) {
        const nextIndex =
          (currentImageIndex + 1) % product.images.length;

        scrollviewref.current.scrollTo({
          x: nextIndex * width,
          animated: true,
        });

        setCurrentImageIndex(nextIndex);
      }
    }, 3000);
  };

  // 🔥 Cleanup
  useEffect(() => {
    return () => {
      if (autoscrolltimer.current) {
        clearInterval(autoscrolltimer.current);
      }
    };
  }, []);

  if (!product) return <Text>Product not found</Text>;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>

        {/* 🔥 Image Slider */}
        <ScrollView
          horizontal
          pagingEnabled
          ref={scrollviewref}
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const index = Math.round(
              e.nativeEvent.contentOffset.x / width
            );
            setCurrentImageIndex(index);
          }}
        >
          {product.images.map((img, i) => (
            <Image
              key={i}
              source={{ uri: img }}
              style={{ width, height: 350 }}
            />
          ))}
        </ScrollView>

        {/* 🔴 Dots */}
        <View style={styles.dotsContainer}>
          {product.images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentImageIndex === i && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* 🧾 Details */}
        <View style={styles.details}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={styles.discount}>
              {product.discount}
            </Text>
          </View>

          <Text style={styles.desc}>
            {product.description}
          </Text>

          {/* 📏 Sizes */}
          <Text style={styles.sizeTitle}>Select Size</Text>
          <View style={styles.sizeContainer}>
            {product.sizes.map((size, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.sizeBox,
                  selectedSize === size &&
                    styles.selectedSize,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 🛒 Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.wishlist}>
          <Text>♡ Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addToBag}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            ADD TO BAG
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#ccc",
    margin: 4,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: "#ff3f6c",
  },
  details: {
    padding: 15,
  },
  brand: {
    fontSize: 18,
    fontWeight: "bold",
  },
  name: {
    color: "gray",
  },
  priceRow: {
    flexDirection: "row",
    marginVertical: 5,
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
  },
  discount: {
    marginLeft: 10,
    color: "green",
  },
  desc: {
    marginTop: 10,
  },
  sizeTitle: {
    marginTop: 15,
    fontWeight: "bold",
  },
  sizeContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  sizeBox: {
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  selectedSize: {
    borderColor: "#ff3f6c",
    backgroundColor: "#ffe6eb",
  },
  bottomBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    padding: 10,
  },
  wishlist: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginRight: 5,
    padding: 12,
  },
  addToBag: {
    flex: 2,
    backgroundColor: "#ff3f6c",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
});