import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const BASE_URL = "http://localhost:8000";

export function useAuthBootstrap() {
  const { user } = useUser();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        // Step 1: Try accessing /protected
        const protectedRes = await fetch(BASE_URL + "/protected", {
          credentials: "include", // include cookies
        });

        if (protectedRes.ok) {
          console.log("✅ Access token valid via cookie");
          return;
        }

        console.log("⚠️ /protected failed, attempting to refresh token");
      } catch (error) {
        console.log("⚠️ /protected errored, attempting to refresh token", error);
      }

      try {
        // Step 2: Try refreshing token
        const refreshRes = await fetch(BASE_URL + "/refresh_token", {
          method: "POST",
          credentials: "include", // send cookies
        });

        if (refreshRes.ok) {
          console.log("♻️ Token refreshed");
          return;
        }

        console.log("⚠️ /refresh_token failed, attempting to create user");
      } catch (error) {
        console.log("⚠️ /refresh_token errored, attempting to create user", error);
      }

      // Step 3: Try creating user if email exists
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const registerRes = await fetch(BASE_URL + "/api/v1/db_operation/create_user/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // receive set-cookie
            body: JSON.stringify({
              email: user.primaryEmailAddress.emailAddress,
            }),
          });

          if (registerRes.ok) {
            console.log("🆕 Registered user and set token cookie");
          } else {
            console.error("❌ Failed to register user");
          }
        } catch (error) {
          console.error("❌ Error during user registration", error);
        }
      } else {
        console.warn("⚠️ Missing email from Clerk");
      }
    };

    bootstrap();
  }, [user]);
}