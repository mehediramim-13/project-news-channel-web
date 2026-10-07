import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set");
}

const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };

const client =
    globalForMongo.mongoClient ??
    new MongoClient(process.env.MONGODB_URL, {
        maxPoolSize: 5,
    });

globalForMongo.mongoClient = client;

const db = client.db("bangla-news-24");

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: [
        "https://project-news-channel-web.vercel.app",
        "https://*.vercel.app",
    ],
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    database: mongodbAdapter(db),
});