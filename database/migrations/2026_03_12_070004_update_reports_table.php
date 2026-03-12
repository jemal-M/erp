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
        Schema::table('reports', function (Blueprint $table) {
            $table->string('type')->after('id');
            $table->string('title')->nullable();
            $table->json('data')->nullable();
            $table->foreignId('generated_by')->nullable()->constrained('users')->cascadeOnDelete();
            $table->timestamp('generated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropForeign(['generated_by']);
            $table->dropColumn(['type', 'title', 'data', 'generated_by', 'generated_at']);
        });
    }
};
