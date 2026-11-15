import { Resend } from "resend";

export function getResendClient() {
const key = process.env.RESEND_API_KEY;
if (!key) return null;
return new Resend(key);
}

export function getMailerFrom() {
return process.env.RESEND_FROM_EMAIL || process.env.MAIL_FROM || "Siargao Finder <info@siargaofinder.com>";
}
