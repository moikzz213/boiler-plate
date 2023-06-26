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
            $table->string('status')->default('pending'); // approved/pending/trashed

            $table->text('definition', 500)->nullable();
            $table->text('formula', 500)->nullable();
            $table->text('calculation_example', 500)->nullable();
            $table->text('subordinate_measures', 500)->nullable();

            $table->string('type')->default('kpi'); // kpi/ecd
            $table->string('ecd_type')->nullable(); // tech/soft/both

            $table->foreignId('industry_id')->nullable()->constrained();
            $table->string('profile_ecode')->nullable(); // author
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
