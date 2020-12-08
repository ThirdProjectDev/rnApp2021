import { firebase, usersCollection } from "../../firebase";
import "firebase/firestore";

export const registerUser = async ({ email, password }) => {

  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const { user } = response;
    const DB = firebase.database();
    const userProfile = {
      uid: user.uid,
      email: email,
    };
    await DB.ref("users/" + user.uid).set(userProfile);
    return {
      isAuth: true,
      user: userProfile,
    };
  } catch (error) {
    return { error: error.message };
  }
};

const readData = () => {
  var userId = firebase.auth().currentUser.uid;
  // console.warn(userId)

  var ref = firebase.database().ref("/users/" + userId);

ref.on("value", function(snapshot) {
  //  console.warn(snapshot.val());
}, function (error) {
   console.warn("Error: " + error.code);
});
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    // once the user logs in the data on the RTDB needs to be pushed to the INITIAL_STATE.
    // const userProfile = await usersCollection.doc(response.user.uid).get();
    const data = readData();
    
    return {
      isAuth: true,
      user: data,
    };
  } catch (error) {
    return { error: error.message };
  }
};

export const autoSignIn = () => (
  new Promise((resolve,reject)=>{
      firebase.auth().onAuthStateChanged( user => {
          if(user){
            firebase.database().ref("/users/" + user.uid).get().then( snapshot =>{
                  resolve({ isAuth: true, user: snapshot.val() })
                  console.warn(snapshot.val())
              })
          } else {
            resolve({ isAuth: false, user:[] })
          }
  
      })
  })
)

export const logoutUser = () => (
  firebase.auth().signOut()
)