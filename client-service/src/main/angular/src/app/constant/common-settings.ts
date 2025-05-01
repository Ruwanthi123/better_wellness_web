// export const MSG_PREFIX = 'http://localhost:8084';
// export const PROF_PREFIX = 'http://localhost:8083';


export const MSG_PREFIX = (window as any)['__env']?.messageApiUrl;
export const PROF_PREFIX = (window as any)['__env']?.profileApiUrl;
