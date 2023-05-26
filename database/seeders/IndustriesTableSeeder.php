<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IndustriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $industries = array(
            'Technology',
            'Automotive',
            'Retail',
            'Food Industry',
            'Real Estate',
            'Logistics',
            'Design',
            'Advertising',
            'Finance',
            'Health Care',
            'Law',
            'Communication',
            'Trade',
            'Agriculture',
            'Transport',
        );
        foreach ($industries as $key => $industry) {
            $industry = new \App\Models\Industry([
                'title' => $industry
            ]);
            $industry->save();
        }
    }
}
