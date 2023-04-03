#version 300 es
precision highp float;

layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_color; 
layout(location = 2) in vec3 a_normal; 
layout(location = 3) in vec2 a_texCoord;

out vec3 fs_color;
out vec3 fs_normal;
out vec3 fs_position;
//Aufgabe 1b
out vec2 fs_texCoord;

uniform mat4 u_mvp;
uniform mat4 u_mv;
uniform mat4 u_mvIT;

void main()
{    
    gl_Position = u_mvp * vec4(a_position.xyz, 1);
    fs_color = a_color;
    fs_position = (u_mv * vec4(a_position.xyz, 1)).xyz;
    fs_normal = (u_mvIT * vec4(a_normal, 0)).xyz;
    //Aufgabe 1b
    fs_texCoord = a_texCoord;
    //Aufgabe 2f
    fs_texCoord = vec2(fs_texCoord.x, -1.0*fs_texCoord.y);
}