import Link from "next/link";

const Confirm = () => {
  return (
    <div>
      <h1>Thanks so much!</h1>
      <h2>
        Your donation means the world to us! Make sure to share your donation
        using the button below.
      </h2>
      <a
        href="https://twitter.com/intent/tweet?screen_name=_heyglassy&ref_src=twsrc%5Etfw"
        // class="twitter-mention-button"
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
        <a>Return to Homepage</a>
      </Link>
    </div>
  );
};

export default Confirm;
