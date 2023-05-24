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
            'status' => 'active',
            'display_name' => 'Romel Indemne',
            'fist_name' => 'Romel',
            'last_name' => 'Indemne',
            'email' => 'indemnetest+1@gmail.com',
            'company' => "Ghassan Aboud Group FZE",
            'ecode' => '10001',
            'username' => '10001',
            'superior_ecode' => '10003',
            'is_regular' => true,
            'role' => 'normal',
            'designation' => 'Web Developer',
        ]);
        $profile->save();

        $profile = new \App\Models\Profile([
            'status' => 'active',
            'display_name' => 'Jacob Calit',
            'fist_name' => 'Jacob',
            'last_name' => 'Calit',
            'email' => 'indemnetest+2@gmail.com',
            'company' => "Ghassan Aboud Group FZE",
            'ecode' => '10002',
            'username' => '10002',
            'superior_ecode' => '10003',
            'is_regular' => true,
            'role' => 'normal',
            'designation' => 'Web Developer',
        ]);
        $profile->save();

        $profile = new \App\Models\Profile([
            'status' => 'active',
            'display_name' => 'Manager Employee',
            'fist_name' => 'Manager',
            'last_name' => 'Employee',
            'email' => 'indemnetest+2@gmail.com',
            'company' => "Ghassan Aboud Group FZE",
            'ecode' => '10003',
            'username' => '10003',
            'superior_ecode' => null,
            'designation' => 'IT Manager',
            'role' => 'normal',
            'is_regular' => true,
        ]);
        $profile->save();

        $profile = new \App\Models\Profile([
            'status' => 'active',
            'display_name' => 'Normal Employee',
            'fist_name' => 'Normal',
            'last_name' => 'Employee',
            'email' => 'indemnetest+2@gmail.com',
            'company' => "Ghassan Aboud Group FZE",
            'ecode' => '10004',
            'username' => '10004',
            'superior_ecode' => '10003',
            'designation' => 'Project Manager',
            'role' => 'normal',
            'is_regular' => true,
        ]);
        $profile->save();

        $profile = new \App\Models\Profile([
            'status' => 'active',
            'display_name' => 'HR Admin',
            'fist_name' => 'HR',
            'last_name' => 'Admin',
            'email' => 'indemnetest+2@gmail.com',
            'company' => "Ghassan Aboud Group FZE",
            'ecode' => '10005',
            'username' => '10005',
            'superior_ecode' => '10003',
            'designation' => 'HR Manager',
            'is_regular' => false,
            'role' => 'hr_admin',
        ]);
        $profile->save();
    }
}
