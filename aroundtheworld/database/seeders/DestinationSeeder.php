<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Destination;

class DestinationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $destinations = [
            ['name' => 'Paris, France', 'description' => 'Known as the City of Light, Paris is celebrated for its culture, fashion, and gastronomy. Visit iconic landmarks such as the Eiffel Tower and the Louvre Museum.'],
    ['name' => 'Rome, Italy', 'description' => 'Rome, the Eternal City, is famous for its ancient ruins, including the Colosseum and the Roman Forum, as well as Renaissance art and architecture.'],
    ['name' => 'New York City, USA', 'description' => 'New York City, the Big Apple, is a bustling metropolis known for its skyscrapers, Broadway shows, and diverse cultural scene.'],
    ['name' => 'Tokyo, Japan', 'description' => 'Tokyo, the capital of Japan, is a vibrant city known for its futuristic technology, traditional temples, and vibrant street life.'],
    ['name' => 'London, UK', 'description' => 'London, the capital of England, is a global city known for its history, culture, and iconic landmarks such as Buckingham Palace and the Tower of London.'],
    ['name' => 'Barcelona, Spain', 'description' => 'Barcelona, located on the northeastern coast of Spain, is famous for its architecture, beaches, and vibrant nightlife. Visit attractions such as the Sagrada Familia and Park Güell.'],
    ['name' => 'Sydney, Australia', 'description' => 'Sydney, the largest city in Australia, is renowned for its stunning harbor, iconic Sydney Opera House, and surf-friendly beaches like Bondi and Manly.'],
    ['name' => 'Rio de Janeiro, Brazil', 'description' => 'Rio de Janeiro, commonly referred to as Rio, is a vibrant city known for its stunning beaches, iconic landmarks like Christ the Redeemer, and energetic Carnival celebrations.'],
    ['name' => 'Amsterdam, Netherlands', 'description' => 'Amsterdam is famous for its picturesque canals, historic architecture, and vibrant cultural scene. Visit world-class museums like the Rijksmuseum and enjoy a leisurely bike ride through the charming streets.'],
    ['name' => 'Venice, Italy', 'description' => 'Venice is a city of romantic waterways, magnificent palaces, and artistic treasures. Explore the narrow alleyways, take a gondola ride along the Grand Canal, and admire the beauty of St. Mark\'s Basilica.'],
    ['name' => 'Dubai, UAE', 'description' => 'Dubai is a modern metropolis known for its futuristic skyscrapers, luxury shopping malls, and extravagant attractions like the Burj Khalifa and Palm Jumeirah.'],
    ['name' => 'Cape Town, South Africa', 'description' => 'Cape Town is a diverse city with breathtaking natural beauty, including Table Mountain and pristine beaches. Experience vibrant neighborhoods, world-class cuisine, and unforgettable adventures, such as shark cage diving and wine tasting in the nearby Winelands.'],        // Aggiungi altre destinazioni con nome e descrizione qui...
        ];

        foreach ($destinations as $destination) {
            Destination::create([
                'name' => $destination['name'],
                'description' => $destination['description'],
                // Aggiungi altri campi se necessario
            ]);
        }
    }
}

