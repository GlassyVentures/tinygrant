import Link from "next/link";

const Cancel = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <h1 className="text-2xl m-5">Oh no! :(</h1>
      <h2>
        Looks like your payment got canceled, you can try again at our homepage.
      </h2>
      <h3>
        If you have any questions comments or concerns,tweet @_heyglassy or
        contact Contact@heyglassy.co
      </h3>
      <Link href="/">
        <a className="bg-gradient-to-r from-green-400 to-blue-500 w-52 h-14 rounded text-center flex flex-row items-center justify-center m-5 text-white">
          Return to Homepage
        </a>
      </Link>
    </div>
  );
};

export default Cancel;
