import { NextResponse } from "next/server";

import { Client } from "node-mailjet";
import { RequestData } from "node-mailjet/declarations/request/Request";
const mailjet = new Client({
  apiKey: process.env.NEXT_EMAIL_USER,
  apiSecret: process.env.NEXT_EMAIL_PASS,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const request = await req.json();
  console.log(request);
  const data: RequestData = {
    "FromEmail": process.env.NEXT_EMAIL_SEND_FROM,
    "FromName": process.env.NEXT_EMAIL_SEND_FROM_NAME,
    "Recipients": [{Email: process.env.NEXT_EMAIL_SEND_TO,}],
    "Subject": "New email alert - " + process.env.NEXT_PROJECT_NAME,
    "Text-part": textEmail(request),
    "Html-part": HTMLEmail(request),
  };

  const result = await mailjet.post("send", { version: "v3" }).request(data);

  if (result.response.status === 200) {
    return NextResponse.json({
      status: 200,
      message: "Email sent successfully",
    });
  }

  return NextResponse.json({
    status: 500,
    message: "Failed to send email",
  });
}

const HTMLEmail = ({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  return `
<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>New email alert</title>
</head>
<body style="background-color: #f4f4f9; font-family: Arial, sans-serif; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.5; color: #333;">
    <div style="background-color: #ffffff; width: 100%; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #4a90e2; color: #ffffff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; display: flex; justify-content: center; gap: 16px;">
            <img src="https://img.icons8.com/external-soft-fill-juicy-fish/60/external-developer-devops-soft-fill-soft-fill-juicy-fish-2.png" alt="Developer" style="width: 60px; margin-bottom: 10px;">
            <h1 style="margin: 10px 0; font-size: 24px;">Madusha.dev</h1>
        </div>
        <div style="padding: 20px;">
            <h2 style="color: #4a90e2; margin-bottom: 10px;">New Email Alert</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p style="margin-top:8px;padding:8px;border:solid 2px #4a90e2;border-radius:8px">${message}</p>
        </div>
        <div style="background-color: #f4f4f9; color: #777; text-align: center; padding: 10px; border-radius: 0 0 8px 8px;">
            <div style="display: flex; justify-content: center; padding: 8px;">
                <a href="https://twitter.com/_MadushaS" style="margin: 0 10px; color: #4a90e2; text-decoration: none;">
                    <img src="https://img.icons8.com/ios-glyphs/30/twitter--v1.png" alt="Twitter" style="width: 24px; vertical-align: middle;">
                </a>
                <a href="https://facebook.com/madusha.kv" style="margin: 0 10px; color: #4a90e2; text-decoration: none;">
                    <img src="https://img.icons8.com/ios-filled/50/facebook-new.png" alt="Facebook" style="width: 24px; vertical-align: middle;">
                </a>
                <a href="https://linkedin.com/in/madushasandaruwan" style="margin: 0 10px; color: #4a90e2; text-decoration: none;">
                    <img src="https://img.icons8.com/ios-filled/50/linkedin.png" alt="LinkedIn" style="width: 24px; vertical-align: middle;">
                </a>
            </div>
            <p>&copy; ${new Date().getFullYear()} Madusha. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
};

const textEmail = ({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  return `
    New Email Alert
    ----------------
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Message: ${message}
    ----------------
    Date: ${new Date().toLocaleDateString()}
    `;
};
