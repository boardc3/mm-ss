export const DB_NAME = 'ScenesetVideoCache';
export const STORE_NAME = 'videos';
export const DB_VERSION = 1;

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('IndexedDB is not available server-side'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IndexedDB error:', event);
      reject('IndexedDB failed to open');
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

export const getCachedVideoBlob = async (url: string): Promise<string | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(url);

      request.onsuccess = () => {
        const blob = request.result as Blob;
        if (blob) {
          console.log(`Cache hit for ${url}`);
          resolve(URL.createObjectURL(blob));
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        reject('Error retrieving from cache');
      };
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const cacheVideo = async (url: string): Promise<string> => {
  try {
    // Check cache first
    const cached = await getCachedVideoBlob(url);
    if (cached) return cached;

    console.log(`Fetching and caching ${url}`);
    const response = await fetch(url);
    const blob = await response.blob();

    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put(blob, url);

    return URL.createObjectURL(blob);
  } catch (e) {
    console.error('Error caching video:', e);
    return url; // Fallback to original URL
  }
};


