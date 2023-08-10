@component('mail::message')
# PMS: Reset Password
<b>Hello!</b>
 
{!! $data['message']; !!} 

<div style="margin-top:40px; margin-bottom:40px; text-align:center;margin-left:auto; margin-right:auto;">
    <a href="{{$data['link']}}" target="_blank" rel="noopener noreferrer">
        <img src="http://127.0.0.1:8083/assets/images/reset.png">
    </a>
</div>

{!! $data['message2']; !!}

Regards,

<div>Performance Management System</div>
<div>Ghassan Aboud Group</div>
@endcomponent