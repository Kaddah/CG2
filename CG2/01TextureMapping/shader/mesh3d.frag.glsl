#version 300 es
precision highp float;

uniform bool u_useUniformColor;
uniform vec3 u_uniformColor;

in vec3 fs_color;
in vec3 fs_normal;
in vec3 fs_position;
//Aufgabe 1b
in vec2 fs_texCoord;

uniform vec3 u_ambient;
uniform vec3 u_diffuse;
uniform vec3 u_specular;
uniform float u_specularExponent;	

//Aufgabe 2e
uniform sampler2D u_textureA;
//Aufgabe 4c
uniform sampler2D u_textureB;
// TODO: Aufgabe 4d

out vec4 fragColor;

vec3 blinnPhong(vec3 lightVector, vec3 viewVector, vec3 normal,
		        vec3 ambientColor, vec3 diffuseColor, vec3 specularColor, float specularExponent)
{
	float nDotl        = max(dot(normal, lightVector), 0.0);			
	vec3 halfwayVector = normalize(lightVector + viewVector);
	float nDoth		   = max(dot(normal, halfwayVector), 0.0);	
	return ambientColor + nDotl * diffuseColor + specularColor * pow(nDoth, specularExponent);	
}

void main()
{
  	if(u_useUniformColor)
  	{	
    	fragColor = vec4(u_uniformColor, 1.0);
  	}	else
  	{  
		//Aufgabe 3
		vec3 lightPosition		  	= vec3(0.0, 1000.0, 0.0);
  	    vec3 viewPosition 			= vec3(0,0,0);
	    vec3 lightVector			= normalize(lightPosition - fs_position);
	    vec3 viewVector				= normalize(viewPosition - fs_position);
	    vec3 normal					= normalize(fs_normal);	

		//Aufgabe 2e	
		vec4 texA = texture(u_textureA, fs_texCoord);
		//Aufgabe 4c		
		vec4 texB = texture(u_textureB, fs_texCoord);	
		fragColor =	vec4(blinnPhong(lightVector, viewVector, normal, u_ambient, vec3(texB.rgb), u_specular, u_specularExponent), 1.0);

				
		// TODO: Aufgabe 4d		
		//Aufgabe 1b
		//fragColor =	vec4(blinnPhong(lightVector, viewVector, normal, u_ambient, vec3(fs_texCoord, 0), u_specular, u_specularExponent), 1.0);
  	}
}