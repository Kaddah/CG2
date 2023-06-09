#version 300 es
precision highp float;

layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_color; 
layout(location = 2) in vec3 a_normal; 
layout(location = 3) in vec2 a_texCoord;
layout(location = 4) in vec3 a_tangent;
layout(location = 5) in vec3 a_bitangent;

out vec3 fs_color;
out vec3 fs_normal;
out vec3 fs_position;
out vec2 fs_texCoord;
out vec3 fs_tangent;
out vec3 fs_bitangent;

uniform mat4 u_mvp;
uniform mat4 u_mv;
uniform mat4 u_mvIT;

void main()
{    
    gl_Position = u_mvp * vec4(a_position.xyz, 1);
    fs_color = a_color;
    fs_position = (u_mv * vec4(a_position.xyz, 1)).xyz;
    fs_normal = (u_mvIT * vec4(a_normal, 0)).xyz;
    fs_texCoord = a_texCoord;
    fs_texCoord = vec2(fs_texCoord.x, -1.0*fs_texCoord.y);
    fs_tangent = a_tangent;
    fs_bitangent = a_bitangent;
}