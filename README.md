# Bhupendra consultation website

Run `npm install`, then `npm run dev`. Open the Local URL printed in the terminal.

The supplied logo is in `public/bhupendra-logo-green.png`. Brand details belong to Bhupendra Shrestha; contact email: bhupendrastha2024@gmail.com. Visitor fields start empty.

The WhatsApp button defaults to +977-9842660210 and can be overridden with NEXT_PUBLIC_WHATSAPP_NUMBER (digits only). The Thank You page embeds YouTube video `77wkD0K10xw`. The booking form uses Flodesk's official raw HTML handler for form `6ae2dd52a4e48712153e605a`, while retaining the site's existing styles. No API key or form endpoint environment variable is needed. Set NEXT_PUBLIC_SITE_URL for metadata. Public environment variables must never contain secrets.

Flodesk receives the full name as `firstName`, email as `email`, and custom fields `fields.whatsappNumber`, `fields.businessName`, `fields.websiteOrFacebookLink`, and `fields.anyThingYouWantToSay`. The message is required and limited to 255 characters to match the supplied embed. The textarea is mirrored to an input because Flodesk's raw HTML handler collects input fields. The original honeypot, double opt-in configuration, validation, verification challenges, and Flodesk's success redirect are retained. No success is simulated.

In Flodesk, keep this form assigned to your intended segment, and publish the workflow triggered by joining that segment. The latest supplied embed disables double opt-in and subscriber notification emails, and keeps the production `/thank-you` redirect. The site's code cannot publish or verify your account's workflow settings. Validate delivery after deployment with a new email address you control, then check its segment membership and workflow delivery. Existing subscribers may not re-enter a workflow, depending on its settings.

Copy `.env.example` to `.env.local` to configure. Leave urgency empty unless real copy is supplied. Restart the dev server after changing environment variables.

For Vercel: import this folder/repository as a Next.js project, configure environment variables, and deploy. Test a real submission before using ads. Add a favicon, Open Graph image, and privacy policy if required before launch.

Checks: `npm run typecheck`, `npm run build`.
