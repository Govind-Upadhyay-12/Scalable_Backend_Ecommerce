import { db } from "../FireBase.js";
import Product_MODEL from "../models/Products.js";

export async function saveDummyData() {
  try {
    const takeData = await db.collection("users");
    const allData = await takeData.get();

    if (allData.empty) {
      console.log("No data found in Firestore.");
      return;
    }

    const firstDocData = allData.docs[0].data();

    const dataSaved = new Product_MODEL({
      product_name: firstDocData.product_name,
      Price: firstDocData.Price,
    });

    await dataSaved.save();
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
  }
}
