'use client';

import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,LockKeyhole,Check,LoaderCircle} from 'lucide-react';
import {FLODESK_FORM_ID,FLODESK_CONFIG,loadFlodesk} from '@/lib/flodesk';

const fields = [
  {id:'name',name:'firstName',label:'Full Name',placeholder:'Your full name',type:'text',autoComplete:'name'},
  {id:'email',name:'email',label:'Active Email',placeholder:'you@example.com',type:'email',autoComplete:'email'},
  {id:'whatsapp',name:'fields.whatsappNumber',label:'WhatsApp Number',placeholder:'+977 98XXXXXXXX',type:'tel',autoComplete:'tel'},
  {id:'business',name:'fields.businessName',label:'Business Name',placeholder:'Your business name',type:'text',autoComplete:'organization'},
  {id:'website',name:'fields.websiteOrFacebookLink',label:'Website or Facebook URL',placeholder:'yourwebsite.com',type:'text',autoComplete:'url'},
];

export default function CTAForm(){
  const root = useRef<HTMLElement>(null);
  const messageInput = useRef<HTMLInputElement>(null);
  const [ready,setReady] = useState(false);
  const [failure,setFailure] = useState('');

  useEffect(()=>{
    const element = root.current;
    if(!element)return;
    let active = true;
    const checkReady = ()=>{
      if(element.dataset.ffHandleStatus==='initialized'){
        setReady(true);
        setFailure('');
        clearTimeout(timeout);
      }
    };
    const observer = new MutationObserver(checkReady);
    observer.observe(element,{attributes:true,attributeFilter:['data-ff-handle-status']});
    const timeout = window.setTimeout(()=>{
      if(active)setFailure('The booking form could not connect. Please refresh the page and try again.');
    },20000);
    loadFlodesk().then(fd=>{
      if(active){
        fd('form:handle',{formId:FLODESK_FORM_ID,rootEl:element});
        checkReady();
      }
    }).catch(()=>{
      if(active){
        clearTimeout(timeout);
        setFailure('The booking form could not connect. Please refresh the page and try again.');
      }
    });
    return ()=>{active=false;observer.disconnect();clearTimeout(timeout)};
  },[]);

  return <section ref={root} className="booking section-wrap" id="book" aria-labelledby="book-title" data-ff-el="root" data-ff-version="3" data-ff-type="inline" data-ff-name="inlineNoImage" data-ff-stage="default">
    <div hidden data-ff-el="config" data-ff-config={FLODESK_CONFIG}/>
    <div className="booking-heading">
      <h2 className="section-title" id="book-title">Book Your<br/><span className="gradient-text">Free Consultation</span></h2>
      <div className="booking-labels">{['One-to-One Consultation','Customized Strategy for Your Business','Plan Delivered in PDF Format'].map(t=><p key={t}><Check size={17}/>{t}</p>)}</div>
      <div className="booking-art" aria-hidden="true"><span/><span/><span/><ArrowUpRight/></div>
    </div>
    <form className="form-card" action={`https://form.flodesk.com/forms/${FLODESK_FORM_ID}/submit`} method="post" data-ff-el="form" onSubmitCapture={event=>{
      if(!ready){event.preventDefault();event.stopPropagation()}
    }}>
      <div data-ff-el="content">
        <div className="form-grid" data-ff-el="fields">
          {fields.map(f=><div className={f.id==='website'?'field full':'field'} key={f.id}>
            <label htmlFor={f.id}>{f.label} {f.id==='website'?<span>(optional)</span>:<span className="required">*</span>}</label>
            <input id={f.id} name={f.name} type={f.type} autoComplete={f.autoComplete} maxLength={255} inputMode={f.id==='whatsapp'?'tel':f.id==='email'?'email':f.id==='website'?'url':undefined} placeholder={f.placeholder} required={f.id!=='website'}/>
          </div>)}
          <div className="field full">
            <label htmlFor="message">Anything You Want to Say <span className="required">*</span></label>
            <textarea id="message" rows={3} maxLength={255} required placeholder="Tell us a little about your business…" onFocus={()=>messageInput.current?.dispatchEvent(new Event('focus'))} onChange={event=>{
              // Flodesk's raw embed serializes input elements only. Mirror the
              // existing textarea into the custom field supplied by Flodesk.
              if(messageInput.current){
                messageInput.current.value=event.target.value;
                messageInput.current.dispatchEvent(new Event('focus'));
              }
            }}/>
            <input ref={messageInput} type="text" name="fields.anyThingYouWantToSay" required maxLength={255} className="honeypot" tabIndex={-1} aria-hidden="true"/>
          </div>
        </div>
        <div className="honeypot" aria-hidden="true"><label htmlFor="confirm_email_address">Leave empty</label><input id="confirm_email_address" name="confirm_email_address" maxLength={255} tabIndex={-1} autoComplete="off"/></div>
        <div role="status" aria-live="polite">
          {failure&&<p className="error submit-error">{failure}</p>}
          <div className="error submit-error" data-ff-el="error"/>
        </div>
        <button className="button form-submit" disabled={!ready} type="submit" data-ff-el="submit">
          {!ready?<><LoaderCircle className="spinner" size={18}/>Connecting…</>:<>Book My Free Consultation<ArrowUpRight size={19}/></>}
        </button>
        <p className="privacy"><LockKeyhole size={13}/>We respect your privacy. No spam.</p>
      </div>
      <div className="flodesk-success" data-ff-el="success" role="status">Your request is in. Check your inbox to confirm your email address.</div>
    </form>
  </section>;
}
