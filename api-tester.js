// Firebase Auth Initialization
import { getAuth } from "firebase/auth";
const auth = getAuth();

// Function to login user
async function loginUser() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    document.getElementById(
      "login-response"
    ).innerText = `Logged in! JWT: ${token}`;
  } catch (error) {
    document.getElementById(
      "login-response"
    ).innerText = `Error: ${error.message}`;
  }
}

// Function to call custom backend endpoints
async function callEndpoint() {
  const url = document.getElementById("custom-endpoint").value;
  const method = document.getElementById("custom-method").value.toUpperCase();
  const data = document.getElementById("custom-data").value;

  try {
    const token = await auth.currentUser.getIdToken();
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: method !== "GET" ? data : null,
    });

    const result = await response.json();
    document.getElementById("custom-response").innerText = JSON.stringify(
      result,
      null,
      2
    );
  } catch (error) {
    document.getElementById(
      "custom-response"
    ).innerText = `Error: ${error.message}`;
  }
}
