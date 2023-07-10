<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NotificationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $notifications = array(
            ['type' => 'kpi_setting_open', 'value' => "This is to inform you that the KPI and Annual Target Setting status for the employee listed below for this year has been updated to 'Open'. Please take the necessary action."],
            ['type' => 'kpi_setting_review', 'value' => "We would like to inform you that your KPI and Annual Target Setting status for this year has been changed to 'In Review'. We kindly request you to review it along with your manager and ask him/her to submit it by"],
            ['type' => 'kpi_setting_submit', 'value' => "Please be advised that your KPI and Annual Target Setting status for this year has been updated to 'Submitted'. We wish you the best of luck in achieving your targets."],
            ['type' => 'kpi_mid_open', 'value' => "This is to inform you that the Mid-Year KPI review status for the employee listed below for this year has been updated to 'Open'. Please take the necessary action."],
            ['type' => 'kpi_mid_submit', 'value' => "Please    be advised that your Mid-Year KPI status for this year has been updated to 'Submitted'. We wish you the best of luck in achieving your targets."],
            ['type' => 'kpi_final_open', 'value' => "This is to inform you that the Year-End KPI review status for the employee listed below for this year has been updated to 'Open'. Please take the necessary action."],
            ['type' => 'kpi_final_submit', 'value' => "This is to inform you that the Year-End KPI review status for the employee listed below for this year has been updated to 'Submitted'."],
            ['type' => 'probation_setting_open', 'value' => "This is to inform you that the Probation KPI and Target Setting status for the employee listed below has been updated to 'Open'. Please take the necessary action."],
            ['type' => 'probation_setting_submitted', 'value' => "Please be advised that your Probation KPI and Target Setting status has been updated to 'Submitted'. We wish you the best of luck in achieving your targets."],
            ['type' => 'probation_mid_open', 'value' => "This is to inform you that the Probation review status for the employee listed below has been updated to 'Ready for First Review '. Please take the necessary action."],
            ['type' => 'probation_mid_submit', 'value' => "This is to inform you that the Probation review status for the employee listed below has been updated to 'First Review Completed'."],
            ['type' => 'probation_final_open', 'value' => "This is to inform you that the Probation review status for the employee listed below has been updated to 'Ready for Final Review'. Please take the necessary action."],
            ['type' => 'probation_final_submit', 'value' => "This is to inform you that the Probation review status for the employee listed below has been updated to 'Final Review Completed'."],
            ['type' => 'probation_final_notification', 'value' => "This is to inform you that this is the last day for doing the Final review."],
            ['type' => 'default_reminder_days', 'value' => 3]
        );
        foreach ($notifications as $key => $notify) {
            $query = new \App\Models\Notification([
                'meta_key' => $notify['type'], 
                'meta_value' => $notify['value']
            ]);
            $query->save();
        }

        $weightages = array(5,10,15,20,25,30);
        foreach ($weightages as $key => $notify) {
            $query = new \App\Models\Weightage([ 
                'title' => $notify
            ]);
            $query->save();
        }

        $measures = array('%','$','#');
        foreach ($measures as $key => $notify) {
            $query = new \App\Models\Measure([ 
                'title' => $notify
            ]);
            $query->save();
        }
    }
}