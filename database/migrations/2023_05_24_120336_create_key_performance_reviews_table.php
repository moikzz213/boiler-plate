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
            $table->string('industry');
            $table->string('definition');
            $table->string('formula');
            $table->string('measures');
            $table->string('calculation_example');
            $table->string('evaluation_pattern');

            $table->string('type'); // kpi/ecd
            $table->string('ecd_type')->nullable(); // technical/soft/soft-tech

            $table->string('target_type'); // min/max
            $table->string('measure'); // units/percentage/ratio
            $table->float('target', 10, 0);
            $table->float('achievement_midyear', 10, 0);
            $table->float('achievement_yearend', 10, 0);
            $table->float('revised_annual_target', 10, 0);
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
