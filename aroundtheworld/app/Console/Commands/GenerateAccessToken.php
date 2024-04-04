<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\AccessTokenController;

class GenerateAccessToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'access-token:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate and store access token';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Richiama il controller AccessTokenController per generare e memorizzare l'access token
        $accessTokenController = new AccessTokenController();
        $accessTokenController->__invoke(new \GuzzleHttp\Client());
        
        $this->info('Access token generated and stored successfully.');
    }
}

