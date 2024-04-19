<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlightBooking extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
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
        // Aggiungi altri campi se necessario
    ];

    /**
     * Get the user that owns the flight booking.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
