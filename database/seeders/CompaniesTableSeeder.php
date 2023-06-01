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
            'Ghassan Aboud Group FZE',
            'GA Cars',
            'GA Spareparts',
            'Grandiose Supermarket',
            'Grandiose Catering',
            'Gallega',
            'BuyGro',
            'Olive Country',
            'Livepoint',
        );
        foreach ($companies as $key => $company) {
            $company = new \App\Models\Company([
                'title' => $company
            ]);
            $company->save();
        }
    }
}
