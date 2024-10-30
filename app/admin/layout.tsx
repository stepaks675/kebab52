"use client";
import { useEffect, useState } from "react";
import { backToLogin } from "../actions";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [access, setAccess] = useState(false);
  useEffect(() => {
    fetch("/api/admin/validate").then((res) => {
      if (res.status == 200) setAccess(true);
      else {
        alert("Неавторизованный пользователь");
        backToLogin()
      }
    });
  }, []);
  return <>{access && <div>{children}</div>}</>;
}
