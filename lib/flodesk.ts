export const FLODESK_FORM_ID = '6ae2dd52a4e48712153e605a';

// Supplied raw HTML configuration, including double opt-in and the production
// thank-you URL. Flodesk controls the actual submission response and redirect.
export const FLODESK_CONFIG = 'eyJ0cmlnZ2VyIjp7Im1vZGUiOiJpbW1lZGlhdGVseSIsInZhbHVlIjowfSwib25TdWNjZXNzIjp7Im1vZGUiOiJyZWRpcmVjdCIsIm1lc3NhZ2UiOiIiLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vY29uc3VsdGF0aW9uLmJodXBlbmRyYXNocmVzdGhhLmNvbS5ucC90aGFuay15b3UifSwiY29pIjp0cnVlLCJzaG93Rm9yUmV0dXJuVmlzaXRvcnMiOnRydWUsIm5vdGlmaWNhdGlvbiI6dHJ1ZSwiZ2RwciI6eyJhY2NlcHRzTWFya2V0aW5nIjpmYWxzZSwicHJpdmFjeVBvbGljeSI6eyJlbmFibGVkIjpmYWxzZSwibWFuZGF0b3J5IjpmYWxzZX19LCJ0cmFja2luZ0NvbmZpZyI6eyJtZXRhUGl4ZWxJZCI6IiIsImNvb2tpZUJhbm5lckVuYWJsZWQiOmZhbHNlLCJnb29nbGVBbmFseXRpY3NJZCI6IiJ9fQ==';

type Flodesk = (command:string,options:{formId:string;rootEl:HTMLElement})=>void;
type FlodeskQueue = Flodesk & {q?:unknown[][]};
declare global {
  interface Window {fd?:FlodeskQueue;FlodeskObject?:string}
}

let loading:Promise<Flodesk>|undefined;

export function loadFlodesk():Promise<Flodesk>{
  if(loading)return loading;
  loading = new Promise((resolve,reject)=>{
    window.FlodeskObject='fd';
    window.fd=window.fd||Object.assign((...args:unknown[])=>{
      (window.fd!.q=window.fd!.q||[]).push(args);
    },{q:[] as unknown[][]});
    const script=document.createElement('script');
    script.type='module';
    script.async=true;
    script.src='https://assets.flodesk.com/universal.mjs';
    script.onload=()=>resolve(window.fd!);
    script.onerror=()=>{script.remove();loading=undefined;reject(new Error('Flodesk could not load.'))};
    document.head.appendChild(script);
  });
  return loading;
}
