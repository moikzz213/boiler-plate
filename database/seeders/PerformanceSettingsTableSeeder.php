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
        $pmsSetting = new \App\Models\PerformanceSetting([
            'annual_kpi_setting_end' => '2023-06-05',
            'annual_kpi_setting_start' => '2023-06-05',
            'company_id' => 1,
            'employee_review_allowed_days' => 7,
            'end_year_review_end' => "2023-06-05",
            'end_year_review_start' => "2023-06-05",
            'mid_year_review_end' => "2023-06-05",
            'mid_year_review_start' => "2023-06-05",
            'probation_final_review_end' => 11,
            'probation_final_review_start' => 11,
            'probation_first_review_end' => 11,
            'probation_first_review_start' => 11,
            'probation_kpi_setting' => 11,
            'state' => "setting",
            'status' => 'open',
            'year' => 2023,
        ]);
        $pmsSetting->save();
    }
}
