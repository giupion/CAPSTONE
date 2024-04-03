<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Destination;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
class DestinationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * 
     * 
     */

    
     
   


    public function run()
    {
        $destinations = [
            ['name' => 'Paris', 'description' => 'Known as the City of Light, Paris is celebrated for its culture, fashion, and gastronomy. Visit iconic landmarks such as the Eiffel Tower and the Louvre Museum.'],
    ['name' => 'Rome', 'description' => 'Rome, the Eternal City, is famous for its ancient ruins, including the Colosseum and the Roman Forum, as well as Renaissance art and architecture.'],
    ['name' => 'New York City', 'description' => 'New York City, the Big Apple, is a bustling metropolis known for its skyscrapers, Broadway shows, and diverse cultural scene.'],
    ['name' => 'Tokyo', 'description' => 'Tokyo, the capital of Japan, is a vibrant city known for its futuristic technology, traditional temples, and vibrant street life.'],
    ['name' => 'London', 'description' => 'London, the capital of England, is a global city known for its history, culture, and iconic landmarks such as Buckingham Palace and the Tower of London.'],
    ['name' => 'Barcelona', 'description' => 'Barcelona, located on the northeastern coast of Spain, is famous for its architecture, beaches, and vibrant nightlife. Visit attractions such as the Sagrada Familia and Park Güell.'],
    ['name' => 'Sydney', 'description' => 'Sydney, the largest city in Australia, is renowned for its stunning harbor, iconic Sydney Opera House, and surf-friendly beaches like Bondi and Manly.'],
    ['name' => 'Rio de Janeiro', 'description' => 'Rio de Janeiro, commonly referred to as Rio, is a vibrant city known for its stunning beaches, iconic landmarks like Christ the Redeemer, and energetic Carnival celebrations.'],
    ['name' => 'Amsterdam', 'description' => 'Amsterdam is famous for its picturesque canals, historic architecture, and vibrant cultural scene. Visit world-class museums like the Rijksmuseum and enjoy a leisurely bike ride through the charming streets.'],
    ['name' => 'Venice', 'description' => 'Venice is a city of romantic waterways, magnificent palaces, and artistic treasures. Explore the narrow alleyways, take a gondola ride along the Grand Canal, and admire the beauty of St. Mark\'s Basilica.'],
    ['name' => 'Dubai', 'description' => 'Dubai is a modern metropolis known for its futuristic skyscrapers, luxury shopping malls, and extravagant attractions like the Burj Khalifa and Palm Jumeirah.'],
    ['name' => 'Cape Town', 'description' => 'Cape Town is a diverse city with breathtaking natural beauty, including Table Mountain and pristine beaches. Experience vibrant neighborhoods, world-class cuisine, and unforgettable adventures, such as shark cage diving and wine tasting in the nearby Winelands.'],
    ['name' => 'Hong Kong', 'description' => 'Hong Kong is a dynamic city known for its skyscrapers, bustling street markets, and delicious Cantonese cuisine. Explore Victoria Harbour, ride the iconic Star Ferry, and visit historic landmarks like the Tian Tan Buddha.'],
    ['name' => 'Florence', 'description' => 'Florence, the birthplace of the Renaissance, is renowned for its art and architecture. Marvel at masterpieces in the Uffizi Gallery, stroll across the Ponte Vecchio, and admire the magnificent Duomo.'],
    ['name' => 'Prague', 'description' => 'Prague, the capital of the Czech Republic, is famous for its well-preserved medieval architecture, including Prague Castle and the Charles Bridge. Explore charming cobblestone streets, sample delicious Czech beer, and soak up the city\'s rich history and culture.'],
    ['name' => 'Bali', 'description' => 'Bali is a tropical paradise known for its lush landscapes, stunning beaches, and vibrant culture. Experience traditional Balinese ceremonies, indulge in delicious cuisine, and relax at luxurious resorts overlooking the azure waters of the Indian Ocean.'],
    ['name' => 'Santorini', 'description' => 'Santorini is a picturesque Greek island known for its stunning sunsets, whitewashed buildings, and crystal-clear waters. Explore charming villages perched on volcanic cliffs, relax on black sand beaches, and sample delicious Greek cuisine.'],
    ['name' => 'Las Vegas', 'description' => 'Las Vegas, also known as Sin City, is famous for its vibrant nightlife, world-class entertainment, and luxurious resorts. Experience dazzling casinos, spectacular shows, and gourmet dining options along the iconic Las Vegas Strip.'],
    ['name' => 'Berlin', 'description' => 'Berlin is a vibrant city with a rich history, diverse culture, and thriving arts scene. Explore historic landmarks like the Berlin Wall and Checkpoint Charlie, visit world-class museums, and enjoy eclectic cuisine from around the world.'],
    ['name' => 'Vienna', 'description' => 'Vienna, the capital of Austria, is known for its elegant architecture, classical music heritage, and vibrant coffeehouse culture. Explore imperial palaces like Schönbrunn and Belvedere, attend a performance at the Vienna State Opera, and indulge in delicious Viennese pastries.'],
    ['name' => 'Seoul', 'description' => 'Seoul, the capital of South Korea, is a dynamic city where modern skyscrapers coexist with ancient palaces and temples. Explore bustling markets, sample delicious street food, and immerse yourself in Korean culture and traditions.'],
    ['name' => 'San Francisco', 'description' => 'San Francisco is a diverse city known for its iconic landmarks, including the Golden Gate Bridge, Alcatraz Island, and Fisherman\'s Wharf. Explore vibrant neighborhoods like Chinatown and the Mission District, and enjoy breathtaking views from Twin Peaks.'],
    ['name' => 'Istanbul', 'description' => 'Istanbul, straddling Europe and Asia, is a city rich in history, culture, and stunning architecture. Explore ancient sites like the Hagia Sophia and the Blue Mosque, wander through bustling bazaars, and cruise along the Bosphorus Strait.'],
    ['name' => 'Bangkok', 'description' => 'Bangkok, the capital of Thailand, is a vibrant metropolis known for its ornate temples, bustling street markets, and vibrant nightlife. Experience the city\'s rich cultural heritage, sample delicious Thai cuisine, and explore hidden gems off the beaten path.'],
    ['name' => 'Edinburgh', 'description' => 'Edinburgh, the capital of Scotland, is known for its historic landmarks, including Edinburgh Castle and the Royal Mile. Explore charming cobblestone streets, visit world-class museums, and experience the city\'s lively festivals and events.'],
    ['name' => 'Marrakech', 'description' => 'Marrakech is a vibrant city in Morocco known for its bustling medina, vibrant souks, and historic landmarks. Explore the narrow alleyways of the old town, visit majestic palaces and mosques, and immerse yourself in the city\'s rich culture and traditions.'],
    ['name' => 'Cairo', 'description' => 'Cairo, the capital of Egypt, is a bustling metropolis with a rich history dating back thousands of years. Explore iconic landmarks like the Giza Pyramids and the Sphinx, wander through bustling bazaars, and cruise along the Nile River.'],
    ['name' => 'Dublin', 'description' => 'Dublin, the capital of Ireland, is known for its vibrant cultural scene, historic landmarks, and lively pub culture. Explore iconic attractions like Trinity College and the Guinness Storehouse, and experience traditional Irish music in cozy pubs across the city.'],
    ['name' => 'Havana', 'description' => 'Havana is the vibrant capital city of Cuba, known for its colorful colonial architecture, vintage cars, and lively music scene. Explore historic neighborhoods like Old Havana, relax on sandy beaches, and immerse yourself in the city\'s unique culture and history.'],
    ['name' => 'Toronto', 'description' => 'Toronto is a diverse and multicultural city known for its iconic skyline, vibrant neighborhoods, and world-class attractions. Explore the CN Tower, stroll along the waterfront, and experience the city\'s thriving arts and food scene.'],
    ['name' => 'Zurich', 'description' => 'Zurich is a picturesque city in Switzerland known for its stunning scenery, historic landmarks, and vibrant cultural scene. Explore charming Old Town streets, take a boat cruise on Lake Zurich, and indulge in delicious Swiss chocolate.'],
    ['name' => 'Moscow', 'description' => 'Moscow, the capital of Russia, is known for its iconic landmarks, including the Kremlin and Red Square. Explore grand palaces and cathedrals, visit world-class museums, and experience the city\'s rich history and culture.'],
    ['name' => 'Montreal', 'description' => 'Montreal is a vibrant city in Canada known for its historic architecture, lively festivals, and eclectic dining scene. Explore charming neighborhoods like Old Montreal and the Plateau, visit world-class museums, and experience the city\'s unique blend of French and Canadian culture.'],
    ['name' => 'Kyoto', 'description' => 'Kyoto, the former imperial capital of Japan, is known for its beautiful temples, traditional tea houses, and picturesque gardens. Explore historic landmarks like Kinkaku-ji and Fushimi Inari Shrine, and immerse yourself in the city\'s rich cultural heritage.'],
    ['name' => 'Amsterdam', 'description' => 'Amsterdam is famous for its picturesque canals, historic architecture, and vibrant cultural scene. Visit world-class museums like the Rijksmuseum and enjoy a leisurely bike ride through the charming streets.'],
    ['name' => 'Venice', 'description' => 'Venice is a city of romantic waterways, magnificent palaces, and artistic treasures. Explore the narrow alleyways, take a gondola ride along the Grand Canal, and admire the beauty of St. Mark\'s Basilica.'],
    ['name' => 'Dubai', 'description' => 'Dubai is a modern metropolis known for its futuristic skyscrapers, luxury shopping malls, and extravagant attractions like the Burj Khalifa and Palm Jumeirah.'],
    ['name' => 'Cape Town', 'description' => 'Cape Town is a diverse city with breathtaking natural beauty, including Table Mountain and pristine beaches. Experience vibrant neighborhoods, world-class cuisine, and unforgettable adventures, such as shark cage diving and wine tasting in the nearby Winelands.'],
    ['name' => 'Hong Kong', 'description' => 'Hong Kong is a dynamic city known for its skyscrapers, bustling street markets, and delicious Cantonese cuisine. Explore Victoria Harbour, ride the iconic Star Ferry, and visit historic landmarks like the Tian Tan Buddha.'],
    ['name' => 'Florence', 'description' => 'Florence, the birthplace of the Renaissance, is renowned for its art and architecture. Marvel at masterpieces in the Uffizi Gallery, stroll across the Ponte Vecchio, and admire the magnificent Duomo.'],
    ['name' => 'Prague', 'description' => 'Prague, the capital of the Czech Republic, is famous for its well-preserved medieval architecture, including Prague Castle and the Charles Bridge. Explore charming cobblestone streets, sample delicious Czech beer, and soak up the city\'s rich history and culture.'],
    ['name' => 'Bali', 'description' => 'Bali is a tropical paradise known for its lush landscapes, stunning beaches, and vibrant culture. Experience traditional Balinese ceremonies, indulge in delicious cuisine, and relax at luxurious resorts overlooking the azure waters of the Indian Ocean.'],
    ['name' => 'Santorini', 'description' => 'Santorini is a picturesque Greek island known for its stunning sunsets, whitewashed buildings, and crystal-clear waters. Explore charming villages perched on volcanic cliffs, relax on black sand beaches, and sample delicious Greek cuisine.'],
    ['name' => 'Las Vegas', 'description' => 'Las Vegas, also known as Sin City, is famous for its vibrant nightlife, world-class entertainment, and luxurious resorts. Experience dazzling casinos, spectacular shows, and gourmet dining options along the iconic Las Vegas Strip.'],
    ['name' => 'Berlin', 'description' => 'Berlin is a vibrant city with a rich history, diverse culture, and thriving arts scene. Explore historic landmarks like the Berlin Wall and Checkpoint Charlie, visit world-class museums, and enjoy eclectic cuisine from around the world.'],
    ['name' => 'Vienna', 'description' => 'Vienna, the capital of Austria, is known for its elegant architecture, classical music heritage, and vibrant coffeehouse culture. Explore imperial palaces like Schönbrunn and Belvedere, attend a performance at the Vienna State Opera, and indulge in delicious Viennese pastries.'],
    ['name' => 'Seoul', 'description' => 'Seoul, the capital of South Korea, is a dynamic city where modern skyscrapers coexist with ancient palaces and temples. Explore bustling markets, sample delicious street food, and immerse yourself in Korean culture and traditions.'],
    ['name' => 'San Francisco', 'description' => 'San Francisco is a diverse city known for its iconic landmarks, including the Golden Gate Bridge, Alcatraz Island, and Fisherman\'s Wharf. Explore vibrant neighborhoods like Chinatown and the Mission District, and enjoy breathtaking views from Twin Peaks.'],
    ['name' => 'Istanbul', 'description' => 'Istanbul, straddling Europe and Asia, is a city rich in history, culture, and stunning architecture. Explore ancient sites like the Hagia Sophia and the Blue Mosque, wander through bustling bazaars, and cruise along the Bosphorus Strait.'],
    ['name' => 'Bangkok', 'description' => 'Bangkok, the capital of Thailand, is a vibrant metropolis known for its ornate temples, bustling street markets, and vibrant nightlife. Experience the city\'s rich cultural heritage, sample delicious Thai cuisine, and explore hidden gems off the beaten path.'],
    ['name' => 'Edinburgh', 'description' => 'Edinburgh, the capital of Scotland, is known for its historic landmarks, including Edinburgh Castle and the Royal Mile. Explore charming cobblestone streets, visit world-class museums, and experience the city\'s lively festivals and events.'],
    ['name' => 'Marrakech', 'description' => 'Marrakech is a vibrant city in Morocco known for its bustling medina, vibrant souks, and historic landmarks. Explore the narrow alleyways of the old town, visit majestic palaces and mosques, and immerse yourself in the city\'s rich culture and traditions.'],
    ['name' => 'Cairo', 'description' => 'Cairo, the capital of Egypt, is a bustling metropolis with a rich history dating back thousands of years. Explore iconic landmarks like the Giza Pyramids and the Sphinx, wander through bustling bazaars, and cruise along the Nile River.'],
    ['name' => 'Dublin', 'description' => 'Dublin, the capital of Ireland, is known for its vibrant cultural scene, historic landmarks, and lively pub culture. Explore iconic attractions like Trinity College and the Guinness Storehouse, and experience traditional Irish music in cozy pubs across the city.'],
    ['name' => 'Havana', 'description' => 'Havana is the vibrant capital city of Cuba, known for its colorful colonial architecture, vintage cars, and lively music scene. Explore historic neighborhoods like Old Havana, relax on sandy beaches, and immerse yourself in the city\'s unique culture and history.'],
    ['name' => 'Toronto', 'description' => 'Toronto is a diverse and multicultural city known for its iconic skyline, vibrant neighborhoods, and world-class attractions. Explore the CN Tower, stroll along the waterfront, and experience the city\'s thriving arts and food scene.'],
    ['name' => 'Zurich', 'description' => 'Zurich is a picturesque city in Switzerland known for its stunning scenery, historic landmarks, and vibrant cultural scene. Explore charming Old Town streets, take a boat cruise on Lake Zurich, and indulge in delicious Swiss chocolate.'],
];

foreach ($destinations as $destination) {
    $imageUrl = $this->fetchImageUrl($destination['name']);
    $videoUrl = $this->fetchVideoUrl($destination['name']);

    Destination::updateOrCreate(
        ['name' => $destination['name']],
        [
            'description' => $destination['description'],
            'image_url' => $imageUrl,
            'video_url' => $videoUrl,
        ]
    );
}
}

private function fetchImageUrl($query)
{
$response = Http::get('https://api.unsplash.com/photos/random', [
    'query' => $query,
    'client_id' => 'DY6Yrc7v_4Fv3wV9FhlUsktBrFHnSxpbStHGT37FElI',
    'count' => 1,
]);

if ($response->successful()) {
    $data = $response->json();
    if (!empty($data) && isset($data[0]['urls']['regular'])) {
        return $data[0]['urls']['regular'];
    }
}

return null;
}

private function fetchVideoUrl($query)
{
$response = Http::get('https://pixabay.com/api/videos', [
    'key' => '43134652-04b8236516dac742aa1b77fb5',
    'q' => $query,
]);

if ($response->successful()) {
    $data = $response->json();
    if (!empty($data['hits'])) {
        return $data['hits'][0]['videos']['large']['url'] ?? null;
    }
}

return null;
}
}