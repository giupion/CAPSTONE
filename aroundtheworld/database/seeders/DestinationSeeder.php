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
    ['name' => 'Cape Town, South Africa', 'description' => 'Cape Town is a diverse city with breathtaking natural beauty, including Table Mountain and pristine beaches. Experience vibrant neighborhoods, world-class cuisine, and unforgettable adventures, such as shark cage diving and wine tasting in the nearby Winelands.'],
    ['name' => 'Hong Kong, China', 'description' => 'Hong Kong is a dynamic city known for its skyscrapers, bustling street markets, and delicious Cantonese cuisine. Explore Victoria Harbour, ride the iconic Star Ferry, and visit historic landmarks like the Tian Tan Buddha.'],
    ['name' => 'Florence, Italy', 'description' => 'Florence, the birthplace of the Renaissance, is renowned for its art and architecture. Marvel at masterpieces in the Uffizi Gallery, stroll across the Ponte Vecchio, and admire the magnificent Duomo.'],
    ['name' => 'Prague, Czech Republic', 'description' => 'Prague, the capital of the Czech Republic, is famous for its well-preserved medieval architecture, including Prague Castle and the Charles Bridge. Explore charming cobblestone streets, sample delicious Czech beer, and soak up the city\'s rich history and culture.'],
    ['name' => 'Bali, Indonesia', 'description' => 'Bali is a tropical paradise known for its lush landscapes, stunning beaches, and vibrant culture. Experience traditional Balinese ceremonies, indulge in delicious cuisine, and relax at luxurious resorts overlooking the azure waters of the Indian Ocean.'],
    ['name' => 'Santorini, Greece', 'description' => 'Santorini is a picturesque Greek island known for its stunning sunsets, whitewashed buildings, and crystal-clear waters. Explore charming villages perched on volcanic cliffs, relax on black sand beaches, and sample delicious Greek cuisine.'],
    ['name' => 'Las Vegas, USA', 'description' => 'Las Vegas, also known as Sin City, is famous for its vibrant nightlife, world-class entertainment, and luxurious resorts. Experience dazzling casinos, spectacular shows, and gourmet dining options along the iconic Las Vegas Strip.'],
    ['name' => 'Berlin, Germany', 'description' => 'Berlin is a vibrant city with a rich history, diverse culture, and thriving arts scene. Explore historic landmarks like the Berlin Wall and Checkpoint Charlie, visit world-class museums, and enjoy eclectic cuisine from around the world.'],
    ['name' => 'Vienna, Austria', 'description' => 'Vienna, the capital of Austria, is known for its elegant architecture, classical music heritage, and vibrant coffeehouse culture. Explore imperial palaces like Schönbrunn and Belvedere, attend a performance at the Vienna State Opera, and indulge in delicious Viennese pastries.'],
    ['name' => 'Seoul, South Korea', 'description' => 'Seoul, the capital of South Korea, is a dynamic city where modern skyscrapers coexist with ancient palaces and temples. Explore bustling markets, sample delicious street food, and immerse yourself in Korean culture and traditions.'],
    ['name' => 'San Francisco, USA', 'description' => 'San Francisco is a diverse city known for its iconic landmarks, including the Golden Gate Bridge, Alcatraz Island, and Fisherman\'s Wharf. Explore vibrant neighborhoods like Chinatown and the Mission District, and enjoy breathtaking views from Twin Peaks.'],
    ['name' => 'Istanbul, Turkey', 'description' => 'Istanbul, straddling Europe and Asia, is a city rich in history, culture, and stunning architecture. Explore ancient sites like the Hagia Sophia and the Blue Mosque, wander through bustling bazaars, and cruise along the Bosphorus Strait.'],
    ['name' => 'Bangkok, Thailand', 'description' => 'Bangkok, the capital of Thailand, is a vibrant metropolis known for its ornate temples, bustling street markets, and vibrant nightlife. Experience the city\'s rich cultural heritage, sample delicious Thai cuisine, and explore hidden gems off the beaten path.'],
    ['name' => 'Edinburgh, UK', 'description' => 'Edinburgh, the capital of Scotland, is known for its historic landmarks, including Edinburgh Castle and the Royal Mile. Explore charming cobblestone streets, visit world-class museums, and experience the city\'s lively festivals and events.'],
    ['name' => 'Marrakech, Morocco', 'description' => 'Marrakech is a vibrant city in Morocco known for its bustling medina, vibrant souks, and historic landmarks. Explore the narrow alleyways of the old town, visit majestic palaces and mosques, and immerse yourself in the city\'s rich culture and traditions.'],
    ['name' => 'Cairo, Egypt', 'description' => 'Cairo, the capital of Egypt, is a bustling metropolis with a rich history dating back thousands of years. Explore iconic landmarks like the Giza Pyramids and the Sphinx, wander through bustling bazaars, and cruise along the Nile River.'],
    ['name' => 'Dublin, Ireland', 'description' => 'Dublin, the capital of Ireland, is known for its vibrant cultural scene, historic landmarks, and lively pub culture. Explore iconic attractions like Trinity College and the Guinness Storehouse, and experience traditional Irish music in cozy pubs across the city.'],
    ['name' => 'Havana, Cuba', 'description' => 'Havana is the vibrant capital city of Cuba, known for its colorful colonial architecture, vintage cars, and lively music scene. Explore historic neighborhoods like Old Havana, relax on sandy beaches, and immerse yourself in the city\'s unique culture and history.'],
    ['name' => 'Toronto, Canada', 'description' => 'Toronto is a diverse and multicultural city known for its iconic skyline, vibrant neighborhoods, and world-class attractions. Explore the CN Tower, stroll along the waterfront, and experience the city\'s thriving arts and food scene.'],
    ['name' => 'Zurich, Switzerland', 'description' => 'Zurich is a picturesque city in Switzerland known for its stunning scenery, historic landmarks, and vibrant cultural scene. Explore charming Old Town streets, take a boat cruise on Lake Zurich, and indulge in delicious Swiss chocolate.'],
    ['name' => 'Moscow, Russia', 'description' => 'Moscow, the capital of Russia, is known for its iconic landmarks, including the Kremlin and Red Square. Explore grand palaces and cathedrals, visit world-class museums, and experience the city\'s rich history and culture.'],
    ['name' => 'Montreal, Canada', 'description' => 'Montreal is a vibrant city in Canada known for its historic architecture, lively festivals, and eclectic dining scene. Explore charming neighborhoods like Old Montreal and the Plateau, visit world-class museums, and experience the city\'s unique blend of French and Canadian culture.'],
    ['name' => 'Kyoto, Japan', 'description' => 'Kyoto, the former imperial capital of Japan, is known for its beautiful temples, traditional tea houses, and picturesque gardens. Explore historic landmarks like Kinkaku-ji and Fushimi Inari Shrine, and immerse yourself in the city\'s rich cultural heritage.'],
    ['name' => 'Amsterdam, Netherlands', 'description' => 'Amsterdam is famous for its picturesque canals, historic architecture, and vibrant cultural scene. Visit world-class museums like the Rijksmuseum and enjoy a leisurely bike ride through the charming streets.'],
    ['name' => 'Venice, Italy', 'description' => 'Venice is a city of romantic waterways, magnificent palaces, and artistic treasures. Explore the narrow alleyways, take a gondola ride along the Grand Canal, and admire the beauty of St. Mark\'s Basilica.'],
    ['name' => 'Dubai, UAE', 'description' => 'Dubai is a modern metropolis known for its futuristic skyscrapers, luxury shopping malls, and extravagant attractions like the Burj Khalifa and Palm Jumeirah.'],
    ['name' => 'Cape Town, South Africa', 'description' => 'Cape Town is a diverse city with breathtaking natural beauty, including Table Mountain and pristine beaches. Experience vibrant neighborhoods, world-class cuisine, and unforgettable adventures, such as shark cage diving and wine tasting in the nearby Winelands.'],
    ['name' => 'Hong Kong, China', 'description' => 'Hong Kong is a dynamic city known for its skyscrapers, bustling street markets, and delicious Cantonese cuisine. Explore Victoria Harbour, ride the iconic Star Ferry, and visit historic landmarks like the Tian Tan Buddha.'],
    ['name' => 'Florence, Italy', 'description' => 'Florence, the birthplace of the Renaissance, is renowned for its art and architecture. Marvel at masterpieces in the Uffizi Gallery, stroll across the Ponte Vecchio, and admire the magnificent Duomo.'],
    ['name' => 'Prague, Czech Republic', 'description' => 'Prague, the capital of the Czech Republic, is famous for its well-preserved medieval architecture, including Prague Castle and the Charles Bridge. Explore charming cobblestone streets, sample delicious Czech beer, and soak up the city\'s rich history and culture.'],
    ['name' => 'Bali, Indonesia', 'description' => 'Bali is a tropical paradise known for its lush landscapes, stunning beaches, and vibrant culture. Experience traditional Balinese ceremonies, indulge in delicious cuisine, and relax at luxurious resorts overlooking the azure waters of the Indian Ocean.'],
    ['name' => 'Santorini, Greece', 'description' => 'Santorini is a picturesque Greek island known for its stunning sunsets, whitewashed buildings, and crystal-clear waters. Explore charming villages perched on volcanic cliffs, relax on black sand beaches, and sample delicious Greek cuisine.'],
    ['name' => 'Las Vegas, USA', 'description' => 'Las Vegas, also known as Sin City, is famous for its vibrant nightlife, world-class entertainment, and luxurious resorts. Experience dazzling casinos, spectacular shows, and gourmet dining options along the iconic Las Vegas Strip.'],
    ['name' => 'Berlin, Germany', 'description' => 'Berlin is a vibrant city with a rich history, diverse culture, and thriving arts scene. Explore historic landmarks like the Berlin Wall and Checkpoint Charlie, visit world-class museums, and enjoy eclectic cuisine from around the world.'],
    ['name' => 'Vienna, Austria', 'description' => 'Vienna, the capital of Austria, is known for its elegant architecture, classical music heritage, and vibrant coffeehouse culture. Explore imperial palaces like Schönbrunn and Belvedere, attend a performance at the Vienna State Opera, and indulge in delicious Viennese pastries.'],
    ['name' => 'Seoul, South Korea', 'description' => 'Seoul, the capital of South Korea, is a dynamic city where modern skyscrapers coexist with ancient palaces and temples. Explore bustling markets, sample delicious street food, and immerse yourself in Korean culture and traditions.'],
    ['name' => 'San Francisco, USA', 'description' => 'San Francisco is a diverse city known for its iconic landmarks, including the Golden Gate Bridge, Alcatraz Island, and Fisherman\'s Wharf. Explore vibrant neighborhoods like Chinatown and the Mission District, and enjoy breathtaking views from Twin Peaks.'],
    ['name' => 'Istanbul, Turkey', 'description' => 'Istanbul, straddling Europe and Asia, is a city rich in history, culture, and stunning architecture. Explore ancient sites like the Hagia Sophia and the Blue Mosque, wander through bustling bazaars, and cruise along the Bosphorus Strait.'],
    ['name' => 'Bangkok, Thailand', 'description' => 'Bangkok, the capital of Thailand, is a vibrant metropolis known for its ornate temples, bustling street markets, and vibrant nightlife. Experience the city\'s rich cultural heritage, sample delicious Thai cuisine, and explore hidden gems off the beaten path.'],
    ['name' => 'Edinburgh, UK', 'description' => 'Edinburgh, the capital of Scotland, is known for its historic landmarks, including Edinburgh Castle and the Royal Mile. Explore charming cobblestone streets, visit world-class museums, and experience the city\'s lively festivals and events.'],
    ['name' => 'Marrakech, Morocco', 'description' => 'Marrakech is a vibrant city in Morocco known for its bustling medina, vibrant souks, and historic landmarks. Explore the narrow alleyways of the old town, visit majestic palaces and mosques, and immerse yourself in the city\'s rich culture and traditions.'],
    ['name' => 'Cairo, Egypt', 'description' => 'Cairo, the capital of Egypt, is a bustling metropolis with a rich history dating back thousands of years. Explore iconic landmarks like the Giza Pyramids and the Sphinx, wander through bustling bazaars, and cruise along the Nile River.'],
    ['name' => 'Dublin, Ireland', 'description' => 'Dublin, the capital of Ireland, is known for its vibrant cultural scene, historic landmarks, and lively pub culture. Explore iconic attractions like Trinity College and the Guinness Storehouse, and experience traditional Irish music in cozy pubs across the city.'],
    ['name' => 'Havana, Cuba', 'description' => 'Havana is the vibrant capital city of Cuba, known for its colorful colonial architecture, vintage cars, and lively music scene. Explore historic neighborhoods like Old Havana, relax on sandy beaches, and immerse yourself in the city\'s unique culture and history.'],
    ['name' => 'Toronto, Canada', 'description' => 'Toronto is a diverse and multicultural city known for its iconic skyline, vibrant neighborhoods, and world-class attractions. Explore the CN Tower, stroll along the waterfront, and experience the city\'s thriving arts and food scene.'],
    ['name' => 'Zurich, Switzerland', 'description' => 'Zurich is a picturesque city in Switzerland known for its stunning scenery, historic landmarks, and vibrant cultural scene. Explore charming Old Town streets, take a boat cruise on Lake Zurich, and indulge in delicious Swiss chocolate.'],
];


foreach ($destinations as $destination) {
    // Check if the destination already exists
    $existingDestination = Destination::where('name', $destination['name'])->first();
    // If the destination does not exist, create it
    if (!$existingDestination) {
        Destination::create([
            'name' => $destination['name'],
            'description' => $destination['description'],
            // Add other fields if necessary
        ]);
    }
}
}
}
