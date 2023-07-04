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
        $isOpening = $publisherData['isOpening'];
        $managersObj = array();
        if(!$isOpening){ 
                $employee = Profile::where('id', $query->profile_id)->first();
                $employeeEmail = $employee->email;
                $HRBPEmail = $employee->hrbp_email;
                $allowedDays = @$query->closing_date;
                $current_state = $query->state;
                $current_status = $query->status;
                $closingSetting = @$publisherData['closingSetting'];
            
            $managerEmail = @$publisherData['managerEmail'];
            $managerName = @$publisherData['managerName'] ? ucwords($publisherData['managerName']) : '';
           
            $employee_type = $query->type; // Probation or Regular
            $year = $query->year;
        }else{
            $managerName = $query;  
            $current_state = $publisherData['closingSetting'];
            $employee_type =  @$publisherData['employee_type'];

            if(@$publisherData['daily_run']){ // daily reminder
                $current_status = @$publisherData['status'];
                $year = @$publisherData['year'];
            }else{ 
                $current_status = 'open';  
                $year = @$publisherData['year'];
            }
        }
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

                if($current_status == 'open' || $current_status == 'inprogress'){
                    $metaKey = 'probation_setting_open';
                    $subject = 'Probation KPI & Target Setting: Open'; 
                    $cnt = 1;
                    foreach($managerName AS $k => $v){ 
                        $ccEmail = array($v->hrbp_email);
                        $innerMessage = '<br/>';
                        foreach($v->teams AS $kk => $vv){ 
                            $innerMessage .= '<br/>Employee: '.$vv->ecode. " | ". $vv->display_name; // Multiple records
                            $ccEmail[$cnt] = $vv->email;
                            $cnt++;
                        }

                        $managersObj[$k] = array(
                            'to' => $v->email,
                            'cc' => $ccEmail,
                            'message' => 'Hi '.$v->display_name.',<br/><br/>', 
                            'inner_message' => $innerMessage
                        ); 
                    }  
             
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

                if($current_status == 'open' || $current_status == 'inprogress'){
                     /**
                     * Notify Manager, Employee & HRBP
                     */
                    $metaKey = 'probation_mid_open';
                    $subject = 'Probation KPI First Review: Open';

                    $cnt = 1;
                    foreach($managerName AS $k => $v){ 
                        $ccEmail = array($v->hrbp_email);
                        $innerMessage = '<br/>';
                        foreach($v->teams AS $kk => $vv){ 
                            $innerMessage .= '<br/>Employee: '.$vv->ecode. " | ". $vv->display_name; // Multiple records
                            $ccEmail[$cnt] = $vv->email;
                            $cnt++;
                        }

                        $managersObj[$k] = array(
                            'to' => $v->email,
                            'cc' => $ccEmail,
                            'message' => 'Hi '.$v->display_name.',<br/><br/>', 
                            'inner_message' => $innerMessage
                        ); 
                    }
                    
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

                if($current_status == 'open' || $current_status == 'inprogress'){

                    /**
                     * Notify Manager, Employee & HRBP
                     */

                    $metaKey = 'probation_final_open'; 
                    $subject = 'Probation KPI Final Review: Open';

                    $cnt = 1;
                    foreach($managerName AS $k => $v){ 
                        $ccEmail = array($v->hrbp_email);
                        $innerMessage = '<br/>';
                        foreach($v->teams AS $kk => $vv){ 
                            $innerMessage .= '<br/>Employee: '.$vv->ecode. " | ". $vv->display_name; // Multiple records
                            $ccEmail[$cnt] = $vv->email;
                            $cnt++;
                        }

                        $managersObj[$k] = array(
                            'to' => $v->email,
                            'cc' => $ccEmail,
                            'message' => 'Hi '.$v->display_name.',<br/><br/>', 
                            'inner_message' => $innerMessage
                        ); 
                    } 

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

            if($current_state == 'setting'){

                // All Open status should automatic from CRON JOB

                if($current_status == 'open' || $current_status == 'inprogress'){
                    $metaKey = 'kpi_setting_open'; 
                    $subject = 'KPI and Annual Target Setting is now Open';  
                    foreach($managerName AS $k => $v){ 
                        $innerMessage = '<br/>';
                       
                        foreach($v->teams AS $kk => $vv){ 
                            $innerMessage .= '<br/>Employee: '.$vv->ecode. " | ". $vv->display_name; // Multiple records
                        }

                        $managersObj[$k] = array(
                            'to' => $v->email,
                            'cc' => $v->hrbp_email,
                            'message' => 'Hi '.$v->display_name.',<br/><br/>', 
                            'inner_message' => $innerMessage
                        ); 
                    }
                }elseif($current_status == 'inreview'){

                    /**
                     * Notify Manager, Employee & HRBP
                     */

                    $metaKey = 'kpi_setting_review';
                    $toEmail = $employeeEmail;
                    $ccEmail = array($HRBPEmail,$managerEmail);
                    $message = 'Hi '.$employee->display_name.",<br/><br/>";
                    $subject = 'KPI and Annual Target Setting : In-Review';

                    if( date('Y-m-d', strtotime($allowedDays)) > date('Y-m-d', strtotime($closingSetting))){
                        $date_allowed = $closingSetting;
                    }else{
                        $date_allowed = $allowedDays;
                    }

                    $innerMessage = ' '. date('d/m/Y', strtotime($date_allowed));
                }elseif($current_status == 'submitted'){

                    /**
                     * Notify Manager, Employee & HRBP
                     */

                    $metaKey = 'kpi_setting_submit';
                    $toEmail = $employeeEmail;
                    $ccEmail = array($HRBPEmail,$managerEmail);
                    $message = 'Hi '.$employee->display_name.",<br/><br/>";
                    $subject = 'KPI and Annual Target Setting : Submitted'; 
                }

            }elseif($current_state == 'midyear'){
                
                // All Open status should automatic from CRON JOB

                if($current_status == 'open' || $current_status == 'inprogress'){
                     /**
                     * Notify Manager, Employee & HRBP
                     */
                    $metaKey = 'kpi_mid_open';
                    $subject = 'Mid-Year KPI review: Open';
                    $cnt = 1;
                    foreach($managerName AS $k => $v){ 
                        $ccEmail = array($v->hrbp_email);  
                        $innerMessage = '<br/>';
                        foreach($v->teams AS $kk => $vv){ 
                            $innerMessage .= '<br/>Employee: '.$vv->ecode. " | ". $vv->display_name; // Multiple records
                            $ccEmail[$cnt] = $vv->email;
                            $cnt++;
                        }

                        $managersObj[$k] = array(
                            'to' => $v->email,
                            'cc' => $ccEmail,
                            'message' => 'Hi '.$v->display_name.',<br/><br/>', 
                            'inner_message' => $innerMessage
                        ); 
                    }
                }elseif($current_status == 'submitted'){
                    /**
                     * Notify Manager & HRBP Only
                     */
                    $metaKey = 'kpi_mid_submit';
                    $toEmail = $employeeEmail;
                    $ccEmail = array($HRBPEmail, $managerEmail);
                    $message = 'Hi '.$employee->display_name.",<br/><br/>";
                    $subject = 'Mid-Year KPI review: Completed';
                    
                } 
            }elseif($current_state == 'yearend'){

                 // All Open status should automatic from CRON JOB

                if($current_status == 'open' || $current_status == 'inprogress'){

                    /**
                     * Notify Manager, Employee & HRBP
                     */

                    $metaKey = 'kpi_final_open'; 
                    $subject = 'Year-End KPI : Open';
                    foreach($managerName AS $k => $v){ 
                        $innerMessage = '<br/>';
                        foreach($v->teams AS $kk => $vv){ 
                            $innerMessage .= '<br/>Employee: '.$vv->ecode. " | ". $vv->display_name; // Multiple records
                        }

                        $managersObj[$k] = array(
                            'to' => $v->email,
                            'cc' => $v->hrbp_email,
                            'message' => 'Hi '.$v->display_name.',<br/><br/>',
                            'inner_message' => $innerMessage
                        ); 
                    }

                }elseif($current_status == 'submitted'){

                    /**
                     * Notify Manager & HRBP Only
                     */

                    $metaKey = 'kpi_final_submit'; 
                    $toEmail = $managerEmail;
                    $ccEmail = array($HRBPEmail);
                    $message = 'Hi '.$managerName.",<br/><br/>";
                    $subject = 'Year-End KPI : Submitted';
                    $innerMessage = '<br/><br/>Employee: '.$employee->ecode. " | ". $employee->display_name;
                } 
            }
        } 
       
        $notification_message = Notification::where('meta_key', $metaKey)->first();
       
        if($managersObj && count($managersObj) > 0){  
            $footer = '<br/><br/>You can access the GAG PMS System by clicking on the link provided below.<br/><br/>
            Link: <a href="'.$baseURL.'/dashboard">Click here</a> <br/>Thank you.<br/>HR Team';
            foreach($managersObj AS $k => $v){
                $message =  $v['message'];
                $message .= $notification_message->meta_value;
                $message .= $v['inner_message'];
                $message .= $footer; 
                $data = array("message" => $message,  "date" => Carbon::now(), 'subject' => $subject);
                Mail::to($v['to'])->cc($v['cc'])->queue( new MailNotification($data) ); 
            }
        }else{  
           if($employee->ecode){
                $footer = '<br/><br/>You can access the GAG PMS System by clicking on the link provided below.<br/><br/>
                Link: <a href="'.$baseURL.'/print/kpi/'.$year.'/'.$employee->ecode.'">Click here</a> <br/>Thank you.<br/>HR Team';
                $message .= $innerMessage;
                $message .= $footer; 
        
                $data = array("message" => $message,  "date" => Carbon::now(), 'subject' => $subject);
                Mail::to($toEmail)->cc($ccEmail)->queue( new MailNotification($data) ); 
           }
        } 
    }
}