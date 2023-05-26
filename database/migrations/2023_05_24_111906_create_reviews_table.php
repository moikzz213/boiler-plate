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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profile_id')->constrained();
            $table->string('state')->default('setting'); // setting/mid/year-end/first_review/final_review
            $table->string('status')->default('open'); // Open/Closed/Completed/Inprogress/Locked
            $table->string('year');
            $table->string('type'); // probation/regular
            $table->string('author')->constrained(); // <display_name - ecode>
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};