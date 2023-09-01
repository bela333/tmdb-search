import React, { createContext, useContext } from "react";
import { Configuration, defaultConfiguration } from "../schemas/configuration";
import { SuspensifiedPromise } from "../suspensify";

export const ConfigurationContext =
  createContext<Configuration>(defaultConfiguration);

interface ConfigurationProviderProps {
  /** A `SuspensifiedPromise` for retrieving the TMDB configuration */
  configuration: SuspensifiedPromise<Configuration>;
}

/**
 * Component for giving the application access to TMDB's configuration
 */
export const ConfigurationProvider = ({
  children,
  configuration,
}: React.PropsWithChildren<ConfigurationProviderProps>) => {
  return (
    <ConfigurationContext.Provider value={configuration.read()}>
      {children}
    </ConfigurationContext.Provider>
  );
};

const getURL = (configuration: Configuration): string => {
  if (window.location.protocol === "https:") {
    return configuration.images.secure_base_url;
  } else {
    return configuration.images.base_url;
  }
};

const getSize = (configuration: Configuration, width: number): string => {
  // Parse available sizes from configuration
  const sizes = configuration.images.poster_sizes
    .filter((s) => s.startsWith("w"))
    .map((s) => parseInt(s.substring(1)));

  if (sizes.length <= 0) {
    // No sizes were in the configuration. Using "default"
    return "default";
  }

  sizes.sort((a, b) => a - b);

  // Find first size that is larger than requested
  const larger = sizes.filter((s) => s >= width);
  if (larger.length > 0) {
    // return first image that is larger
    return "w" + larger[0];
  }

  // Otherwise, return the largest possible iamge
  return "w" + sizes[sizes.length - 1];
};

/**
 * A React Hook for getting the most fitting base URL for a specific image size
 * @param {number} width - The image's size
 * @returns {string} The base URL for retrieving images in that specific size
 * @example
 * // returns "http://image.tmdb.org/t/p/w342"
 * useImageBase(300);
 */
export const useImageBase = (width: number): string => {
  const configuration = useContext(ConfigurationContext);
  const url = getURL(configuration);
  const size = getSize(configuration, width);
  return `${url}${size}`;
};
