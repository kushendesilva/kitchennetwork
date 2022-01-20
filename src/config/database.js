import { useState, useEffect } from "react";
import { db } from "../config";
import {
  collection,
  getDocs,
  where,
  query,
  collectionGroup,
} from "firebase/firestore/lite";

export const ListByName = (listRef) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const getList = async (listRef) => {
      const data = await getDocs(collection(db, listRef));
      setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getList(listRef);
  }, []);
  return list;
};

export const ListWithWhere = (listRef, label, detail) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const getList = async (listRef, label, detail) => {
      const q = query(collection(db, listRef), where(label, "==", detail));
      const querySnapshot = await getDocs(q);
      setList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getList(listRef, label, detail);
  }, []);
  return list;
};

export const ListNested = (listRef, label, detail) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const getList = async (listRef, label, detail) => {
      const q = query(collectionGroup(db, listRef), where(label, "==", detail));
      const querySnapshot = await getDocs(q);
      setList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getList(listRef, label, detail);
  }, []);
  return list;
};
