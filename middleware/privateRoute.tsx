// hoc/withAuth.tsx

import React, { useEffect } from "react";
import { useRouter } from "next/router";

type WithAuthProps = {};

type WithAuthHOC = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => React.FC<P>;

const privateRoute: WithAuthHOC = (WrappedComponent) => {
  const WithAuth: React.FC<WithAuthProps> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token") ?? null;
      if (!token) {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...(props as any)} />;
  };

  return WithAuth;
};

export default privateRoute;
