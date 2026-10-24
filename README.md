# Bhupendra consultation website

Run `npm install`, then `npm run dev`. Open the Local URL printed in the terminal.

The supplied logo is in `public/bhupendra-logo-green.png`. Brand details belong to Bhupendra Shrestha; contact email: bhupendrastha2024@gmail.com. Visitor fields start empty.

The WhatsApp button is configured for 9779842660210. Form submissions currently use simulation mode: no lead data is saved or emailed. Set NEXT_PUBLIC_FORM_ENDPOINT to a JSON-capable endpoint with appropriate CORS support to receive leads. Set NEXT_PUBLIC_VIMEO_URL for the video and NEXT_PUBLIC_SITE_URL for metadata. Public environment variables must never contain secrets. An email address alone is not a form receiver.

Copy `.env.example` to `.env.local` to configure. Leave urgency empty unless real copy is supplied. Restart the dev server after changing environment variables.

For Vercel: import this folder/repository as a Next.js project, configure environment variables, and deploy. Test a real submission before using ads. Add a favicon, Open Graph image, and privacy policy if required before launch.

Checks: `npm run typecheck`, `npm run build`.
