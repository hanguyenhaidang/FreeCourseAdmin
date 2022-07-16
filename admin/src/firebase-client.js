import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfXsharAApHIwBsWAGzdmchl5Zx3LfuBg",
  authDomain: "dacntt-6b524.firebaseapp.com",
  projectId: "dacntt-6b524",
  storageBucket: "dacntt-6b524.appspot.com",
  messagingSenderId: "13971978512",
  appId: "1:13971978512:web:f13381905de28cbb528d95",
  measurementId: "G-60Y9R6VMWJ",
};

const app = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage(app);

export default storage;

// Note upload files
// docs: https://firebase.google.com/docs/storage/web/upload-files

export function upload(
  directory,
  item = { fileName: "", file: null },
  onCompleteCallback,
  progressCallback
) {
  const fileName = item.fileName;
  const file = item.file;
  const promise = new Promise((resolve, reject) => {
    const uploadTask = storage.ref(`/${directory}/${fileName}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressCallback && progressCallback(progress);
      },
      (err) => {
        reject(err);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          onCompleteCallback && onCompleteCallback(downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
  return promise;
}

export class Upload {
  constructor(directory, file, onCompleteCallback, progressCallback) {
    this.directory = directory;
    this.onCompleteCallback = onCompleteCallback;
    this.file = file;
    this.progressCallback = progressCallback;
    this.storage = storage;
  }

  start() {
    const promise = new Promise((resolve, reject) => {
      this.uploadTask = storage
        .ref(`/${this.directory}/${new Date().getTime() + this.file.name}`)
        .put(this.file);
      this.uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.progressCallback && this.progressCallback(progress);
        },
        (err) => {
          reject(err);
        },
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.onCompleteCallback && this.onCompleteCallback(downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
    return promise;
  }
  stop() {
    this.uploadTask?.cancel();
  }
}
