// hoc/withAuth.tsx

import React, { useEffect } from "react";
import { useRouter } from "next/router";

type WithAuthProps = {};

type WithAuthHOC = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => React.FC<P>;

const publicRoute: WithAuthHOC = (WrappedComponent) => {
  const WithAuth: React.FC<WithAuthProps> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token") ?? null;
      if (token) {
        router.back();
      }
    }, [router]);

    return <WrappedComponent {...(props as any)} />;
  };

  return WithAuth;
};

export default publicRoute;
