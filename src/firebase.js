import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidV4 } from 'uuid'

const firebaseConfig = {
  apiKey: "AIzaSyBn6McJDUb8AmgGWhHFyms0uqm4ykrLVyE",
  authDomain: "social-app-cce9a.firebaseapp.com",
  projectId: "social-app-cce9a",
  storageBucket: "social-app-cce9a.appspot.com",
  messagingSenderId: "136886387683",
  appId: "1:136886387683:web:f3355cbb1c260b2bfe56d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


// 'file' comes from the Blob or File API
export const uploadFile = async (file) => {
  const id = uuidV4()
  const storageRef = ref(storage, `${id}/${file.name}`);

  const snapshot = await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(snapshot.ref)

  return downloadURL
}

export const deleteUploadedFile = (url) => {
  var fileRef = ref(storage, url);

  deleteObject(fileRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    console.log(error)
  });
}
