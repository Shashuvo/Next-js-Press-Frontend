import { getMe } from "@/service/getMe";

export default async function HomePage() {


  const user = await getMe();
  console.log(user)

  return (

    <div>Hello nexjs</div>
  );
}
