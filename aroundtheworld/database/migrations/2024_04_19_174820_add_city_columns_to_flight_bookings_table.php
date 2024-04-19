<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCityColumnsToFlightBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('flight_bookings', function (Blueprint $table) {
            $table->string('origin_city_name')->nullable();
            $table->string('origin_city_code')->nullable();
            $table->string('destination_city_name')->nullable();
            $table->string('destination_city_code')->nullable();
            // Aggiungi altre colonne se necessario
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('flight_bookings', function (Blueprint $table) {
            $table->dropColumn('origin_city_name');
            $table->dropColumn('origin_city_code');
            $table->dropColumn('destination_city_name');
            $table->dropColumn('destination_city_code');
            // Aggiungi le drop delle altre colonne se necessario
        });
    }
}
