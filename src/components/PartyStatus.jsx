export default function PartyStatus({ party_status }) {
  return (
    <div className="indicator m-10">
      <span
        className={`indicator-item badge badge-secondary border-white ${party_status ? "bg-green-600" : "bg-red-600"}`}
      ></span>
      <div className="grid pl-3 pr-3 bg-neutral-700 rounded-lg place-items-center text-white">
        Party Status: {party_status ? "Online" : "Offline"}
      </div>
    </div>
  );
}
