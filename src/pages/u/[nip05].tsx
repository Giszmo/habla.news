import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "@habla/layouts/Wide";

const NProfile = dynamic(() => import("@habla/components/nostr/NostrAddress"), {
  ssr: false,
});

export default function Profile() {
  const router = useRouter();
  const nip05 = typeof router.query.nip05 === "string" ? router.query.nip05 : undefined;
  return (
    <Layout>
      {nip05 ? <NProfile query={nip05} key={nip05} /> : null}
    </Layout>
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
