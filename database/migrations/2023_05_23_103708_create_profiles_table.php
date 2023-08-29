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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('status')->nullable()->default('active');; // active, inactive
            $table->string('ecode')->unique()->nullable();
            $table->string('username')->nullable();
            $table->string('superior_ecode')->nullable();
            $table->string('display_name')->nullable();
            $table->string('first_name')->nullable();
            $table->unsignedTinyInteger('grade')->nullable();
            $table->string('grade_original')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->nullable();
            $table->string('hrbp_email')->nullable();
            $table->string('department')->nullable();
            $table->string('designation')->nullable();
            $table->date('dob')->nullable();
            $table->date('doj')->nullable();
            $table->string('nationality')->nullable();
            $table->string('role')->nullable(); // hr_admin, hrbp
            $table->boolean('is_regular')->nullable()->default(true);
            $table->foreignId('company_id')->constrained()->nullable();
            $table->boolean('sync')->default(true); // active, inactive
            $table->string('slave_ecode')->nullable(); // active, inactive
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
