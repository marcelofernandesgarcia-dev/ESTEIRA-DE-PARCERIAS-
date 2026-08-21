/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection as firestoreCollection, 
  query as firestoreQuery, 
  onSnapshot as firestoreOnSnapshot, 
  addDoc as firestoreAddDoc, 
  serverTimestamp as firestoreServerTimestamp,
  updateDoc as firestoreUpdateDoc,
  doc as firestoreDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const isFirebaseConfigured = !!(firebaseConfig.projectId && firebaseConfig.apiKey);

let db: any;
if (isFirebaseConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.warn("Firebase failed to initialize:", error);
    db = null;
  }
}

// Firestore APIs Wrappers
export function collection(database: any, path: string) {
  if (isFirebaseConfigured && db) {
    return firestoreCollection(db, path);
  }
  return { path };
}

export function query(col: any) {
  if (isFirebaseConfigured && db) {
    return firestoreQuery(col);
  }
  return col;
}

export function onSnapshot(q: any, callback: (snapshot: any) => void) {
  if (isFirebaseConfigured && db) {
    return firestoreOnSnapshot(q, callback);
  }
  
  let active = true;
  
  const poll = async () => {
    if (!active) return;
    try {
      const res = await fetch('/api/mock-db');
      const list = await res.json();
      
      const snapshot = {
        forEach: (fn: (doc: any) => void) => {
          list.forEach((item: any) => {
            fn({
              id: item.id,
              data: () => ({
                autor: item.autor,
                descricao: item.descricao,
                status: item.status,
                votos: item.votos || 0,
                createdAt: new Date(item.createdAt)
              })
            });
          });
        }
      };
      callback(snapshot);
    } catch (err) {
      console.error("Mock DB fetch failed:", err);
    }
    setTimeout(poll, 2000);
  };

  poll();

  return () => {
    active = false;
  };
}

export async function addDoc(col: any, data: any) {
  if (isFirebaseConfigured && db) {
    return firestoreAddDoc(col, data);
  }
  
  try {
    const res = await fetch('/api/mock-db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        autor: data.autor,
        descricao: data.descricao,
        status: data.status,
        votos: data.votos || 0
      })
    });
    const newDoc = await res.json();
    return { id: newDoc.id };
  } catch (err) {
    console.error("Mock DB add failed:", err);
    return { id: 'error-' + Date.now() };
  }
}

export function doc(database: any, path: string, id: string) {
  if (isFirebaseConfigured && db) {
    return firestoreDoc(db, path, id);
  }
  return { path, id };
}

export async function updateDoc(docRef: any, data: any) {
  if (isFirebaseConfigured && db) {
    return firestoreUpdateDoc(docRef, data);
  }
  
  try {
    await fetch(`/api/mock-db/${docRef.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.error("Mock DB update failed:", err);
  }
  return void 0;
}

export function serverTimestamp() {
  if (isFirebaseConfigured && db) {
    return firestoreServerTimestamp();
  }
  return new Date();
}

// Project Logbook (Diário de Bordo) API Connectors
export interface LogbookEntry {
  id: string;
  autor: string;
  tipo: 'tecnico' | 'gerencial';
  descricao: string;
  createdAt: Date;
  titulo?: string;
  participantes?: string;
  desafios?: string;
  licoes?: string;
  indicadores?: string;
}

export function onSnapshotLogbook(callback: (entries: LogbookEntry[]) => void) {
  let active = true;
  
  const poll = async () => {
    if (!active) return;
    try {
      const res = await fetch('/api/logbook');
      const list = await res.json();
      callback(list.map((item: any) => ({
        id: item.id,
        autor: item.autor,
        tipo: item.tipo,
        descricao: item.descricao,
        titulo: item.titulo || '',
        participantes: item.participantes || '',
        desafios: item.desafios || '',
        licoes: item.licoes || '',
        indicadores: item.indicadores || '',
        createdAt: new Date(item.createdAt)
      })));
    } catch (err) {
      console.error("Logbook fetch failed:", err);
    }
    setTimeout(poll, 2000);
  };

  poll();

  return () => {
    active = false;
  };
}

export async function addLogbookEntry(data: Omit<LogbookEntry, 'id' | 'createdAt'>) {
  try {
    const res = await fetch('/api/logbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const newDoc = await res.json();
    return { id: newDoc.id };
  } catch (err) {
    console.error("Logbook add failed:", err);
    return { id: 'error-' + Date.now() };
  }
}

export { db, isFirebaseConfigured };
