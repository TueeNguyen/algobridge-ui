import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const EmailJSON = evt.data;

    // user created
    const eventType = evt.type;
    if (eventType === "user.created") {
      console.log(
        `Received webhook with email ${EmailJSON} and event type of ${eventType}`
      );
      console.log("Webhook payload:", evt.data);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
