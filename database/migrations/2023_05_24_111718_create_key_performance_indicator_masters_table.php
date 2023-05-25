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
        Schema::create('key_performance_indicator_masters', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('industry');
            $table->string('definition');
            $table->string('formula');
            $table->string('measures');
            $table->string('calculation_example');
            $table->string('evaluation_pattern');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('key_performance_indicator_masters');
    }
};
