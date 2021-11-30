import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";

const Confirm = () => {
  const router = useRouter();

  const cancel = trpc.useMutation(["confirm"]);
  useEffect(() => {
    if (router.query.success) {
      const session_id = router.query.session_id;
      cancel.mutate({ session_id: session_id?.toString()! });
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <h1 className="text-2xl m-5">Thanks So Much!</h1>
      <h2>
        Your donation means the world to us! Make sure to share your donation
        using the button below.
      </h2>
      <a
        href="https://twitter.com/intent/tweet?screen_name=_heyglassy&ref_src=twsrc%5Etfw"
        className="bg-blue-400 my-10 text-white w-48 h-12 flex flex-col justify-center text-center rounded"
        data-show-count="false"
      >
        Tweet to @_heyglassy
      </a>
      <script async src="https://platform.twitter.com/widgets.js"></script>
      <h3>
        If you have any questions comments or concerns, tweet @_heyglassy or
        email Christian: Contact@heyglassy.co
      </h3>

      <Link href="/">
        <a className="bg-gradient-to-r from-green-400 to-blue-500 w-52 h-14 rounded text-center flex flex-row items-center justify-center m-5 text-white">
          Return to Homepage
        </a>
      </Link>
    </div>
  );
};

export default Confirm;
