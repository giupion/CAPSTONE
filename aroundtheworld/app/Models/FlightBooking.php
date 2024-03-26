<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlightBooking extends Model
{
    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}