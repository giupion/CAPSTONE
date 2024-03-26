<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('accommodation_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destination_id')->constrained()->onDelete('cascade');
            // Aggiungi altri campi per le prenotazioni di alloggio
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accommodation_bookings');
    }
};
