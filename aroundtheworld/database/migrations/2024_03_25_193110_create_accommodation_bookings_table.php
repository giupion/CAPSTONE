<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_accommodation_bookings_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccommodationBookingsTable extends Migration
{
    public function up()
    {
        Schema::create('accommodation_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('destination_id')->constrained()->onDelete('cascade');
            $table->json('accommodation_details');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('accommodation_bookings');
    }
}
