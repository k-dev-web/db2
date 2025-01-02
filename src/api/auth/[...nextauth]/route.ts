import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

function toFormData(obj) {
    const formBody = [];
    for (const property in obj) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(obj[property]);
        formBody.push(`${encodedKey}=${encodedValue}`);
    }
    return formBody.join("&");
}

export const authOptions : NextAuthOptions = {

    providers: [

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "login", type: "text", placeholder: "jsmith"},
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials, req) {
                const data = {
                    username: credentials.login,
                    password: credentials.password,
                };
                const formData = toFormData(data);
                try {
                    const res = await fetch("http://development.localhost:8000/api/method/lms_api.api.login", {
                        method: 'POST',
                        body: formData,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        }
                    });

                    const resData = await res.json();
                    if (res.ok && resData && resData.data) {
                        return resData.data;
                    } else {
                        console.error('Authorization failed:', resData);
                        return null;
                    }
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({token, user}){
            return {...token, ...user}
        },
        async session ({ session, token, user }) {
            session.user = token as any ;
            return session;
        }
    }

};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };