<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    /** 
     * *** meta type ***
     *  
     * kpi_setting_open
     * kpi_setting_review
     * kpi_setting_submit
     * kpi_mid_open
     * kpi_mid_submit
     * kpi_final_open
     * kpi_final_submit

     * probation_setting_open
     * probation_setting_submitted
     * probation_mid_open
     * probation_mid_submit
     * probation_final_open
     * probation_final_submit
     */

    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('meta_key', 30);
            $table->text('meta_value')->nullable();
            $table->string('status', 10)->default('active')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
