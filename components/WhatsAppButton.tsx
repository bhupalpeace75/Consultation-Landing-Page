import {MessageCircle,ArrowUpRight} from 'lucide-react';
export default function WhatsAppButton(){const number=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||'9779842660210';if(!/^\d{7,15}$/.test(number))return null;
const message="Hi Bhupendra, I just submitted the form for the Free Digital Marketing Consultation. I'd like to know the next steps.";return <a className="button whatsapp-button" href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={21}/>Message Us on WhatsApp<ArrowUpRight size={19}/></a>}
