export class WaitlistError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "WaitlistError";
    this.status = status;
  }
}

export async function submitWaitlist(payload, { signal } = {}) {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error || `Request failed with status ${res.status}`;
    throw new WaitlistError(msg, res.status);
  }
  return json;
}
