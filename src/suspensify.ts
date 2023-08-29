type Status = "pending" | "ready" | "error";

export interface SuspensifiedPromise<T> {
  read: () => T;
}

/**
 * Wraps a `Promise` into a suspendable wrapper
 * Based on https://blog.logrocket.com/data-fetching-react-suspense/
 * @param {Promise} promise - The wrapped promise
 * @returns {SuspensifiedPromise} An object, with a suspending `read` function
 */
function suspensify<T>(promise: Promise<T>): SuspensifiedPromise<T> {
  let response: T;
  let status: Status = "pending";
  let error: any;

  let p = promise
    .then((res) => {
      status = "ready";
      response = res;
    })
    .catch((err) => {
      status = "error";
      error = err;
    });

  return {
    read: () => {
      switch (status) {
        case "pending":
          throw p;
        case "error":
          throw error;
        case "ready":
          return response;
      }
    },
  };
}

export { suspensify };
