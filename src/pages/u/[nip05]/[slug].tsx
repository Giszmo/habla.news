import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "@habla/layouts/Wide";

const Nip05Address = dynamic(
  () => import("@habla/components/nostr/Nip05Address"),
  {
    ssr: false,
  }
);

export default function Profile() {
  const router = useRouter();
  const nip05 = typeof router.query.nip05 === "string" ? router.query.nip05 : undefined;
  const slug = typeof router.query.slug === "string" ? router.query.slug : undefined;
  return (
    <Layout>
      {nip05 && slug ? (
        <Nip05Address key={`${nip05}-${slug}`} identifier={slug} query={nip05} />
      ) : null}
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
