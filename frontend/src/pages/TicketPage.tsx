import { useParams } from "react-router-dom";

const TicketPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF3E1]">
      <h1 className="text-3xl font-bold mb-4">Your Ticket</h1>
      <p className="text-lg">Ticket ID: {id}</p>
    </div>
  );
};

export default TicketPage;
