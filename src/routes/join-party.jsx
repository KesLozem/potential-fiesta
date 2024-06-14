import PartyStatus from "../components/PartyStatus";
import { useLoaderData, Link, Form, redirect } from "react-router-dom";

export async function loader() {
  const status = await fetch("/api/player/online", { method: "GET" })
    .then((res) => res.json())
    .then((data) => data.online);
  return { status };
}

export async function action({request}) {
  const formData = await request.formData();
  const username = formData.get("username");
  console.log("formdata", formData);
  await fetch("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username})
  })
  return redirect("/party");
}

export default function JoinParty() {
  const { status } = useLoaderData();

  return (
    <div className="bg-stone-900 flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-white">Join the Party</h1>
      <PartyStatus party_status={status} />
      <div className="flex">
        <Form method="post" id="username-form">
          <input
            name="username"
            type="text"
            disabled={!status}
            maxLength={12}
            placeholder="Enter a username"
            className={`px-4 py-2 text-white 
                bg-stone-800 rounded-l-lg focus:-outline-offset-4 
                 ${status ? "" : "input-disabled focus:outline-none"}`}
          />
          <button
            className={`px-4 py-2 text-white rounded-r-lg
                 ${status ? "enabled:bg-blue-500" : "cursor-not-allowed bg-slate-400"}`}
            type="submit"
          >
            Join
          </button>
        </Form>
      </div>
      <Link hidden={status} reloadDocument to="/api/auth/login">
        <button className=" btn btn-active btn-secondary my-10 text-white">
          Create a Party
        </button>
      </Link>
    </div>
  );
}
