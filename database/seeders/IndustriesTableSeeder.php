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
            'Automotive',
            'B2B Marketplace',
            'Catering',
            'Corporate HR and Business Unit',
            'Corporate Strategy and Development',
            'Daycare Hospital',
            'Facilities Management',
            'Finance and Accounts',
            'General Administration and Visa',
            'Healthcare Trading',
            'Industry',
            'Internal Audit',
            'IT',
            'Logistics',
            'Marketing and Corporate Communication',
            'PP Partnership',
            'Project Management',
            'Retail (Supermarket)',
            'Trade Distribution',
            'Treasury and Taxation',
        );
        foreach ($industries as $key => $industry) {
            $industry = new \App\Models\Industry([
                'title' => $industry
            ]);
            $industry->save();
        }
    }
}
