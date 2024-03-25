<?php
// app/Models/AccommodationBooking.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccommodationBooking extends Model
{
    protected $casts = [
        'accommodation_details' => 'array',
    ];

    protected $fillable = ['user_id', 'destination_id', 'accommodation_details'];
}
