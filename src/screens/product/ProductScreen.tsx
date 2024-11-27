import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constant/color';
import {ProductData} from '../../model';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

type Iprops = {
  id: number;
};

const ProductScreen: React.FC<Iprops> = props => {
  const productData: ProductData[] = useSelector(
    (state: RootState) => state.product.ProductData,
  );
  const id = props?.route?.params?.id;
  const [product, setProduct] = useState<ProductData>();
  const navigation = useNavigation<any>();

  useEffect(() => {
    const selectedProduct = productData.find(ele => ele.id === id);
    selectedProduct && setProduct(selectedProduct);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.secondaryColor} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
      </View>

      <Image source={{uri: product?.thumbnail}} style={styles.thumbnail} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product?.title}</Text>
        <Text style={styles.brand}>Brand: {product?.brand}</Text>
        <Text style={styles.price}>${product?.price.toFixed(2)}</Text>
        <Text style={styles.status}>
          Availability: {product?.availabilityStatus} ({product?.stock} left)
        </Text>
        <Text style={styles.description}>{product?.description}</Text>
        <Text style={styles.sectionTitle}>Details:</Text>
        <Text>Category: {product?.category}</Text>
        <Text>
          Dimensions: {product?.dimensions.width}x{product?.dimensions.height}x
          {product?.dimensions.depth} cm
        </Text>
        <Text>Weight: {product?.weight} kg</Text>
        <Text>SKU: {product?.sku}</Text>
        <Text>Return Policy: {product?.returnPolicy}</Text>
        <Text>Warranty: {product?.warrantyInformation}</Text>
        <Text>Shipping: {product?.shippingInformation}</Text>
        <Text style={styles.sectionTitle}>Reviews:</Text>
        <FlatList
          data={product?.reviews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.review}>
              <Text style={styles.reviewText}>"{item.comment}"</Text>
              <Text>Rating: {item.rating}/5</Text>
              <Text>By: {item.reviewerName}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentColor,
    color: colors.secondaryColor,
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: colors.secondaryColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  thumbnail: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  brand: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    color: '#e91e63',
    marginVertical: 8,
  },
  status: {
    fontSize: 14,
    color: '#ff9800',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginVertical: 8,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: colors.accentColor,
    padding: 5,
    borderRadius: 5,
  },
  review: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#f1f3f4',
    borderRadius: 8,
  },
  reviewText: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
});

export default ProductScreen;
