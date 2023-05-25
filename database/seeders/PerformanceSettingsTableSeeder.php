<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PerformanceSettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $PerformanceSetting = new \App\Models\PerformanceSetting([
            'company_id' => 1,
            'year' => '2023',
        ]);
        $PerformanceSetting->save();

        $PerformanceSetting = new \App\Models\PerformanceSetting([
            'company_id' => 2,
            'year' => '2023',
        ]);
        $PerformanceSetting->save();

        $PerformanceSetting = new \App\Models\PerformanceSetting([
            'company_id' => 3,
            'year' => '2023',
        ]);
        $PerformanceSetting->save();
    }
}
