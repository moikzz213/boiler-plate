<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompaniesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = array(
            'GHASSAN ABOUD GROUP FZE',
            'GHASSAN ABOUD CAR TRADING LTD',
            'GHASSAN ABOUD AUTO SP LLC',
            'LIVE POINT ART PRODUCTION LLC',
            'ORIENT CHANNEL FZE',
            'GALLEGA GLOBAL LOGISTICS LLC',
            'GRANDIOSE SUPERMARKET LLC',
            'GRANDIOSE CATERING LLC',
            'GAELAN MEDICAL CARE LLC',
            'GAELAN MEDICAL TRADE LLC',
            'OLIVE COUNTRY GENERAL TRADING',
            'GA TRADE PLATFORMS BUYGRO',
            'GA AUTO PLATFORMS BUYPARTS',
        );
        foreach ($companies as $key => $company) {
            $company = new \App\Models\Company([
                'title' => $company
            ]);
            $company->save();
        }
    }
}
