import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// =====================
// Inicializar Firebase
// =====================
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

console.log("Configuración de Firebase:", firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const urlbase = 'http://localhost:8080'
// =====================
// Función: Obtener Perfil de Usuario
// =====================
window.getUserProfile = async function () {
  try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch('http://localhost:8080/protected/profile', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      document.getElementById('profile-response').innerText = JSON.stringify(result, null, 2);
  } catch (error) {
      document.getElementById('profile-response').innerText = `Error: ${error.message}`;
  }
};


// =====================
// Función: Enviar Datos del Usuario
// =====================
window.postUserData = async function () {
  const data = document.getElementById('user-data').value;

  try {
    const token = await auth.currentUser.getIdToken();
    const response = await fetch(urlbase+'/protected/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    });
    const result = await response.json();
    document.getElementById('data-response').innerText = JSON.stringify(result, null, 2);
  } catch (error) {
    document.getElementById('data-response').innerText = `Error: ${error.message}`;
  }
};

// =====================
// Función: Eliminar Recurso
// =====================
window.deleteResource = async function () {
  const resourceId = document.getElementById('resource-id').value;

  try {
    const token = await auth.currentUser.getIdToken();
    const response = await fetch(urlbase+'/protected/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ resourceId }),
    });
    const result = await response.json();
    document.getElementById('delete-response').innerText = JSON.stringify(result, null, 2);
  } catch (error) {
    document.getElementById('delete-response').innerText = `Error: ${error.message}`;
  }
};
