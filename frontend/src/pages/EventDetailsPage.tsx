import { useParams } from "react-router-dom";

const EventDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF3E1]">
      <h1 className="text-3xl font-bold mb-4">Event Details</h1>
      <p className="text-lg">Event ID / slug: {id}</p>
    </div>
  );
};

export default EventDetailsPage;
