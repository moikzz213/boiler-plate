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
            'company' => 'Ghassan Aboud Group FZE',
            'year' => '2023',
        ]);
        $PerformanceSetting->save();

        $PerformanceSetting = new \App\Models\PerformanceSetting([
            'company' => 'Grandiose Supermarket',
            'year' => '2023',
        ]);
        $PerformanceSetting->save();

        $PerformanceSetting = new \App\Models\PerformanceSetting([
            'company' => 'Gallega',
            'year' => '2023',
        ]);
        $PerformanceSetting->save();
    }
}
