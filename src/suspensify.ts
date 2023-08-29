type Status = "pending" | "ready" | "error";

type SuspensifiedPromise<T> = {
    read: ()=>T
};

// Based on https://blog.logrocket.com/data-fetching-react-suspense/

function suspensify<T>(promise: Promise<T>): SuspensifiedPromise<T> {
    let response: T;
    let status: Status = "pending"
    let error: any;

    let p = promise.then((res)=>{
        status = "ready";
        response = res;
    }).catch((err)=>{
        status = "error";
        error = err;
    });

    return {read: ()=>{
        switch (status) {
            case "pending": throw p;
            case "error": throw error;
            case "ready": return response;
        }
    }}
}

export default suspensify;