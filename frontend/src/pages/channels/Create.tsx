import Head from "next/head";

import CreateChannelForm from "@/components/forms/CreateChannelForm";

export default function CreateChannelPage() {
  return (
    <>
      <Head>
        <title>Create a new Channel</title>
      </Head>
      <div>
        <CreateChannelForm />
      </div>
    </>
  );
}
