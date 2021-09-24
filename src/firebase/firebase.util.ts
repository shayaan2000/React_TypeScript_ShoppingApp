import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { ICollection } from "../redux/shop/shop.datatypes";

const firebaseConfig = {
  apiKey: "AIzaSyCdkv6_pniMukaDj_YLVS-Tb2jKDF9YTLk",
  authDomain: "crwn-db-a683c.firebaseapp.com",
  projectId: "crwn-db-a683c",
  storageBucket: "crwn-db-a683c.appspot.com",
  messagingSenderId: "250423907723",
  appId: "1:250423907723:web:d1a9e2dced5e0bafb3cb8e",
  measurementId: "G-8SVC0XWEK6",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ params: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const createUserProfileDocument = async (
  userAuth: User,
  displayNameFromForm?: string
) => {
  if (!userAuth) return;

  const userRef = doc(firestore, "users", userAuth.uid);
  console.log("User ref", userRef);
  const snapShot = await getDoc(userRef);
  console.log(userAuth.uid);
  console.log("SNAPSSHOT--", snapShot);

  if (!snapShot.exists()) {
    // if snapshot doesnt exist, we want to create the user
    console.log("Snapshot doesnt exist");
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName: displayNameFromForm ? displayNameFromForm : displayName,
        email,
        createdAt,
      });
    } catch (error: unknown) {
      console.log("Error while creating user", error);
    }
  } else {
    console.log("Snapshot exists");
  }

  return userRef;
};

// converting snapshot to obj
export const convertCollectionsSnapshotToMap = (
  collections: QuerySnapshot<DocumentData>
) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  // console.log(transformedCollection);

  interface IAccumulator {
    [id: string]: ICollection;
  }
  //converting the array of objs to an object with 5 keys and nested obs
  return transformedCollection.reduce(
    (accumulator: IAccumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },
    {}
  );
};

//mimicking promise by immediately unsubc=scribing
export const getCurrentUser = () => {
  return new Promise<User | null>((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
