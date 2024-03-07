async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json();

  const parsedBookings = data.map(booking => ({
    id: booking.id,
    service: booking.service,
    doctor_name: booking.doctor_name,
    start_time: booking.start_time,
    end_time: booking.end_time,
    date: booking.date
  }));

  return parsedBookings;
}
  
const Home: React.FC = async () => {

  const bookings = await getBookings()

  return (
    <div className="flex flex-col items-center justify-center py-40 px-10"> {/* Increase the py value to move the services further down */}
      <h1 className="text-3xl font-bold mb-4">Booked Services</h1> 
      <div className="container mx-auto"> 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-4 md:p-6"> 
              <a href={`/booking/${booking.id}`} target="_blank" rel="noopener noreferrer">
                <div className="block cursor-pointer">
                  <p className="text-xs md:text-sm font-medium text-custom-color truncate">{booking.service}</p>
                  <p className="text-xs md:text-sm text-gray-500">{booking.doctor_name}</p>
                  <p className="text-xs md:text-sm text-gray-500">{booking.start_time} - {booking.end_time}</p>
                  <p className="text-xs md:text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</p>

                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;