"use client";
import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, listAll } from "firebase/storage";

export default function FirebaseTestPage() {
  const [dbStatus, setDbStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [storageStatus, setStorageStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [dbError, setDbError] = useState<string | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    // Test Firestore connection
    const testFirestore = async () => {
      try {
        console.log("Testing Firestore connection...");
        const querySnapshot = await getDocs(collection(db, "blog-posts"));
        console.log("Firestore query result:", querySnapshot);
        setDbStatus("success");
      } catch (error) {
        console.error("Firestore connection error:", error);
        setDbError(error instanceof Error ? error.message : String(error));
        setDbStatus("error");
      }
    };

    // Test Storage connection
    const testStorage = async () => {
      try {
        console.log("Testing Firebase Storage connection...");
        const listRef = ref(storage, "blog-images");
        await listAll(listRef);
        setStorageStatus("success");
      } catch (error) {
        console.error("Storage connection error:", error);
        setStorageError(error instanceof Error ? error.message : String(error));
        setStorageStatus("error");
      }
    };

    testFirestore();
    testStorage();
  }, []);

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Firebase Connection Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Firestore Connection</h2>

            {dbStatus === "loading" && <p>Testing Firestore connection...</p>}

            {dbStatus === "success" && (
              <div className="alert alert-success">
                <p>Firestore connection successful!</p>
              </div>
            )}

            {dbStatus === "error" && (
              <div className="alert alert-error">
                <p>Firestore connection failed</p>
                {dbError && <p className="text-sm mt-2">{dbError}</p>}
              </div>
            )}
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Firebase Storage Connection</h2>

            {storageStatus === "loading" && (
              <p>Testing Storage connection...</p>
            )}

            {storageStatus === "success" && (
              <div className="alert alert-success">
                <p>Storage connection successful!</p>
              </div>
            )}

            {storageStatus === "error" && (
              <div className="alert alert-error">
                <p>Storage connection failed</p>
                {storageError && <p className="text-sm mt-2">{storageError}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          Troubleshooting Firebase Connection
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Make sure you have a <code>.env.local</code> file with all the
            required Firebase environment variables
          </li>
          <li>
            Check that Firebase configuration is correct in{" "}
            <code>lib/firebase.ts</code>
          </li>
          <li>
            Verify that your Firebase project has Firestore and Storage enabled
          </li>
          <li>
            Check Firebase security rules to ensure they allow read/write
            operations
          </li>
          <li>
            Make sure your Firebase API key hasn't been restricted or revoked
          </li>
        </ul>
      </div>
    </div>
  );
}
