export const mergeRecentlyViewed = async (userID) => { 
    const localProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    if (localProducts.length === 0) return;
    try {
        await fetch("/api/recently-viewed/merge", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                 userId: userID,
                 products: localProducts
                 }),
        });

        // Clear local storage after merging
        localStorage.removeItem("recentlyViewed");
         } 
    catch (error) {
        console.error("Error merging recently viewed products:", error);
    }
};