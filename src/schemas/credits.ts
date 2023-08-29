export interface Cast {
  name: string;
  character: string;
  id: number;
  cast_id: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

function extractDirector(crew: Crew[]): Crew | null {
  const directors = crew.filter((person) => person.job === "Director");
  if (directors.length <= 0) {
    return null;
  }
  return directors[0];
}

export { extractDirector };
