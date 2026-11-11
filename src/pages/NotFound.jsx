import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-40 pb-28 text-center">
      <p className="font-bold text-[#735344]">404 — Page not found</p>
      <h1 className="my-6 text-4xl font-extrabold">Let’s get you back on track.</h1>
      <p className="mb-8">This address doesn’t lead to an ACROSSA page.</p>
      <Link
        to="/"
        className="inline-block rounded-lg bg-[#3E2522] px-6 py-3 font-bold text-[#FFF2DF]"
      >
        Return home
      </Link>
      <Link to="/contact" className="ml-6 font-bold underline">
        Contact us
      </Link>
    </section>
  );
}
