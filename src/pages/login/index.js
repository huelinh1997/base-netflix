import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import HeadPage from "@/components/Head";
import styles from "./login.module.scss";
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { magic } from "@/lib/magic-link";
import { useRouter } from "next/router";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const didToken = await magic.auth.loginWithMagicLink({
        email: data.email,
      });
      if (didToken) {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${didToken}`,
            "Content-Type": "application/json",
          },
        });
        const loggedInResponse = await response.json();
        if (loggedInResponse.done) {
          router.push("/");
          return;
        }
        console.log("Something went wrong logging");
      }
    } catch (err) {
      console.log("Something went wrong:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <HeadPage />
      <div className={styles.container}>
        <Navbar isLogged={false} />
        <div className={styles.login}>
          <div className={styles.loginWrapper}>
            <div className={styles.loginForm}>
              <h2 className={styles.title}>Sign in</h2>
              <input
                className={styles.input}
                type="text"
                name="email"
                placeholder="Please enter your email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please enter your email",
                  },
                  pattern: {
                    value: /^\s*[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\s*$/i,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors?.email && (
                <span className={styles.err}>{errors.email.message}</span>
              )}
              <button
                className={styles.loginButton}
                onClick={handleSubmit(onSubmit)}
              >
                {isLoading ? "isLoading..." : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
