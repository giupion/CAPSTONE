<?php
// app/Models/FlightBooking.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlightBooking extends Model
{
    protected $casts = [
        'flight_details' => 'array',
    ];

    protected $fillable = ['user_id', 'destination_id', 'flight_details'];
}
