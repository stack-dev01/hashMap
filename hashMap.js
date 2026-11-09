class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(capacity).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  getBucket(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    return this.buckets[index];
  }

  set(key, value) {
    const bucket = this.getBucket(key);

    for (const entry of bucket) {
      if (entry.key === key) {
        entry.value = value;
        return;
      }
    }

    bucket.push({ key, value });
    this.size++;
  }
    get(key) {
    const bucket = this.getBucket(key);

    for (const entry of bucket) {
      if (entry.key === key) {
        return entry.value;
      }
    }

    return undefined; // key not found
  }

  has(key) {
    const bucket = this.getBucket(key);

    for (const entry of bucket) {
      if (entry.key === key) {
        return true;
      }
    }

    return false;
  }
    remove(key) {
    const bucket = this.getBucket(key);

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1); // delete that entry from the bucket
        this.size--;
        return true;
      }
    }

    return false; // key wasn't in the map
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }
    keys() {
    const result = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        result.push(entry.key);
      }
    }

    return result;
  }

  values() {
    const result = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        result.push(entry.value);
      }
    }

    return result;
  }

  entries() {
    const result = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        result.push([entry.key, entry.value]);
      }
    }

    return result;
  }
    grow() {
    const oldEntries = this.entries(); // save everything first

    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (const [key, value] of oldEntries) {
      this.set(key, value); // re-insert with the new capacity
    }
  }
    set(key, value) {
    const bucket = this.getBucket(key);

    for (const entry of bucket) {
      if (entry.key === key) {
        entry.value = value;
        return;
      }
    }

    bucket.push({ key, value });
    this.size++;

    if (this.size > this.capacity * this.loadFactor) {
      this.grow();
    }
  }
} // <- class ends here, after all methods

export default HashMap;