export default function Urgency(){const text=process.env.NEXT_PUBLIC_URGENCY_TEXT?.trim();return text?<section className="section-wrap urgency"><p>{text}</p></section>:null}
