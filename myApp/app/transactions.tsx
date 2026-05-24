import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import useTheme from '@/hooks/use-theme-color';

type Transaction = {
  _id: string;
  paymentMode: string;
  amount: number;
  status: string;
  invoiceId: string;
  createdAt: string;
};

export default function Transactions() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:5000/transactions?page=${page}&limit=10`);
      const newTransactions = response.data.transactions || [];
      setTransactions((prev) => [...prev, ...newTransactions]);

      if (newTransactions.length < 10) {
        setHasMore(false);
      }

      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Transactions</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id}
        onEndReached={fetchTransactions}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.value}>Invoice: {item.invoiceId}</Text>
            <Text style={styles.value}>Payment: {item.paymentMode}</Text>
            <Text style={styles.value}>Amount: ₹{item.amount}</Text>
            <Text style={styles.value}>Status: {item.status}</Text>
            <Text style={styles.value}>{new Date(item.createdAt).toLocaleString()}</Text>

            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadText}>Download Receipt</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 20,
    },
    card: {
      backgroundColor: theme.card,
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    value: {
      color: theme.text,
      marginBottom: 8,
    },
    downloadButton: {
      marginTop: 10,
      backgroundColor: theme.primary,
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    downloadText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
