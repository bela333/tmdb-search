import { extractDirector } from "./credits";

it("filters director", () => {
  const director = { id: 0, job: "Director", name: "Me" };
  const result = extractDirector([
    director,
    { id: 1, job: "Funny person", name: "You" },
    { id: 2, job: "Cinematographer", name: "Them" },
  ]);
  expect(result).toBe(director);
});

it("gets FIRST director", () => {
  const director = { id: 0, job: "Director", name: "Me" };
  const result = extractDirector([
    director,
    { id: 1, job: "Director", name: "You" },
    { id: 2, job: "Director", name: "Them" },
  ]);
  expect(result).toBe(director);
});

it("nulls when no director", () => {
  const result = extractDirector([
    { id: 1, job: "Cleaner", name: "You" },
    { id: 2, job: "Cinematographer", name: "Them" },
  ]);
  expect(result).toBeNull();
});
