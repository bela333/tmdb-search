export interface ImageConfiguration {
  base_url: string;
  secure_base_url: string;
  poster_sizes: string[];
}

export interface Configuration {
  images: ImageConfiguration;
}

export const defaultConfiguration: Configuration = {
  images: {
    base_url: "http://image.tmdb.org/t/p/",
    secure_base_url: "https://image.tmdb.org/t/p/",
    poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
  },
};
