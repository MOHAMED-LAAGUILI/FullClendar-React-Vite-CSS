import { useEffect, useState } from "react"; 
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css"; // Import your CSS file

function Calendar() {
  const currentYear = new Date().getFullYear();
  const [holidays, setHolidays] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    setLoading(true);
    setError(null);
    const allHolidays = [];

    const countries = [
        'DE'
    ]
    try {
      await Promise.all(
        countries.map(async (code) => {
          const response = await fetch(
            `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${code}`
          );

          if (!response.ok) throw new Error("Failed to fetch holidays");

          const data = await response.json();

          const countryResponse = await fetch(
            `https://restcountries.com/v3.1/alpha/${code}`
          );
          const countryData = await countryResponse.json();
          const flagUrl = countryData[0].flags.svg; // Get flag image URL

          const formattedHolidays = data.map((holiday) => ({
            title: holiday.localName,
            description: holiday.name,
            start: new Date(holiday.date).toISOString().split("T")[0],
            allDay: true,
            countryImage: flagUrl, // Use flag image from REST API
            picture: "https://via.placeholder.com/600x200.png?text=Event+Image", // Placeholder for event image
          }));

          allHolidays.push(...formattedHolidays);
        })
      );

      setHolidays(allHolidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setError("Could not load holidays. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (info) => {
    setModalData(info.event.extendedProps);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="calendar-container">
      {error && (
        <div className="error-message">
          {error}{" "}
          <button onClick={fetchHolidays}>Retry</button>
        </div>
      )}

      {loading ? (
        <p className="loading">Loading holidays...</p>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "",
          }}
          height={"80vh"}
          events={holidays.map((holiday) => ({
            title: holiday.title,
            start: holiday.start,
            allDay: holiday.allDay,
            extendedProps: {
              description: holiday.description,
              countryImage: holiday.countryImage,
              picture: holiday.picture,
            },
          }))}
          eventClick={handleEventClick}
          eventContent={(eventInfo) => (
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent:'center',
                padding: '5px', 
                margin: '5px', 
                background: '', 
                borderRadius: '5px',
                textAlign: 'center',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: '100px' // Adjust width as needed
              }} 
              title={eventInfo.event.title} // Tooltip for full text visibility
            >
              <img 
                src={eventInfo.event.extendedProps.countryImage} 
                alt="Country Flag" 
                style={{ width: '20px', height: '15px', marginRight: '5px' }} 
              />
              <span>{eventInfo.event.title.length > 5 ? `${eventInfo.event.title.slice(0, 5)}....` : eventInfo.event.title}</span>
            </div>
          )}
        />
      )}

      {modalOpen && modalData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={modalData.countryImage} alt={modalData.title} className="country-banner" />
            <h2>{modalData.title}</h2>
            <p><strong>Description:</strong> {modalData.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;