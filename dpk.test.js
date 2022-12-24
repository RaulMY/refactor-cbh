const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the partition key if provided in the event", () => {
    const partitionKey = '123';
    const actualKey = deterministicPartitionKey({ partitionKey: partitionKey });
    expect(actualKey).toBe(partitionKey);
  });
  it("Returns the partition key as a string regardless of how it's sent", () => {
    const booleanKey = deterministicPartitionKey({ partitionKey: true});
    expect(booleanKey).toBe('true');
    const numberKey = deterministicPartitionKey({ partitionKey: 324});
    expect(numberKey).toBe('324');
    const negativeKey = deterministicPartitionKey({ partitionKey: -324});
    expect(negativeKey).toBe('-324');
    const objectKey = deterministicPartitionKey({ partitionKey: {}});
    expect(objectKey).toBe('{}');
    const randomKey = deterministicPartitionKey({ partitionKey: [21312]});
    expect(typeof randomKey).toBe('string');
  });
  it("Returns a hash when input with no parition key is given", () => {
    const event = { somethingElse: 123};
    const somethingElseKey = deterministicPartitionKey(event);
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    expect(typeof somethingElseKey).toBe('string');
    expect(somethingElseKey).toBe(candidate);
  });
  it("Returns a max length of 256 when input has a longer partitionKey", () => {
    const longValue = '213901283901283091283912039129239120391290312903219039120391203921039021390213921391203912321890381290382190381293892013821903821903892103812093123123123123213901283901283091283912039129239120391290312903219039120391203921039021390213921391203912321890381290382190381293892013821903821903892103812093123123123123213901283901283091283912039129239120391290312903219039120391203921039021390213921391203912321890381290382190381293892013821903821903892103812093123123123123';
    const event = { partitionKey: longValue };
    const longKey = deterministicPartitionKey(event);
    candidate = crypto.createHash("sha3-512").update(longValue).digest("hex");
    expect(longKey.length).toBeLessThan(256);
    expect(longKey).toBe(candidate);
  });
});
