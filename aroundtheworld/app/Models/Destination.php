<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    public function flightBookings()
    {
        return $this->hasMany(FlightBooking::class);
    }

    public function accommodationBookings()
    {
        return $this->hasMany(AccommodationBooking::class);
    }
}
