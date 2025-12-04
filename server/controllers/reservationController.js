import fs from "fs";

export const handleReservation = async (req, res) => {
  try {
    const reservation = req.body;

    // Save file inside project folder
    const file = "./reservations.json";
    let data = [];

    // If file exists, load previous reservations
    if (fs.existsSync(file)) {
      data = JSON.parse(fs.readFileSync(file));
    }

    // Add new reservation
    data.push(reservation);

    // Save back to file
    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    // Respond success
    res.json({ success: true, message: "Reservation saved successfully" });

  } catch (error) {
    console.error("Reservation error:", error);
    res.status(500).json({ success: false, message: "Error saving reservation" });
  }
};
