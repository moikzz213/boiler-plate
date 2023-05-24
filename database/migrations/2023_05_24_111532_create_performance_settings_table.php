<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('performance_settings', function (Blueprint $table) {
            $table->id();
            $table->string('year');
            $table->string('state')->default('setting'); // setting/mid/year-end/first_review/final_review
            $table->string('status')->default('open'); // Open/Closed/Completed/Inprogress/Locked
            $table->integer('employee_review_allowed_days');

            $table->date('annual_kpi_setting_start');
            $table->date('annual_kpi_setting_end');
            $table->date('mid_year_review_start');
            $table->date('mid_year_review_end');
            $table->date('end_year_review_start');
            $table->date('end_year_review_end');

            $table->date('probation_kpi_setting');
            $table->date('probation_first_review_start');
            $table->date('probation_first_review_end');
            $table->date('probation_final_review_start');
            $table->date('probation_final_review_end');

            $table->foreignId('company_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('performance_settings');
    }
};
