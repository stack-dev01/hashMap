class HashSet {
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

  add(key) {
    const bucket = this.getBucket(key);

    if (bucket.includes(key)) return; // already in the set

    bucket.push(key);
    this.size++;

    if (this.size > this.capacity * this.loadFactor) {
      this.grow();
    }
  }

  has(key) {
    return this.getBucket(key).includes(key);
  }

  remove(key) {
    const bucket = this.getBucket(key);
    const i = bucket.indexOf(key);

    if (i === -1) return false;

    bucket.splice(i, 1);
    this.size--;
    return true;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    return this.buckets.flat();
  }

  grow() {
    const oldKeys = this.keys();

    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (const key of oldKeys) {
      this.add(key);
    }
  }
}

export default HashSet;