import Modal from "./Modal";

export default function BookingModal({
  open,
  onClose,
  doctor,
  //user,
  problem,
  setProblem,
  date,
  setDate,
  time,
  setTime,
  timeSlots,
  onConfirm,
  loading,
  bookedSlots,
}: any) {
  return (
    <Modal open={open} onClose={onClose}>

      <h2 className="text-lg font-semibold mb-3">
        Book with {doctor?.name}
      </h2>

      {/* <input
        value={user?.name || ""}
        disabled
        className="w-full border p-2 rounded bg-gray-100 mb-2"
      /> */}

      <textarea
        placeholder="Describe problem..."
        className="w-full border p-2 rounded mb-2"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
      />

      <input
        type="date"
        className="w-full border p-2 rounded mb-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Time slots */}
      <div className="grid grid-cols-3 gap-2 mb-3">
       {timeSlots.map((timeSlot : any) => {
            const isBooked = bookedSlots.includes(timeSlot);

            return (
                <button
                key={timeSlot}
                disabled={isBooked}
                onClick={() => !isBooked && setTime(timeSlot)}
                className={`px-3 py-2 rounded border text-sm
                    ${
                    isBooked
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : time === timeSlot
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }
                `}
                >
                {timeSlot} {isBooked && "❌"}
                </button>
            );
            })}
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="text-gray-600">
          Cancel
        </button>

        <button
        onClick={onConfirm}
        disabled={loading}
        className={`px-4 py-2 rounded text-white transition
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
        `}
        >
        {loading ? "Booking..." : "Confirm"}
        </button>
      </div>

     </Modal>
  );
}