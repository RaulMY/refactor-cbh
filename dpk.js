const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const HASH_TYPE = 'sha3-512';

exports.deterministicPartitionKey = (event) => {
  // If there is no event, return trivial partition key
  if (!event) return TRIVIAL_PARTITION_KEY;

  const { partitionKey } = event;

  if (!partitionKey) {
    // If there is no provided partition key, create one based on a hash using a stringified event.
    const data = JSON.stringify(event);
    return crypto.createHash(HASH_TYPE).update(data).digest("hex");
  }

  // If there is a key provided, use it as a candidate for partition key. It should be a string.
  const candidate = typeof partitionKey !== "string" ? JSON.stringify(partitionKey) : partitionKey;

  // If the length of the candidate for partition is longer than the max length, create a new hash with sha3-512.
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash(HASH_TYPE).update(candidate).digest("hex");
  }

  return candidate;
};