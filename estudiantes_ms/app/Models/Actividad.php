<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Actividad extends Model
{
    protected $table = 'actividades';

    protected $fillable = [
        'id',
        'descripcion',
        'nota',
        'codigoEstudiante',
        'created_at',
        'updated_at'
    ];
}
