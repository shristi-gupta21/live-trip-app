import { redirect } from "next/navigation";

const Home = () => {
  redirect("/discover?destination=goa");
};

export default Home;
