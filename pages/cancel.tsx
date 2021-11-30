import Link from "next/link";

const Cancel = () => {
  return (
    <div>
      <h1>Oh no!</h1>
      <h2>
        Looks like your payment got canceled, you can try again at our homepage
      </h2>
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

export default Cancel;
