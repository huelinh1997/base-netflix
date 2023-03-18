/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import { magic } from "@/lib/magic-link";
import { useRouter } from "next/router";

const Navbar = ({ isLogged = true }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const router = useRouter();

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async () => {
    try {
      await magic.user.logout();
      router.push("/login");
    } catch (err) {
      console.log("Something err when logout:", err);
      router.push("/login");
    }
  };

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) {
          setUserInfo(email);
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
              <li className={styles.navItem}>Home</li>
              <li className={styles.navItem}>My list</li>
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
