import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
export const saveItem = async (data) => {
  await setDoc(doc(db, "foodItems", `${Date.now()}`), data, { merge: true });
};

const q = query(collection(db, "foodItems"), orderBy("id", "desc"));
export const getAllFoodItems = async () => {
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};
