<?php

// app/Http/Controllers/DestinationController.php
//recuperi i dati delle destinazioni dal database e li restituisca come JSON:
namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index()
    {
        $destinations = Destination::all();
        return response()->json(['destinations' => $destinations]);
    }
}
