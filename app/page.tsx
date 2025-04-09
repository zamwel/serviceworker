'use client'
import { deleteAllLicense } from "./actions/database";
export default function Home() {
  //AutomatedRoutes()
  return (
    <div className="flex flex-col w-full mt-24 px-4 lg:px-0">
      <h2 className="text-6xl font-bold text-center">Service Worker</h2>

      <button onClick={async()=>await deleteAllLicense()}>Delete All</button>
    </div>
  );
}
