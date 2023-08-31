import { suspensify } from "./suspensify";

it("returns result if exists", async () => {
  const promise: Promise<number> = (async () => 52)();
  const suspense = suspensify(promise);
  // Wait for promise to finish
  await promise;
  await wait;
  expect(suspense.read()).toBe(52);
});

const wait: Promise<void> = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 100);
});

it("throws promise if waiting", () => {
  const promise: Promise<number> = new Promise(() => {}); // Never returning promise. Perfect for waiting for it
  const suspense = suspensify(promise);
  expect(() => suspense.read()).toThrow();
});

it("throws error", async () => {
  const promise: Promise<number> = (async () => {
    throw "ERROR";
  })();
  const suspense = suspensify(promise);
  //Wait for promise to finish
  try {
    await promise;
  } catch (error) {}

  await wait;

  expect(() => suspense.read()).toThrowError("ERROR");
});
