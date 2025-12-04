import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
import StarRating from '../components/StarRating'
import { useNavigate } from "react-router-dom";

const RoomDetails = () => {
    const { id } = useParams()
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        const room = roomsDummyData.find(room => room._id === id)
        room && setRoom(room)
        room && setMainImage(room.images[0])
    }, [])

    // ------------------------------
    // VALIDATION FUNCTION
    // ------------------------------
    const validateForm = () => {
        const checkIn = document.getElementById("checkInDate").value;
        const checkOut = document.getElementById("checkOutDate").value;
        const guests = document.getElementById("guests").value;

        const hasDates = checkIn && checkOut;
        const hasGuest = guests;

        // Case 1: guest filled but missing date(s)
        if (hasGuest && !hasDates) {
            if (!checkIn) alert("Please fill out Check In");
            if (!checkOut) alert("Please fill out Check Out");
            return false;
        }

        // Case 2: dates filled but guest missing
        if (hasDates && !hasGuest) {
            alert("Please fill out Guests");
            return false;
        }

        // Case 3: all empty or multiple missing
        if (!checkIn || !checkOut || !guests) {
            if (!checkIn) alert("Please fill out Check In");
            if (!checkOut) alert("Please fill out Check Out");
            if (!guests) alert("Please fill out Guests");
            return false;
        }

        return true;
    };

    const handleCheckAvailability = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("All fields filled ✔️");
        }
    };

    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>

            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl font-playfair'>
                    {room.hotel.name} <span className='font-inter text-sm'>({room.roomType})</span>
                </h1>
                <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% off</p>
            </div>

            <div className='flex items-center gap-1 mt-2'>
                <StarRating />
                <p className='ml-2'>200+ reviews</p>
            </div>

            <div className='flex items-center gap-1 text-gray-500 mt-2'>
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
            </div>
        
            <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                <div className='lg:w-1/2 w-full'>
                    <img src={mainImage} alt="Room" className='w-full rounded-xl shadow-lg object-cover' />
                </div>

                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                    {room?.images.map((image, index) => (
                        <img
                            key={index}
                            onClick={() => setMainImage(image)}
                            src={image}
                            alt="Room"
                            className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image ? 'outline-3 outline-orange-500' : ''}`}
                        />
                    ))}
                </div>
            </div>

            <div className='flex flex-col md:flex-row md:justify-between mt-10'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((item, index) => (
                            <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                                <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                                <p className='text-xs'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
            </div>

            {/* ------------------------------
                FORM WITH VALIDATION
            ------------------------------ */}
            <form
                onSubmit={handleCheckAvailability}
                className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'
            >
                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>

                    <div className='flex flex-col'>
                        <label htmlFor="checkInDate" className='font-medium'>Check In</label>
                        <input type="date" id='checkInDate' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' />
                    </div>

                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

                    <div className='flex flex-col'>
                        <label htmlFor="checkOutDate" className='font-medium'>Check Out</label>
                        <input type="date" id='checkOutDate' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' />
                    </div>

                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

                    <div className='flex flex-col'>
                        <label htmlFor="guests" className='font-medium'>Guests</label>
                        <input type="number" id="guests" placeholder="0" min="1" onKeyDown={(e) => {
                            // Prevent letters, symbols, e, +, -, etc.
                            if (
                                ["e", "E", "+", "-", "."].includes(e.key) || isNaN(Number(e.key)) && e.key !== "Backspace"
                            ) { e.preventDefault(); }
                        }}
                            onInput={(e) => {
                                // Prevent negative or zero numbers
                                if (e.target.value < 1) e.target.value = 1;
                            }}
                            className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                        />

                    </div>

                </div>

                <button
                    type='submit'
                    className='bg-primary hover:bg-primary-dull text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'
                >
                    Check Availability
                </button>

                <button
                    onClick={() => navigate("/reservation")}
                    type="button"
                    className='bg-primary hover:bg-primary-dull text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'
                >
                    Reserve
                </button>
            </form>

        </div>
    )
}

export default RoomDetails
