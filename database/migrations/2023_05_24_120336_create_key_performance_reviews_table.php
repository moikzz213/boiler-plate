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
        Schema::create('key_performance_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('review_id')->constrained();
            $table->string('title');
            $table->string('industry')->nullable();
            $table->string('definition')->nullable();
            $table->string('formula')->nullable();
            $table->string('subordinate_measures')->nullable(); 
            $table->string('calculation_example')->nullable();
            $table->string('evaluation_pattern')->nullable();
            
            $table->string('type'); // kpi/ecd
            $table->string('ecd_type')->nullable(); // technical/soft/soft-tech
            
            $table->string('measures')->nullable(); // units/percentage/ratio
            $table->string('target_type')->nullable(); // min/max
            $table->float('target', 10, 0)->nullable();
            $table->float('achievement_midyear', 10, 0)->nullable();
            $table->float('achievement_yearend', 10, 0)->nullable();
            $table->float('revised_annual_target', 10, 0)->nullable();
            $table->integer('weightage'); // 5,10,15,20

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('key_performance_reviews');
    }
};
