import { initializeApp } from "firebase/app";
import { collection, getFirestore, query, where } from "firebase/firestore";

let config = {
  "apiKey": "AIzaSyDNlR_XNl6QTtgG5T5HEdFwwkj-ViLLXXY",
  "appId": "1:494672551387:web:6e2cdbd2bbb1e5a9",
  "authDomain": "nikethblog.firebaseapp.com",
  "databaseURL": "https://nikethblog.firebaseio.com",
  "messagingSenderId": "494672551387",
  "projectId": "nikethblog",
  "storageBucket": "nikethblog.appspot.com"
};
const firestore =  getFirestore(initializeApp(config));
export default firestore;



export const storiesQuery = query(collection(firestore, "pages"), where("liveStatus", "==", true));