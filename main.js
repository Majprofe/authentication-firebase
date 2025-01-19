// main.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

// =====================
// 1. CONFIGURAR FIREBASE
// =====================
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, 
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializamos Firebase con esa configuración
const app = initializeApp(firebaseConfig);
// Referencia al servicio Auth
const auth = getAuth(app);

// =====================
// 2. REGISTRO DE USUARIO
// =====================
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = registerForm.nombre.value;
    const email = registerForm.email.value;
    const pass = registerForm.password.value;
    // "rol" si lo tenías en el formulario, también. Pero si no guardas en DB, 
    // no tiene mucha utilidad. Lo omites o lo usas en un custom claim.
    
    try {
      // Creas el usuario en Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      alert("Usuario registrado: " + user.email);
      // Redirigir a login o donde quieras
      window.location.href = "login.html";
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      alert("Error: " + error.message);
    }
  });
}

// =====================
// 3. LOGIN DE USUARIO
// =====================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const pass  = loginForm.password.value;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      alert("Bienvenido: " + user.email);
      window.location.href = "api-tester.html"; // o donde quieras
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Error: " + error.message);
    }
  });
}

// =====================
// 4. DETECTAR USUARIO LOGUEADO
// =====================
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Usuario activo:", user.uid, user.email);
     // Obtenemos el token (ID Token) del usuario autenticado
     const token = await user.getIdToken(/* forceRefresh = false */);
     console.log("ID Token de Firebase:", token);
  } else {
    console.log("Nadie ha iniciado sesión");
  }
});

// =====================
// Función de logout
// =====================
async function logoutUser() {
  await signOut(auth);
  alert("Sesión cerrada");
  window.location.href = "login.html";
}

