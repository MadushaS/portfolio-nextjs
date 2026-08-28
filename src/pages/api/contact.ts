import type { APIRoute } from "astro";
import {
	CONTACT_EMAIL,
	RESEND_API_KEY,
	TELEGRAM_BOT_TOKEN,
	TELEGRAM_CHAT_ID,
} from "astro:env/server";

// Always rendered on-demand (never prerendered).
export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD = 5000;

function escapeHtml(input: string): string {
	return input
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function json(body: Record<string, unknown>, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

async function sendEmail(name: string, email: string, subject: string, message: string) {
	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${RESEND_API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from: "Portfolio Contact <work@madusha.dev>", // TODO: replace with your verified Resend domain sender
			to: [CONTACT_EMAIL],
			reply_to: email,
			subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
			html: `
				<h2>New contact form submission</h2>
				<p><strong>Name:</strong> ${escapeHtml(name)}</p>
				<p><strong>Email:</strong> ${escapeHtml(email)}</p>
				${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
				<p><strong>Message:</strong></p>
				<p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>
			`,
		}),
	});
	if (!res.ok) {
		const detail = await res.text();
		throw new Error(`Resend error ${res.status}: ${detail}`);
	}
}

async function sendTelegram(name: string, email: string, subject: string, message: string) {
	const text = [
		"📬 <b>New portfolio message</b>",
		`<b>From:</b> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;`,
		subject ? `<b>Subject:</b> ${escapeHtml(subject)}` : null,
		"",
		escapeHtml(message.length > 800 ? `${message.slice(0, 800)}…` : message),
	]
		.filter(Boolean)
		.join("\n");

	const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			chat_id: TELEGRAM_CHAT_ID,
			text,
			parse_mode: "HTML",
			disable_web_page_preview: true,
		}),
	});
	if (!res.ok) {
		const detail = await res.text();
		throw new Error(`Telegram error ${res.status}: ${detail}`);
	}
}

export const POST: APIRoute = async ({ request }) => {
	let data: { name?: string; email?: string; subject?: string; message?: string; company?: string };
	try {
		data = await request.json();
	} catch {
		return json({ success: false, error: "Invalid JSON body" }, 400);
	}

	// Honeypot: bots fill the hidden "company" field — pretend success.
	if (data.company) {
		return json({ success: true });
	}

	const name = (data.name ?? "").trim();
	const email = (data.email ?? "").trim();
	const subject = (data.subject ?? "").trim();
	const message = (data.message ?? "").trim();

	if (!name || !email || !message) {
		return json({ success: false, error: "Name, email and message are required." }, 400);
	}
	if (!EMAIL_RE.test(email)) {
		return json({ success: false, error: "Invalid email address." }, 400);
	}
	if (message.length < 20) {
		return json({ success: false, error: "Message must be at least 20 characters." }, 400);
	}
	if ([name, email, subject, message].some((f) => f.length > MAX_FIELD)) {
		return json({ success: false, error: "Field too long." }, 400);
	}
	if (!RESEND_API_KEY || !CONTACT_EMAIL) {
		console.error("contact endpoint: RESEND_API_KEY or CONTACT_EMAIL not configured");
		return json({ success: false, error: "Contact service is not configured." }, 500);
	}

	// Email is the source of truth; Telegram is a best-effort instant ping.
	const [emailResult, telegramResult] = await Promise.allSettled([
		sendEmail(name, email, subject, message),
		TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID
			? sendTelegram(name, email, subject, message)
			: Promise.resolve(),
	]);

	if (emailResult.status === "rejected") {
		console.error("contact endpoint: email failed", emailResult.reason);
		return json({ success: false, error: "Failed to send message. Please try again." }, 502);
	}
	if (telegramResult.status === "rejected") {
		console.warn("contact endpoint: telegram notification failed", telegramResult.reason);
	}

	return json({ success: true });
};

// Explicitly reject non-POST verbs.
export const ALL: APIRoute = () =>
	json({ success: false, error: "Method not allowed" }, 405);
