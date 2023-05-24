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
            $table->string('ecode')->nullable();
            $table->string('display_name')->nullable();
            $table->string('fist_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->nullable();
            $table->string('company')->nullable();
            $table->string('department')->nullable();
            $table->string('designation')->nullable();
            $table->date('dob')->nullable();
            $table->string('nationality')->nullable();
            $table->string('role')->nullable(); // hr_admin, hrbp, app_admin
            $table->unsignedBigInteger('user_id')->nullable();
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
