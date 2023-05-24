<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new \App\Models\User([
            'username' => 'admin',
            'email' => 'indemnetest+100@gmail.com',
            'phone_no' => 5034324324,
            'password' => bcrypt('admin@112211'),
            'status' => 'active', // active, disabled, trashed
            'role' => 'admin',
        ]);
        $user->save();

        $profile = new \App\Models\Profile([
            'display_name' => 'Romel Indemne',
            'fist_name' => 'Romel',
            'last_name' => 'Indemne',
            'email' => 'indemnetest+1@gmail.com',
            'company' => "Ghassan Aboud Group FZE",
            'ecode' => '10001',
            'designation' => 'Web Developer',
        ]);
        $profile->save();

        $profile = new \App\Models\Profile([
            'display_name' => 'Jacob Calit',
            'fist_name' => 'Jacob',
            'last_name' => 'Calit',
            'email' => 'indemnetest+2@gmail.com',
            'company' => "Ghassan Aboud Group FZE",
            'ecode' => '10002',
            'designation' => 'Web Developer',
        ]);
        $profile->save();

        $profile = new \App\Models\Profile([
            'display_name' => 'Test Employee',
            'fist_name' => 'Test',
            'last_name' => 'Employee',
            'email' => 'indemnetest+2@gmail.com',
            'company' => "Ghassan Aboud Group FZE",
            'ecode' => '10003',
            'designation' => 'HRBP',
        ]);
        $profile->save();

        // $profile = new \App\Models\Profile([
        //     'display_name' => 'Test Employee',
        //     'fist_name' => 'Test',
        //     'last_name' => 'Employee',
        //     'email' => 'indemnetest+2@gmail.com',
        //     'company' => "Ghassan Aboud Group FZE",
        //     'ecode' => '10003',
        //     'superior_ecode' => '10003',
        //     'designation' => 'HRBP',
        // ]);
        // $profile->save();
    }
}
