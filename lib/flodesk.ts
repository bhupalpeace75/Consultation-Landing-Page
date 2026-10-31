export const FLODESK_FORM_ID = '6ae2dd52a4e48712153e605a';

// Latest supplied raw HTML configuration: double opt-in and subscriber
// notifications are disabled. Flodesk controls the success redirect.
export const FLODESK_CONFIG = 'eyJ0cmlnZ2VyIjp7Im1vZGUiOiJpbW1lZGlhdGVseSIsInZhbHVlIjowfSwib25TdWNjZXNzIjp7Im1vZGUiOiJyZWRpcmVjdCIsIm1lc3NhZ2UiOiIiLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vY29uc3VsdGF0aW9uLmJodXBlbmRyYXNocmVzdGhhLmNvbS5ucC90aGFuay15b3UifSwiY29pIjpmYWxzZSwic2hvd0ZvclJldHVyblZpc2l0b3JzIjp0cnVlLCJub3RpZmljYXRpb24iOmZhbHNlLCJnZHByIjp7ImFjY2VwdHNNYXJrZXRpbmciOmZhbHNlLCJwcml2YWN5UG9saWN5Ijp7ImVuYWJsZWQiOmZhbHNlLCJtYW5kYXRvcnkiOmZhbHNlfX0sInRyYWNraW5nQ29uZmlnIjp7Im1ldGFQaXhlbElkIjoiIiwiY29va2llQmFubmVyRW5hYmxlZCI6ZmFsc2UsImdvb2dsZUFuYWx5dGljc0lkIjoiIn19';

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
