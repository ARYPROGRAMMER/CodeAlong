import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server"

const http = httpRouter();
http.route(
    {
        path: "/clerk-webhook",
        method: "POST",
        handler: httpAction(
            async (ctx,req) => {
                const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
                if (webhookSecret) {
                    throw new Error("Missing CLERK_WEBHOOK_SECRET env variable")
                }

                const svix_id = req.headers.get("svix-id");
                const svix_signature = req.headers.get("svix-signature");
                const svix_timestamp = req.headers.get("svix-timesstamp");
                
            }
        )
    }
)