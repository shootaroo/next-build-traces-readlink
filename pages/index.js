export default function Home({ now }) {
  return <p>{now}</p>;
}

export function getServerSideProps() {
  return { props: { now: new Date().toISOString() } };
}
