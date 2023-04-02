/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import { magic } from "@/lib/magic-link";
import { useRouter } from "next/router";

const Navbar = ({ isLogged = true }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [didToken, setDidToken] = useState("");
  const router = useRouter();

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/logout/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });
      await response.json();
    } catch (err) {
      console.log("Something err when logout:", err);
      router.push("/login");
    }
  };

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const didToken = await magic.user.getIdToken();
        const userInfo = await magic.user.getMetadata();
        if (userInfo?.email) {
          setUserInfo(userInfo?.email);
        }
      } catch (err) {
        console.log("something err get info:", err);
      }
    };
    getInfoUser();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width="128"
              height="34"
              className={styles.logo}
            />
          </div>
        </Link>
        {isLogged && (
          <>
            <ul className={styles.navItems}>
              <li className={styles.navItem}>
                <Link href="/">Home</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/my-list">My list</Link>
              </li>
            </ul>
            <nav className={styles.navContainer}>
              {userInfo && (
                <button
                  className={styles.usernameBtn}
                  onClick={handleShowDropdown}
                >
                  <p className={styles.userName}>{userInfo}</p>
                  <Image
                    src={"/static/expand_more.svg"}
                    alt="Expand dropdown"
                    width="24"
                    height="24"
                  />
                </button>
              )}
              {showDropdown && (
                <div className={styles.navDropdown}>
                  <div>
                    <a className={styles.linkName} onClick={handleSignOut}>
                      logout
                    </a>
                  </div>
                </div>
              )}
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
