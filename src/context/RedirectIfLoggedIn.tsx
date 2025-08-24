import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RedirectIfLoggedInProps {
  children: ReactNode;
}

export default function RedirectIfLoggedIn({
  children,
}: RedirectIfLoggedInProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
}
