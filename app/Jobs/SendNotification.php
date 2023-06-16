<?php

namespace App\Jobs;

use App\Models\Profile;
use App\Models\Notification;
use Illuminate\Bus\Queueable;
use App\Mail\MailNotification;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class SendNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */

     protected $data;
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
         // Publisher ID
        $publisherData = $this->data;
        $query = $publisherData['data'];
        
        $employee = Profile::where('id', $query->profile_id)->first();
        $employeeEmail = $employee->email;
        $HRBPEmail = $employee->hrbp_email;
        $managerEmail = $publisherData['managerEmail'];
        $managerName = ucwords($publisherData['managerName']);

        $current_state = $query->state;
        $current_status = $query->status;
        $employee_type = $query->type; // Probation or Regular
        $year = $query->year;
        $metaKey = '';
        $baseURL = env('VITE_APP_URL');
        $innerMessage = '';
        if($employee_type == 'probation'){
            /***
             *  Probation Employees
             * 
            ***/
            if($current_state == 'setting'){

                // All Open status should automatic from CRON JOB

                if($current_status == 'open'){
                    $metaKey = 'probation_setting_open';
                    $toEmail = $managerEmail;
                    $ccEmail = array($HRBPEmail,$employeeEmail);
                    $message = 'Hi '.$managerName.",<br/><br/>";
                    $subject = 'Probation KPI & Target Setting: Open'; 
                }elseif($current_status == 'submitted'){

                    /**
                     * Notify Manager, Employee & HRBP
                     */

                    $metaKey = 'probation_setting_submitted';
                    $toEmail = $employeeEmail;
                    $ccEmail = array($HRBPEmail,$managerEmail);
                    $message = 'Hi '.$employee->display_name.",<br/><br/>";
                    $subject = 'Probation KPI & Target Setting: Submitted'; 
                }

            }elseif($current_state == 'first_review'){
                
                // All Open status should automatic from CRON JOB

                if($current_status == 'open'){
                     /**
                     * Notify Manager, Employee & HRBP
                     */
                    $metaKey = 'probation_mid_open';
                    $toEmail = $managerEmail;
                    $ccEmail = array($HRBPEmail,$employeeEmail);
                    $message = 'Hi '.$managerName.",<br/><br/>";
                    $subject = 'Probation KPI First Review: Open';
                    $innerMessage = '<br/><br/>Employee: '.$employee->ecode. " | ". $employee->display_name;
                }elseif($current_status == 'submitted'){
                    /**
                     * Notify Manager & HRBP Only
                     */
                    $metaKey = 'probation_mid_submit';
                    $toEmail = $managerEmail;
                    $ccEmail = array($HRBPEmail);
                    $message = 'Hi '.$managerName.",<br/><br/>";
                    $subject = 'Probation KPI First Review: Completed';
                    $innerMessage = '<br/><br/>Employee: '.$employee->ecode. " | ". $employee->display_name;
                } 
            }elseif($current_state == 'final_review'){

                 // All Open status should automatic from CRON JOB

                if($current_status == 'open'){

                    /**
                     * Notify Manager, Employee & HRBP
                     */

                    $metaKey = 'probation_final_open'; 
                    $toEmail = $managerEmail;
                    $ccEmail = array($HRBPEmail,$employeeEmail);
                    $message = 'Hi '.$managerName.",<br/><br/>";
                    $subject = 'Probation KPI Final Review: Open';
                    $innerMessage = '<br/><br/>Employee: '.$employee->ecode. " | ". $employee->display_name;

                }elseif($current_status == 'submitted'){

                    /**
                     * Notify Manager & HRBP Only
                     */

                    $metaKey = 'probation_final_submit'; 
                    $toEmail = $managerEmail;
                    $ccEmail = array($HRBPEmail);
                    $message = 'Hi '.$managerName.",<br/><br/>";
                    $subject = 'Probation KPI Final Review: Submitted';
                    $innerMessage = '<br/><br/>Employee: '.$employee->ecode. " | ". $employee->display_name;
                } 
            }

        }else{
            /***
             * Regular Employees
             * 
             ***/


        }

        $footer = '<br/><br/>You can access the GAG PMS System by clicking on the link provided below.<br/><br/>
        Link: <a href="'.$baseURL.'/print/kpi/'.$year.'/'.$employee->ecode.'">Click here</a> <br/>Thank you.<br/>HR Team';
       
        $notification_message = Notification::where('meta_key', $metaKey)->first();
        $message .= $notification_message->meta_value;
        $message .= $innerMessage;
        $message .= $footer; 
 
        $data = array("message" => $message,  "date" => Carbon::now(), 'subject' => $subject);  
        
        Mail::to($toEmail)->cc($ccEmail)->queue( new MailNotification($data) ); 
    }
}
