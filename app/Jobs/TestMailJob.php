<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use App\Mail\MailNotification;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class TestMailJob implements ShouldQueue
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
        $publisherData = $this->data; 
        $toEmail = $publisherData['email'];
        $message = $publisherData['message'];
        $data = array("message" => "Test Mail Only ".$message,  "date" => Carbon::now(), 'subject' => "Mail Success");
        Mail::to($toEmail)->queue( new MailNotification( $data) ); 
    }
}
