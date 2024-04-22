<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlightBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'flight_id',
        'carrier_code',
        'duration',
        'total_price',
        'booking_deadline',
        'bookable_seats',
        'instant_ticketing_required',
        'direct_flight',
        'origin_city_code',
        'destination_city_code',
        // Add other fields if needed
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
