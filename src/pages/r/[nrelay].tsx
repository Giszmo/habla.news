import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { decodeNrelay } from "@habla/nostr";
import Layout from "@habla/layouts/Wide";
import Metadata from "@habla/components/Metadata";
const Relay = dynamic(() => import("@habla/components/nostr/Relay"), {
  ssr: false,
});

export default function RelayPage() {
  const router = useRouter();
  const relay = useMemo(() => {
    const nrelay = router.query.nrelay;
    if (typeof nrelay !== "string") return undefined;
    return decodeNrelay(nrelay);
  }, [router.query.nrelay]);

  const metadata = { title: relay ?? "Relay" };
  return (
    <>
      <Metadata metadata={metadata} />
      <Layout>
        {relay ? <Relay key={relay} relay={relay} /> : null}
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations("en", ["common"])),
    },
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: false };
}
