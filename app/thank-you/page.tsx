import type {Metadata} from 'next';
import Header from '@/components/Header';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import WhatsAppButton from '@/components/WhatsAppButton';
export const metadata:Metadata={title:'Thank You | Bhupendra',robots:{index:false,follow:false}};
export default function ThankYou(){return <><Header/><main className="thank-you"><div className="success-mark" aria-hidden="true">✓</div><h1><span className="gradient-text">Thank you!</span><br/>Your request is in.</h1><p className="thank-message">Thank you for booking your free 1-hour AI marketing consultation. Watch the short video below, then message us on WhatsApp.</p><YouTubeEmbed/><WhatsAppButton/><ol className="next-steps"><li>Watch the video above.</li><li>Message us on WhatsApp.</li><li>We will talk about your business and prepare your customized plan.</li></ol></main></>}
