import {react, useState, useEffect} from "react";
import { View, Text, Flatlist, StyleSheet, TouchableOpacity,ActivityIndicator} from "react-native";
import axios from "axios";
import usetheme from "@/hooks/use-theme-color";
type Transaction = {
    id: string;
    paymentMode: string;
    amount: number;
    status: string;
    invoiceid: string;
    createdAt: string;
};
export default function Transactions() {
    const { theme } = usetheme();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() = fetchTransactions();
        const fetchTransactions = async ()
}, []);
async function fetchTransactions() {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
        const response = await axios.get(
            `http://localhost:5000/transactions?page=${page}&limit=10`
        );
        const newTransactions = response.data.transactions;
        setTransactions((prev) => [...prev, ...newTransactions]);
        if (newTransactions.length < 10) {
            setHasMore(false);
        } 
        
            setPage((prev) => prev + 1);
        
    } catch (error) {
        console.error("Error fetching transactions:", error);
    } finally {
        setLoading(false);
    }
}
function renderItem({ item }: { item: Transaction }) {
    return (
        <View style={styles.card}>
        <View style={styles.row}>
        <Text style={[styles.label]}
        Invoice
        </Text>
        <Text style={styles.value}>
            {item.invoiceid}
        </Text>
        <Text style={styles.value}>
            {item.paymentMode}
        </Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.label}>
            Payment Mode
        </Text>
        <Text style={styles.value}>
            {item.paymentMode}
        </Text>
        </View>
        
        <View style={styles.row}>
        <Text style={styles.label}>
            Amount
        </Text>
        <Text style={styles.value}>
            ${item.amount}
        </Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.label}>
            Status
        </Text>
        <Text style={styles.value}>
         {
         color: item.status === "Success" 
         ? "green"
         : "red",
         },
         ]}
         > 
            {item.status}
        </Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.label}>
            Date
        </Text>
        <Text style={styles.value}>
                { new Date(
            item.createdAt
            ).toLocaleString()}
        </Text>
        </View>
        <TouchableOpacity style={styles.button}>
        onPress={() => {
        const url = `http://localhost:5000/transactions/${item.id}/invoice`;
        console.log("Download Receipt:", url);
        );
    }}
    >
    <Text style={styles.downloadText}>
        Download Receipt 
    </Text>
    </TouchableOpacity>
    </View>
    );
}
return (
    <View style={styles.container}>
    <Text style={styles.title}>
        My Transactions
    </Text>
    <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={fetchTransactions}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
        loading ? <ActivityIndicator size="large" color={theme.primary} /> : null
        }
    />
    </View>
 );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: theme.text,
        marginBottom: 20,
    },
    card: {
        backgroundColor: theme.cardBackground,
        padding: 15,
        marginBottom: 12,
        borderRadius: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        },
    value: {
        color: theme.text,
    },
    downloadButton: {
        marginTop: 10,
        backgroundColor: theme.primary,
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    downloadText: {
        color: "#fff",
        fontWeight: "bold",
    },
    